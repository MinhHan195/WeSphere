import { useState } from "react";
import { $api } from "../../../../services/service";
import { useNavigate } from "react-router-dom";
import {
    setLoading,
    logout,
    setNotifycation,
} from "../../../../redux/authSlide";
import { useDispatch } from "react-redux";
import style from "./FormConfirmModal.module.css";

const FormConfirmModal = ({ show, username, userId, fullname, closeModal }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");

    const close = (e) => {
        e.preventDefault();
        if (e.target.classList.contains(style.modal_background)) {
            closeModal();
        }
    };

    const deleteAccount = async () => {
        try {
            if (!password) {
                dispatch(
                    setNotifycation({
                        show: true,
                        isError: true,
                        message: "Vui lòng nhập mật khẩu!",
                    })
                );
                return;
            }
            dispatch(setLoading(true));
            const data = {
                id: userId,
                username: username,
                password: password,
            };

            const res = await $api.auth.deleteAccount(data);
            if (!res.isError) {
                dispatch(setLoading(false));
                dispatch(
                    setNotifycation({
                        show: true,
                        isError: false,
                        message: res.message,
                    })
                );
                dispatch(logout());
                navigate("/auth");
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setNotifycation({
                    show: true,
                    isError: false,
                    message: error.errors?.exceptionMessage ?? error.message,
                })
            );
        }
    };
    return (
        <>
            <div
                className={`${style.modal_background} ${
                    show ? style.show : style.hide
                }`}
                onClick={close}
            >
                <div className={`${style.modal_dialog} rounded-4 shadow`}>
                    <div className={style.modal_header}>
                        <p className="fw-bold text-center mb-0">
                            Đăng nhập để xóa vĩnh viễn trang cá nhân
                        </p>
                    </div>
                    <div className={`${style.modal_body} rounded-3`}>
                        <div className={`${style.form_element}`}>
                            <label className="fw-bold">Tên người dùng</label>
                            <input
                                type="text"
                                className={`form-control mb-1 ${style.form_custom}`}
                                value={`${fullname}(@${username})`}
                                disabled
                            />
                        </div>
                        <div className="mt-3">
                            <label className="fw-bold">Mật khẩu</label>
                            <input
                                type="password"
                                className={`form-control ${style.form_custom} pb-0`}
                                placeholder="Nhập mật khẩu facebook của bạn"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <button
                        className={`${style.btn_custom} rounded-3 fw-bold`}
                        onClick={deleteAccount}
                    >
                        Xóa trang cá nhân
                    </button>
                </div>
            </div>
        </>
    );
};
export default FormConfirmModal;
