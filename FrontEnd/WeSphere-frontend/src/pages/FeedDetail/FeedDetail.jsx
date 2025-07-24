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
    const { feedId, username } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        document.title = "WeSphere • Bình luận";
    }, []);

    const fetchData = async () => {
        try {
            dispatch(setLoading(true));
            const res = await $api.post.getFeedDetail(feedId);
            if (!res.isError && res.data != null) {
                setData(res.data);
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

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <DefaultLayout>
                <div className="d-flex flex-column align-items-center pt-5">
                    {data && (
                        <Feed data={data} idx={-1} key={data.feed.id}>
                            <div className={style.comment_container}>
                                <div className={style.comment_input}>
                                    <CommentInput data={data} />
                                </div>
                                <div className={style.list_comments}>
                                    {data.listComments.map((feed, idx) => {
                                        return (
                                            <Feed
                                                data={feed}
                                                key={idx}
                                                idx={idx}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </Feed>
                    )}
                </div>
            </DefaultLayout>
        </>
    );
};
export default FeedDetail;
