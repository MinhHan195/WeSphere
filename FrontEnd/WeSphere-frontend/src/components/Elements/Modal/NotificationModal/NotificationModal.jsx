import { useDispatch } from "react-redux";
import { setNotifycation } from "../../../../redux/authSlide";
import style from "./NotificationModal.module.css";
const NotificationModal = ({ show, message, isError }) => {
    const dispatch = useDispatch();
    return (
        <div
            className={`${style.modal_background} ${
                show
                    ? style.show_notification_modal
                    : style.hide_notification_modal
            }`}
        >
            <div className={style.modal_notification_dialog}>
                <div className={`${style.modal_notification_container}`}>
                    <div className={style.modal_notification_header}>
                        <div>
                            {isError ? (
                                <>
                                    <i
                                        className={`bi bi-exclamation-circle-fill me-1 fs-4 text-danger`}
                                    ></i>
                                    <span className="text-danger fw-bold fs-5">
                                        Lỗi
                                    </span>
                                </>
                            ) : (
                                <>
                                    <i
                                        className={`bi bi-chat-dots-fill me-2 fs-4`}
                                    ></i>
                                    <span className="fw-bold fs-5">
                                        Thông báo
                                    </span>
                                </>
                            )}
                        </div>

                        <div
                            className={`p-3 m-0 text-center w-100 ${
                                isError ? "text-danger fw-bold" : null
                            }`}
                        >
                            {message}
                        </div>
                    </div>
                    <div
                        className={`${style.modal_notification_body} row m-0 p-0 fw-semibold`}
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(
                                setNotifycation({
                                    show: false,
                                    message: "",
                                })
                            );
                        }}
                    >
                        {isError ? "Sửa" : "Đóng"}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NotificationModal;
