import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useDispatch } from "react-redux";
import { setAlert, setLoading } from "../../../redux/authSlide";
import { $api } from "../../../services/service";
import Feed from "../../../components/Elements/Feed/Feed";
import style from "./Reposts.module.css";
import { useOutletContext } from "react-router-dom";
const Reposts = () => {
    const dispatch = useDispatch();
    const { username } = useOutletContext();
    const [listRePosts, setListRePosts] = useState([]);

    const fectData = async () => {
        try {
            dispatch(setLoading(true));
            const res = await $api.post.getListRePostsByUserId(username);
            if (!res.isError) {
                setListRePosts(res.data);
                dispatch(setLoading(false));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error?.errors.exceptionMessage ?? error.message,
                })
            );
        }
    };

    const createAt = (time) => {
        return formatDistanceToNow(new Date(time), {
            addSuffix: true,
            locale: vi,
        });
    };

    useEffect(() => {
        fectData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="w-100">
            <div className="w-100">
                {listRePosts.length > 0 ? (
                    listRePosts.map((data, idx) => {
                        return (
                            <div
                                className={`${style.feed_dialog}`}
                                key={data.feed.id}
                                idx={idx}
                            >
                                <p
                                    className={`${style.repost_title} text-secondary`}
                                >
                                    <i className="bi bi-repeat me-2"></i>
                                    <b>{data.userRepost.username}</b> đã đăng
                                    lại {createAt(data.userRepost.timeCreate)}
                                </p>
                                <Feed data={data} />
                            </div>
                        );
                    })
                ) : (
                    <>
                        <div className="w-100 d-flex justify-content-center align-items-center  py-4">
                            <p className={style.text_secondary}>
                                Chưa có bài viết nào được đăng lại
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
export default Reposts;
