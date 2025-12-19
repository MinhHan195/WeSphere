import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert, setLoading } from "../../../redux/authSlide";
import { $api } from "../../../services/service";
import Feed from "../../../components/Elements/Feed/Feed";
import style from "./MyMedia.module.css";
import { useParams } from "react-router-dom";
const MyMedia = () => {
    const dispatch = useDispatch();

    const param = useParams();

    const [listMyMedias, setListMyMedias] = useState([]);

    const fectData = async () => {
        try {
            dispatch(setLoading(true));
            const res = await $api.post.getListMediasByUserId(param.userId);
            if (!res.isError) {
                setListMyMedias(res.data);
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

    useEffect(() => {
        fectData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="w-100">
            <div className="w-100">
                {listMyMedias.length > 0 ? (
                    listMyMedias.map((feed, idx) => {
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
                                Chưa có file phương tiện nào được đăng
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
export default MyMedia;
