import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModal } from "../../../redux/createSLide"; // Adjust the import path as necessary
import "./SideMenu.css"; // Assuming you have a CSS file for styling
const SideMenu = () => {
    const dispatch = useDispatch();
    const showModal = () => {
        dispatch(setModal(true));
    }
    return (
        <div className="sidebar">
            <div className="text-center mt-2">
                <img
                    src="/main-logo.svg"
                    alt="Logo"
                    style={{ width: "50px", height: "50px" }}
                />
            </div>
            <div className="sidebar-main">
                <NavLink to="/" className={"menu-icon"}>
                    {({ isActive }) => (
                        <i
                            className={`bi  ${isActive ? "bi-house-fill active" : "bi-house"
                                }`}
                            data-icon="house"
                        ></i>
                    )}
                </NavLink>
                <NavLink to="/find" className={"menu-icon"}>
                    {({ isActive }) => (
                        <i
                            className={`bi  ${isActive ? "bi-search active" : "bi-search"}`}
                            data-icon="search"
                        ></i>
                    )}
                </NavLink>
                <div className="menu-icon" onClick={showModal}>
                    <i className="bi bi-plus" data-icon="plus"></i>
                </div>
                <NavLink to="/notification" className={"menu-icon"}>
                    {({ isActive }) => (
                        <i
                            className={`bi  ${isActive ? "bi-heart-fill active" : "bi-heart"
                                }`}
                            data-icon="heart"
                        ></i>
                    )}
                </NavLink>
                <NavLink to="/profile" className={"menu-icon"}>
                    {({ isActive }) => (
                        <i
                            className={`bi  ${isActive ? "bi-person-fill active" : "bi-person"
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
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                    style={{ width: "200px" }}
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
                        <a className="dropdown-item text-danger" href="#">
                            Đăng xuất
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default SideMenu;
