import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotifycation } from "../../redux/authSlide";
import Loading from "../../components/Elements/Loading/Loading";
import Alert from "../../components/Elements/Alert/Alert";
import NotificationModal from "../../components/Elements/Modal/NotificationModal/NotificationModal";
function AuthLayout(props) {
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.auth.alert);
    const loading = useSelector((state) => state.auth.loading);
    const notification = useSelector((state) => state.auth.notifycation);
    return (
        <div>
            {loading ? <Loading /> : ""}
            {props.children}
            {alert.message.length > 0 ? (
                <Alert
                    show={alert.message.length > 0}
                    message={alert.message}
                />
            ) : (
                ""
            )}
            <NotificationModal
                isError={notification.isError}
                message={notification.message}
                show={notification.show}
                hanldeClose={() => {
                    dispatch(setNotifycation({ show: false, message: "" }));
                }}
            />
            {/* {notification.show ? (
                <NotificationModal
                    isError={notification.isError}
                    message={notification.message}
                    show={notification.show}
                    hanldeClose={() => {
                        dispatch(setNotifycation({ show: false, message: "" }));
                    }}
                />
            ) : null} */}
        </div>
    );
}

export default AuthLayout;
