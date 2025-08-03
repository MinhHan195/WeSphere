import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert, setLoading } from "../../../redux/authSlide";
import { $api } from "../../../services/service";
import Feed from "../../../components/Elements/Feed/Feed";
import style from "./MyMedia.module.css";
const MyMedia = () => {
    const dispatch = useDispatch();

    const [listMyMedias, setListMyMedias] = useState([]);

    const fectData = async () => {
        try {
            dispatch(setLoading(true));
            const res = await $api.post.getListMediasByUserId();
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
    });
    return (
        <div className="w-100">
            <div className="w-100">
                {listMyMedias.map((feed, idx) => {
                    return (
                        <div
                            className={`${style.feed_dialog}`}
                            key={feed.feed.id}
                            idx={idx}
                        >
                            <Feed data={feed} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default MyMedia;
