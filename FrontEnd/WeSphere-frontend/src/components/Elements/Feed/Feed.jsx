import React, { useEffect, useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading, setAlert } from "../../../redux/authSlide";
import { $api } from "../../../services/service";
import { NavLink } from "react-router-dom";
import Editor from "../TextEditor/Editor";
import FeedMenuModal from "../Modal/FeedMenuModal/FeedMenuModal";
import ShowMedia from "../ShowMedia/ShowMedia";
import style from "./Feed.module.css";
const Feed = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data, block } = props;
    const [heartClicked, setHeartClicked] = useState(data.state.isLike);
    const [isRePost, setIsRePost] = useState(data.state.isRePost);
    const [totalLike, setTotalLike] = useState(data.feed.totalLike);
    const [totalReposts, setTotalReposts] = useState(data.feed.totalReposts);
    const [showMenu, setShowMenu] = useState(false);
    const sentinelRef = useRef(null);
    // feed( id, content, tag, listImages, totalLike, privacy, totalComment, totalReposts, totalShare, timeCreate, commentOfPost), feedOwner (username, id, avatar,  isOnline),

    const showHideMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleHeartClick = async (e) => {
        e.stopPropagation();
        const prevHeartClicked = heartClicked;
        const prevTotalLike = totalLike;
        if (heartClicked) {
            setHeartClicked(false);
            setTotalLike(totalLike - 1);
            block({ id: data?.feed?.id });
        } else {
            setHeartClicked(true);
            setTotalLike(totalLike + 1);
        }
        const mode = heartClicked ? "minus" : "add";
        try {
            dispatch(setLoading(true));
            const res = await $api.post.like(mode, data.feed.id);
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
            if (isRePost) {
                setIsRePost(false);
                setTotalReposts(totalReposts - 1);
            } else {
                setIsRePost(true);
                setTotalReposts(totalReposts + 1);
            }
            const mode = isRePost ? "minus" : "add";
            const res = await $api.post.rePost(data.feed.id, mode);
            if (!res.isError) {
                dispatch(setAlert({ message: res.message }));
            }
        } catch (error) {
            dispatch(setAlert({ message: error.message }));
        }
    };

    const createAt = () => {
        const raw = formatDistanceToNow(new Date(data.feed.timeCreate), {
            addSuffix: true,
            locale: vi,
        });
        return raw.replace(/^khoảng\s+/i, "");
    };

    const goToFeedDetail = () => {
        navigate(`/${data.feedOwner.username}/post/${data.feed.id}`);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) {
                if (showMenu) {
                    console.log("flag");
                }
            }
        });

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sentinelRef.current]);

    return (
        <>
            <div className={`${style.feed_container} d-flex`}>
                <div>
                    <div
                        className={`me-2 ${
                            data.feedOwner.isOnline ? style.online : null
                        }`}
                    >
                        <NavLink
                            to={`/${data.feedOwner.username}`}
                            className={style.link}
                        >
                            <div
                                className={`rounded-circle bg-secondary ${style.avatar}`}
                            >
                                <img
                                    className="object-fit-cover w-100 h-100"
                                    src={
                                        data.feedOwner.avatar
                                            ? data.feedOwner.avatar
                                            : "/default_avatar.jpg"
                                    }
                                    alt=""
                                />
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className={style.feed_body}>
                    <div className={`mb-2 `}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <NavLink
                                    to={`/${data.feedOwner.id}`}
                                    className={style.link}
                                >
                                    <span className="me-2 fw-bold">
                                        {data.feedOwner.username}
                                    </span>
                                </NavLink>
                                {data.feed.tag && (
                                    <span className="me-2 fw-semibold">
                                        <i className="bi bi-chevron-right"></i>{" "}
                                        {data.feed.tag}
                                    </span>
                                )}
                                <span className={style.text_secondary}>
                                    {createAt()}
                                </span>
                            </div>
                            <div className="position-relative">
                                <div
                                    className={`rounded-circle ${style.more_btn}`}
                                    onClick={showHideMenu}
                                >
                                    <i
                                        className="bi bi-three-dots p-1"
                                        ref={sentinelRef}
                                    ></i>
                                </div>
                                {showMenu ? (
                                    <FeedMenuModal
                                        userId={data.feedOwner.id}
                                        username={data.feedOwner.username}
                                        feedId={data.feed.id}
                                        show={showHideMenu}
                                        state={data.state}
                                        blockHandel={block}
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                    {data.feed.content.root.children.length === 1 &&
                    data.feed.content.root.children[0].children.length ===
                        0 ? null : (
                        <Editor json={data.feed.content} editable={false} />
                    )}

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
                            {isRePost ? (
                                <i className="bi bi-repeat-1"></i>
                            ) : (
                                <i className="bi bi-repeat"></i>
                            )}{" "}
                            <span>{totalReposts}</span>
                        </button>
                    </div>
                </div>
            </div>

            {props.children}
        </>
    );
};
export default Feed;
