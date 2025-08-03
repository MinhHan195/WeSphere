import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../redux/createSLide";
import { logout } from "../../../redux/authSlide";
import style from "./SideMenu.module.css";
// import "./SideMenu.css";
const SideMenu = () => {
    const dispatch = useDispatch();
    const showModal = () => {
        dispatch(setModal(true));
    };
    const username = useSelector((state) => state.auth.user.username);

    const logOut = () => {
        dispatch(logout());
    };
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
                                isActive ? "bi-house-fill active" : "bi-house"
                            }`}
                            data-icon="house"
                        ></i>
                    )}
                </NavLink>
                <NavLink to="/find" className={style.menu_icon}>
                    {({ isActive }) => (
                        <i
                            className={`bi  ${
                                isActive ? "bi-search active" : "bi-search"
                            }`}
                            data-icon="search"
                        ></i>
                    )}
                </NavLink>
                <div className={`${style.menu_icon}`} onClick={showModal}>
                    <i
                        className={`bi bi-plus ${style.menu_icon}  ${style.bi_plus}`}
                        data-icon="plus"
                    ></i>
                </div>
                <NavLink to="/notification" className={style.menu_icon}>
                    {({ isActive }) => (
                        <i
                            className={`bi  ${
                                isActive ? "bi-heart-fill active" : "bi-heart"
                            }`}
                            data-icon="heart"
                        ></i>
                    )}
                </NavLink>
                <NavLink to={`/${username}`} className={style.menu_icon}>
                    {({ isActive }) => (
                        <i
                            className={`bi  ${
                                isActive ? "bi-person-fill active" : "bi-person"
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
                >
                    <i className="bi bi-list fs-4"></i>
                </button>
                <ul
                    className={`dropdown-menu ${style.dropdown_menu_custom}`}
                    aria-labelledby="dropdownMenuButton"
                >
                    <li>
                        <a className="dropdown-item" href="#">
                            Giao diện
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Thông tin chi tiết
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Cài đặt
                        </a>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Bảng feed
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="./save.html">
                            Đã lưu
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="./favorite.html">
                            Đã thích
                        </a>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <a
                            className="dropdown-item"
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
