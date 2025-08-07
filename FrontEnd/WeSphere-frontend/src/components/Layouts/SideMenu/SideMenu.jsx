import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setModal } from "../../../redux/createSLide";
import { logout } from "../../../redux/authSlide";
import Theme from "../../../pages/Setting/Theme/Theme";
import style from "./SideMenu.module.css";
// import "./SideMenu.css";
const SideMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showTheme, setShowTheme] = useState(false);
    const showModal = () => {
        dispatch(setModal(true));
    };
    const username = useSelector((state) => state.auth.user.username);

    const logOut = () => {
        dispatch(logout());
        navigate("/auth");
    };

    useEffect(() => {
        const handle = (e) => {
            e.stopPropagation();
            const themeDropdown = document.querySelector(
                `.${style.theme_modal}`
            );
            const themeButton = document.querySelector("#themeButton");
            if (themeDropdown && themeButton) {
                if (!themeDropdown.contains(e.target)) {
                    if (themeButton !== e.target) {
                        setShowTheme(false);
                        // console.log(true);
                    }
                }
            }
        };
        document.addEventListener("click", handle);
        return () => {
            document.removeEventListener("click", handle);
        };
    }, []);
    return (
        <div className={style.sidebar}>
            <div className="text-center mt-2">
                <img
                    src="/main-logo.svg"
                    alt="Logo"
                    style={{ width: "50px", height: "50px" }}
                />
            </div>
            <div className={style.sidebar_main}>
                <NavLink to="/" className={style.menu_icon}>
                    {({ isActive }) => (
                        <i
                            className={`bi  ${
                                isActive
                                    ? `bi-house-fill ${style.active}`
                                    : "bi-house"
                            }`}
                            data-icon="house"
                        ></i>
                    )}
                </NavLink>
                <NavLink to="/find" className={style.menu_icon}>
                    {({ isActive }) => (
                        <i
                            className={`bi  ${
                                isActive
                                    ? `bi-search ${style.active}`
                                    : "bi-search"
                            }`}
                            data-icon="search"
                        ></i>
                    )}
                </NavLink>
                <div className={`${style.menu_icon}`} onClick={showModal}>
                    <i
                        className={`bi bi-plus ${style.menu_icon} ${style.bi_plus}`}
                        data-icon="plus"
                    ></i>
                </div>
                <NavLink to="/notification" className={style.menu_icon}>
                    {({ isActive }) => (
                        <i
                            className={`bi  ${
                                isActive
                                    ? `bi-heart-fill ${style.active}`
                                    : "bi-heart"
                            }`}
                            data-icon="heart"
                        ></i>
                    )}
                </NavLink>
                <NavLink to={`/${username}`} className={style.menu_icon}>
                    {({ isActive }) => (
                        <i
                            className={`bi  ${
                                isActive
                                    ? `bi-person-fill ${style.active}`
                                    : "bi-person"
                            }`}
                            data-icon="person"
                        ></i>
                    )}
                </NavLink>
            </div>

            <div className="dropdown mb-4">
                <button
                    className="btn border-0"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowTheme(false);
                    }}
                >
                    <i
                        className={`bi bi-list fs-4 ${style.open_modal_menu_icon}`}
                    ></i>
                </button>
                {showTheme ? (
                    <div className={style.theme_modal}>
                        <div className={style.theme_modal_header}>
                            <button
                                className="btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const button = document.querySelector(
                                        "#dropdownMenuButton"
                                    );
                                    button.click();
                                    setShowTheme(false);
                                }}
                            >
                                <i className="bi bi-arrow-left"></i>
                            </button>
                            <span>Giao diện</span>
                        </div>
                        <Theme />
                    </div>
                ) : null}
                <ul
                    className={`dropdown-menu ${style.dropdown_menu_custom}`}
                    aria-labelledby="dropdownMenuButton"
                >
                    <li>
                        <span
                            className="dropdown-item text-dark"
                            onClick={() => setShowTheme(!showTheme)}
                            id="themeButton"
                        >
                            Giao diện
                        </span>
                    </li>
                    <li>
                        <NavLink
                            to={`/setting/privacy`}
                            className={({ isActive }) =>
                                `dropdown-item text-dark ${
                                    isActive ? style.active : null
                                }`
                            }
                        >
                            Cài đặt
                        </NavLink>
                        {/* <a className="dropdown-item text-dark" href="#"></a> */}
                    </li>
                    <li>
                        <hr className={`dropdown-divider ${style.border}`} />
                    </li>
                    <li>
                        <a
                            className="dropdown-item  text-dark"
                            href="./save.html"
                        >
                            Đã lưu
                        </a>
                    </li>
                    <li>
                        <a
                            className="dropdown-item  text-dark"
                            href="./favorite.html"
                        >
                            Đã thích
                        </a>
                    </li>
                    <li>
                        <hr className={`dropdown-divider ${style.border}`} />
                    </li>
                    <li>
                        <a
                            className="dropdown-item text-dark"
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#reportModal"
                        >
                            Báo cáo sự cố
                        </a>
                    </li>
                    <li>
                        <a
                            className="dropdown-item text-danger"
                            href="#"
                            id={style.logOut}
                            onClick={logOut}
                        >
                            Đăng xuất
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default SideMenu;
