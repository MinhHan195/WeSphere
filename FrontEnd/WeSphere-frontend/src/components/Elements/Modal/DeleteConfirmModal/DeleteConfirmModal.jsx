import React, { useState } from "react";
import style from "./DeleteConfirmModal.module.css";

const DeleteConfirmModal = (props) => {
    const { title, onConfirm, onCancel } = props;
    const [show, setShow] = useState(props.show);

    const onCancelHandler = () => {
        onCancel();
        setShow(false);
    };
    return (
        <div
            className={`${style.modal_background} ${
                show ? style.show_confirm_modal : style.hide_confirm_modal
            }`}
        >
            <div className={style.modal_confirm_dialog}>
                <div className={`rounded-4 ${style.modal_confirm_container}`}>
                    <div className={style.modal_confirm_header}>
                        <p className="fw-bold p-3 m-0">{title}</p>
                    </div>
                    <div className={`${style.modal_confirm_body} row m-0 p-0`}>
                        <div
                            className={`col-6  ${style.col_left}`}
                            onClick={onCancelHandler}
                        >
                            <span>Hủy</span>
                        </div>
                        <div
                            className={`col-6 ${style.col_right}`}
                            onClick={onConfirm}
                        >
                            <span className="fw-bold">Gỡ/Xóa</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DeleteConfirmModal;
