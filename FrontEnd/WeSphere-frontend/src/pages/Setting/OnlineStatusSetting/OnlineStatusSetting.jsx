import React from "react";
import { useOutletContext } from "react-router-dom";
import { $api } from "../../../services/service";
import { useDispatch } from "react-redux";
import { setAlert, setLoading, updateUser } from "../../../redux/authSlide";
import style from "./OnlineStatusSetting.module.css";

const OnlineStatusSetting = () => {
    const dispatch = useDispatch();
    const { user } = useOutletContext();
    const onlineStatusMode = user.onlineStatus;

    const updateOnlineStatusMode = async (e) => {
        try {
            dispatch(setLoading(true));
            const res = await $api.auth.updateOnlineStatus(
                user.id,
                e.target.value
            );
            if (!res.isError) {
                dispatch(setLoading(false));
                dispatch(updateUser({ onlineStatus: res.data.onlineStatus }));
                dispatch(setAlert({ message: res.message }));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error.errors?.exceptionMessage ?? error.message,
                })
            );
        }
    };
    return (
        <div className="w-100">
            <div>
                <p className="fw-bold mb-0">
                    Ai có thể nhìn thấy khi bạn online
                </p>
                <p className={`fw-light ${style.text_secondary}`}>
                    Khi tắt cài đặt này, bạn sẽ không xem được trạng thái online
                    của những người khác.
                </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold mb-0">Mọi người</p>
                <div className="form-check">
                    <input
                        className={`form-check-input focus-ring focus-ring-light ${style.radio_input}`}
                        type="radio"
                        name="radioDefault"
                        id="radioDefault1"
                        value={"everyone"}
                        onChange={updateOnlineStatusMode}
                        checked={onlineStatusMode === "everyone"}
                    />
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold mb-0">Bạn bè</p>
                <div className="form-check">
                    <input
                        className={`form-check-input focus-ring focus-ring-light ${style.radio_input}`}
                        type="radio"
                        name="radioDefault"
                        id="radioDefault2"
                        value={"friends"}
                        onChange={updateOnlineStatusMode}
                        checked={onlineStatusMode === "friends"}
                    />
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold mb-0">Không ai cả</p>
                <div className="form-check">
                    <input
                        className={`form-check-input focus-ring focus-ring-light ${style.radio_input}`}
                        type="radio"
                        name="radioDefault"
                        id="radioDefault3"
                        value={"nobody"}
                        onChange={updateOnlineStatusMode}
                        checked={onlineStatusMode === "nobody"}
                    />
                </div>
            </div>
        </div>
    );
};
export default OnlineStatusSetting;
