import React, { useEffect } from "react";
import SideMenu from "../../components/Layouts/SideMenu/SideMenu";
import CreateModal from "../../components/Elements/Modal/CreateModal/CreateModal";
import Alert from "../../components/Elements/Alert/Alert";
import NotificationModal from "../../components/Elements/Modal/NotificationModal/NotificationModal";
import { _AUTH } from "../../constants/_auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { $api } from "../../services/service";
import style from "./DefaultLayout.module.css";

const DefaultLayout = (props) => {
    const navigate = useNavigate();
    const token = localStorage.getItem(_AUTH.TOKEN_NAME);
    const alert = useSelector((state) => state.auth.alert);
    const show = useSelector((state) => state.create.show);
    const user = useSelector((state) => state.auth.user);
    const notification = useSelector((state) => state.auth.notifycation);

    useEffect(() => {
        if (!token) {
            navigate("/auth ");
        }
    });

    useEffect(() => {
        if (!user.id) return;

        const sendHeartbeat = async () => {
            try {
                const res = await $api.auth.sendHeartbeat(user.id);
                if (res === "OK") {
                    return;
                } else {
                    sendHeartbeat();
                }
            } catch (err) {
                console.error("Heartbeat error:", err);
            }
        };

        sendHeartbeat();
        const interval = setInterval(sendHeartbeat, 240000);
        return () => clearInterval(interval);
    }, [user.id]);

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
