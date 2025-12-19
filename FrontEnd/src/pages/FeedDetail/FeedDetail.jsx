import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading, setAlert } from "../../redux/authSlide";
import { $api } from "../../services/service";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import Feed from "../../components/Elements/Feed/Feed";
import CommentInput from "../../components/Elements/CommentInput/ConmentInput";
import style from "./FeedDetail.module.css";

const FeedDetail = () => {
    // data{feed, listComments[feed1, feed1,...], feedOwner}
    const dispatch = useDispatch();
    const { feedId } = useParams();
    const [data, setData] = useState(null);
    const [listComments, setListComments] = useState([]);
    const [close, setClose] = useState(0);
    const [key, setKey] = useState(0);
    const [listBlock, setListBlock] = useState([]);

    useEffect(() => {
        document.title = "WeSphere • Bình luận";
    }, []);

    const addIdLock = async (id) => {
        setListBlock((prev) => [...prev, id]);
    };

    useEffect(() => {
        // console.log(listBlock);
        const blockIds = new Set(listBlock.map((i) => i?.id));
        setListComments((prev) => {
            return prev.filter((item) => !blockIds.has(item?.feed?.id));
        });
    }, [listBlock]);

    const fetchData = async () => {
        try {
            dispatch(setLoading(true));
            const res = await $api.post.getFeedDetail(feedId);
            if (!res.isError && res.data != null) {
                setData(res.data);
                setListComments(res.data.listComments);
                dispatch(setLoading(false));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    type: "error",
                    message: error.errors.exceptionMessage ?? error.message,
                })
            );
        }
    };

    const handleClose = (e) => {
        if (
            !e.target.classList.contains("bi-emoji-smile") &&
            !e.target.classList.contains("bi-filetype-gif") &&
            !e.target.classList.contains("btn-icon-emoji") &&
            !e.target.classList.contains("btn-icon-gif")
        ) {
            setClose((pre) => pre + 1);
        } else {
            return;
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <DefaultLayout>
                <div
                    className={`d-flex justify-content-center pt-5 ${style.feed_detail_main_container}`}
                    onClick={handleClose}
                >
                    <div className={`${style.feed_detail_main_dialog}`}>
                        {data && (
                            <div
                                className={`card mb-4 shadow-sm rounded-4 p-4 w-100 ${style.feed_detail_main}`}
                            >
                                <Feed data={data} idx={-1} key={data.feed.id}>
                                    <div className={style.comment_container}>
                                        <div className={style.comment_input}>
                                            <CommentInput
                                                data={data}
                                                close={close}
                                                setKey={() => {
                                                    setKey(key + 1);
                                                    fetchData();
                                                }}
                                                key={key}
                                            />
                                        </div>
                                        <div className={style.list_comments}>
                                            {listComments.map((feed, idx) => {
                                                return (
                                                    <div
                                                        className={`rounded-0 p-4 ps-5 ${style.comment_container}`}
                                                        key={feed.feed.id}
                                                    >
                                                        <Feed
                                                            data={feed}
                                                            key={idx}
                                                            idx={idx}
                                                            block={addIdLock}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </Feed>
                            </div>
                        )}
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
};
export default FeedDetail;
