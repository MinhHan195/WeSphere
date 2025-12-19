import React, { useEffect } from "react";
import style from "./Theme.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../../redux/authSlide.js";
const Theme = () => {
    const dispatch = useDispatch();
    const walk = useSelector((state) => state.auth.theme);

    const move = () => {
        const el = document.querySelector(`.${style.active}`);
        if (el) {
            el.style.transform = `translateX(${walk}%)`;
            el.style.transition = "transform 0.3s cubic-bezier(0.4,0,0.2,1)";
        }
    };

    const setFromTo = (index) => {
        if (index === 1) {
            dispatch(setTheme(0));
        } else if (index === 2) {
            dispatch(setTheme(100));
        } else if (index === 3) {
            dispatch(setTheme(200));
        }
    };

    useEffect(() => {
        move();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walk]);

    return (
        <div className={style.theme_container}>
            <div className={`${style.active}`}></div>
            <div
                className={`${style.theme_item} ${style.theme_item_light}`}
                onClick={() => setFromTo(1)}
            >
                <i className="bi bi-brightness-low"></i>
            </div>
            <div
                className={`${style.theme_item} ${style.theme_item_night}`}
                onClick={() => setFromTo(2)}
            >
                <i className="bi bi-moon-stars"></i>
            </div>
            <div
                className={`${style.theme_item} ${style.theme_item_auto}`}
                onClick={() => setFromTo(3)}
            >
                Tự động
            </div>
        </div>
    );
};
export default Theme;
