import React from "react";
import { useDispatch } from "react-redux";
import "./Alert.css";
import { setAlert } from "../../../redux/authSlide";
const Alert = (props) => {
    const dispatch = useDispatch();
    const closeAlert = () => {
        // Logic to close the alert
        const alertContainer = document.querySelector('.alert-container');
        if (alertContainer && alertContainer.classList.contains('show-alert')) {
            alertContainer.classList.remove('show-alert');
            alertContainer.classList.add('hide-alert');
            dispatch(setAlert({ message: '' })); // Clear the alert message
        }
    };
    return (
        <div className={`alert-container ${props.show ? "show-alert" : "hide-alert"}`}>
            <button type="button" className="btn-close btn-close-custom focus-ring focus-ring-light" onClick={closeAlert}></button>
            <div className="btn-custom">
                <span>{props.message}</span>
            </div>
        </div>
    );
};
export default Alert;
