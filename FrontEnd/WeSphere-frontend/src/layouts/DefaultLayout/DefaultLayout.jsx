import React, { useEffect } from "react";
import SideMenu from "../../components/Layouts/SideMenu/SideMenu";
import CreateModal from "../../components/Elements/Modal/CreateModal/CreateModal";
import Alert from "../../components/Elements/Alert/Alert";
import NotificationModal from "../../components/Elements/Modal/NotificationModal/NotificationModal";
import { _AUTH } from "../../constants/_auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { $api } from "../../services/service";
import style from "./DefaultLayout.module.css";
import { setAlert, setLoading, setUser } from "../../redux/authSlide";

const DefaultLayout = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem(_AUTH.TOKEN_NAME);
    const username = localStorage.getItem(_AUTH.USERNAME);
    const alert = useSelector((state) => state.auth.alert);
    const show = useSelector((state) => state.create.show);
    const id = localStorage.getItem(_AUTH.ID);
    const notification = useSelector((state) => state.auth.notifycation);

    useEffect(() => {
        if (!token) {
            navigate("/auth ");
        }
    });

    const sendHeartbeat = async () => {
        try {
            const res = await $api.auth.sendHeartbeat(id);
            if (res === "OK") {
                return;
            } else {
                sendHeartbeat();
            }
        } catch (err) {
            console.error("Heartbeat error:", err);
        }
    };

    const fetchUserData = async () => {
        try {
            dispatch(setLoading(true));
            const res = await $api.auth.getUser(username);
            if (!res.isError) {
                console.log(res);
                dispatch(setUser(res.data));
                dispatch(setLoading(false));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error?.errors?.exceptionMessage ?? error.message,
                })
            );
        }
    };

    useEffect(() => {
        if (!username) return;
        fetchUserData();
    }, [username]);

    useEffect(() => {
        if (!id) return;
        sendHeartbeat();
        const interval = setInterval(sendHeartbeat, 240000);
        return () => clearInterval(interval);
    }, [id]);

    return (
        <div className="m-0 p-0">
            <SideMenu />
            {show ? <CreateModal /> : null}
            <div className={style.main_container}>{props.children}</div>
            {alert.message.length > 0 ? (
                <Alert
                    show={alert.message.length > 0}
                    message={alert.message}
                />
            ) : (
                ""
            )}
            {notification.show ? (
                <NotificationModal
                    isError={notification.isError}
                    message={notification.message}
                    show={notification.show}
                />
            ) : null}
        </div>
    );
};

export default DefaultLayout;
