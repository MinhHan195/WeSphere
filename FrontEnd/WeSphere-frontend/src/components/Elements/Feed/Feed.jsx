import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading, setAlert } from "../../../redux/authSlide";
import { $api } from "../../../services/service";
import Editor from "../TextEditor/Editor";
import ShowMedia from "../ShowMedia/ShowMedia";
import style from "./Feed.module.css";
const Feed = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data } = props;
    const [heartClicked, setHeartClicked] = useState(false);
    const [totalLike, setTotalLike] = useState(data.feed.totalLike);
    // feed( id, content, tag, listImages, totalLike, privacy, totalComment, totalReposts, totalShare, timeCreate, commentOfPost), feedOwner (username, id),

    const handleHeartClick = async (e) => {
        e.stopPropagation();
        const prevHeartClicked = heartClicked;
        const prevTotalLike = totalLike;
        if (heartClicked) {
            setHeartClicked(false);
            setTotalLike(totalLike - 1);
        } else {
            setHeartClicked(true);
            setTotalLike(totalLike + 1);
        }
        const mode = heartClicked ? "minus" : "add";
        try {
            dispatch(setLoading(true));
            const res = await $api.post.like(mode);
            if (!res.isError) {
                dispatch(setLoading(false));
            }
            return;
        } catch (error) {
            dispatch(setLoading(false));
            setHeartClicked(prevHeartClicked);
            setTotalLike(prevTotalLike);
            dispatch(
                setAlert({
                    message: error.errors.exceptionMessage,
                })
            );
        }
    };

    const rePost = async (e) => {
        e.stopPropagation();
        try {
            dispatch(setLoading(true));
            const res = await $api.post.rePost(data.feed.id);
            if (!res.isError) {
                dispatch(setLoading(false));
                dispatch(setAlert({ message: res.message }));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setAlert({ message: error.message }));
        }
    };

    const createAt = () => {
        return formatDistanceToNow(new Date(data.feed.timeCreate), {
            addSuffix: true,
            locale: vi,
        });
    };

    const goToFeedDetail = () => {
        navigate(`/${data.feedOwner.username}/post/${data.feed.id}`);
    };

    return (
        <>
            <div className={`${style.feed_container} d-flex`}>
                <div>
                    <div className="me-2">
                        <div
                            className={`rounded-circle bg-secondary ${style.avatar}`}
                        >
                            <img
                                className="object-fit-cover w-100 h-100"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className={style.feed_body}>
                    <div className="mb-2">
                        <div>
                            <span className="me-2 fw-bold">
                                {data.feedOwner.username}
                            </span>
                            {data.feed.tag && (
                                <span className="me-2 fw-semibold">
                                    <i className="bi bi-chevron-right"></i>{" "}
                                    {data.feed.tag}
                                </span>
                            )}
                            <span className="text-muted">{createAt()}</span>
                        </div>
                    </div>
                    <Editor json={data.feed.content} editable={false} />
                    <ShowMedia
                        listImage={data.feed.listImages}
                        preview={false}
                        zoom={true}
                    />
                    <div className={style.btn_icon_container}>
                        <button
                            className={`btn rounded-pill m-0 px-2 py-1 ${style.btn_icon}`}
                            onClick={handleHeartClick}
                        >
                            <i
                                className={`bi ${
                                    heartClicked
                                        ? "bi-heart-fill text-danger"
                                        : "bi-heart"
                                }`}
                            ></i>{" "}
                            <span className={heartClicked ? "text-danger" : ""}>
                                {totalLike}
                            </span>
                        </button>
                        <button
                            className={`btn rounded-pill m-0 px-2 py-1 ${style.btn_icon}`}
                            onClick={goToFeedDetail}
                        >
                            <i className="bi bi-chat"></i>{" "}
                            <span>{data.feed.totalComment}</span>
                        </button>

                        <button
                            className={`btn rounded-pill m-0 px-2 py-1 ${style.btn_icon}`}
                            onClick={rePost}
                        >
                            <i className="bi bi-arrow-repeat"></i>{" "}
                            <span>{data.feed.totalReposts}</span>
                        </button>
                    </div>
                </div>
            </div>

            {props.children}
        </>
    );
};
export default Feed;
