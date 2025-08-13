import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { setModal } from "../../../redux/createSLide";
import { setAlert, setLoading } from "../../../redux/authSlide";
import { $api } from "../../../services/service";
import Feed from "../../../components/Elements/Feed/Feed";
import style from "./MyFeeds.module.css";
const MyFeeds = () => {
    const { isUser, username } = useOutletContext();
    const dispatch = useDispatch();

    const [listMyFeeds, setListMyFeeds] = useState([]);

    const fectData = async () => {
        try {
            dispatch(setLoading(true));
            const res = await $api.post.getListFeedsByUserId(username);
            if (!res.isError) {
                setListMyFeeds(res.data);
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
    const showModal = () => {
        dispatch(setModal(true));
    };

    useEffect(() => {
        fectData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="w-100">
            {isUser ? (
                <div
                    className={`d-flex align-items-start ${style.update_profile_btn_container}`}
                    onClick={showModal}
                >
                    <i className="bi bi-person-circle me-2 fs-4"></i>
                    <div className="form-control text-secondary">Có gì mới</div>
                    <div
                        className={`btn btn-outline-secondary fw-medium ms-2 ${style.update_profile_btn}`}
                    >
                        Đăng
                    </div>
                </div>
            ) : null}

            <div className="w-100">
                {listMyFeeds.length > 0 ? (
                    listMyFeeds.map((feed, idx) => {
                        return (
                            <div
                                className={`${style.feed_dialog}`}
                                key={feed.feed.id}
                                idx={idx}
                            >
                                <Feed data={feed} />
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
export default MyFeeds;
