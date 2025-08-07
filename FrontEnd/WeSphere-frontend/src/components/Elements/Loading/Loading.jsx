import React from "react";
import style from "./Loading.module.css";
const Loading = () => {
    return (
        <div className={`loading-page ${style.loading_page}`}>
            <div className="spinner-border loader" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};
export default Loading;
