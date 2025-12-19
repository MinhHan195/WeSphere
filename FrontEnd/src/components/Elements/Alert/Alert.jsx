import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import style from "./Alert.module.css";
import { setAlert } from "../../../redux/authSlide";
const Alert = (props) => {
    const dispatch = useDispatch();
    const closeAlert = () => {
        // Logic to close the alert
        const alertContainer = document.querySelector(
            `.${style.alert_container}`
        );
        if (
            alertContainer &&
            alertContainer.classList.contains(style.show_alert)
        ) {
            alertContainer.classList.remove(style.show_alert);
            alertContainer.classList.add(`${style.hide_alert}`);
            dispatch(setAlert({ message: "" })); // Clear the alert message
        }
    };

    useEffect(() => {
        if (props.show) {
            const timer = setTimeout(() => {
                closeAlert();
            }, 5000);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.show]);
    return (
        <div
            className={`${style.alert_container} ${
                props.show ? style.show_alert : style.hide_alert
            }`}
        >
            <i
                className={`bi bi-x-lg ${style.btn_close_custom}`}
                onClick={closeAlert}
            ></i>
            <div className={style.btn_custom}>
                <span>{props.message}</span>
            </div>
        </div>
    );
};
export default Alert;
