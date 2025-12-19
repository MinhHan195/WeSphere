import React, { useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./Setting.module.css";
import { useEffect } from "react";
import { setAlert, setLoading } from "../../redux/authSlide";
import { $api } from "../../services/service";
import { _AUTH } from "../../constants/_auth";
const Setting = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});

    const fetchData = async (userId) => {
        try {
            dispatch(setLoading(true));
            const res = await $api.auth.getUser(userId);
            if (!res.isError) {
                setUser(res.data);
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
        document.title = "Cài đặt • WeSphere";
        const userId = localStorage.getItem(_AUTH.ID);
        if (userId) {
            fetchData(userId);
        }
    }, []);

    return (
        <DefaultLayout>
            <div className="d-flex justify-content-center w-100 h">
                <div className={`mt-4 rounded-4 ${style.setting_container}`}>
                    <h5 className="fw-bold text-center mb-4">Quyền riêng tư</h5>
                    <div className="row">
                        <div className="col-md-4 border-end">
                            <ul className={`list-unstyled`}>
                                <NavLink
                                    className={({ isActive }) =>
                                        `${style.nav_setting_item} ${
                                            isActive ? style.active : ""
                                        }`
                                    }
                                    to={"/setting/privacy"}
                                >
                                    <li className="p-3  rounded mb-2">
                                        <i className="bi bi-lock me-2"></i>{" "}
                                        Quyền riêng tư
                                    </li>
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        `${style.nav_setting_item} ${
                                            isActive ? style.active : ""
                                        }`
                                    }
                                    to={"/setting/account"}
                                >
                                    <li className="p-3 rounded mb-2">
                                        <i className="bi bi-person-circle me-2"></i>{" "}
                                        Tài khoản
                                    </li>
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        `${style.nav_setting_item} ${
                                            isActive ? style.active : ""
                                        }`
                                    }
                                    to={"/setting/theme"}
                                >
                                    <li className="p-3 rounded mb-2">
                                        <i className="bi bi-palette-fill me-2"></i>{" "}
                                        Chủ đề
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                        <div className="col-md-8">
                            <Outlet context={{ user: user }} />
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};
export default Setting;
