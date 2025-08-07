import React from "react";
import style from "./PrivacySettingConfirmModal.module.css";
const PrivacySettingConfirmModal = ({
    show,
    confirmHanle,
    closeHandel,
    mode,
}) => {
    return (
        <div
            className={`${style.modal_background} ${
                show ? style.show : style.hide
            }`}
        >
            <div className={`${style.modal_dialog} rounded-4 shadow`}>
                <div className={style.modal_header}>
                    <p className="fw-bold text-center mb-0">
                        Chuyển sang trang cá nhân riêng tư?
                    </p>
                </div>
                <div className={style.modal_description}>
                    <p className="text-secondary text-center mb-0">
                        {mode
                            ? "Bất kỳ ai đều có thể xem và tương tác với nội dung của bạn."
                            : "Chỉ những người theo dõi mà bạn phê duyệt mới có thể xem và tương tác với nội dung của bạn."}
                    </p>
                </div>
                <hr className="m-0" />
                <div className={`${style.modal_body} row m-0 p-0`}>
                    <div
                        className={`${style.button} ${style.btn_left} col-6`}
                        onClick={() => {
                            closeHandel();
                            confirmHanle(false);
                        }}
                    >
                        <span className="fw-bold">Hủy</span>
                    </div>
                    <div
                        className={` ${style.button} ${style.btn_right} col-6`}
                        onClick={() => {
                            confirmHanle(true);
                        }}
                    >
                        <span className="fw-bold text-danger">OK</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PrivacySettingConfirmModal;
