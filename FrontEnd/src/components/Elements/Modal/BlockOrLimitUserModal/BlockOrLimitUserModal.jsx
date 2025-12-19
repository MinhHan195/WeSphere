import React from "react";
import UserCard from "../../UserCard/UserCard";
import style from "./BlockOrLimitUserModal.module.css";
const BlockOrLimitUserModal = (props) => {
    const { show, isBlock, closeModal, listUser, removeHandle } = props;
    const handleClose = (e) => {
        e.stopPropagation();
        if (e.target.classList.contains(style.modal_background)) {
            closeModal();
        }
    };
    return (
        <div
            className={`${style.modal_background} ${
                show ? style.show : style.hide
            }`}
            onClick={handleClose}
        >
            <div className={`${style.modal_dialog} rounded-4 shadow`}>
                <div className={style.modal_header}>
                    <p className="fw-bold text-center mb-0">
                        {isBlock ? "Đã chặn" : "Đã hạn chế"}
                    </p>
                </div>
                <div className={style.modal_description}>
                    <p className={`${style.text_secondary} text-center mb-0`}>
                        {isBlock
                            ? "Hệ thống sẽ chặn bài viết và trang cá nhân trên feed của bạn."
                            : "Giới hạn ai đó tương tác mà không cần chặn hoặc bỏ theo dõi họ."}
                    </p>
                </div>
                <div className={`${style.modal_body} row m-0 p-0`}>
                    {listUser.length > 0 ? (
                        listUser.map((user, idx) => {
                            return (
                                <div key={idx} className="w-100 pb-3">
                                    <UserCard
                                        user={user}
                                        isBlock={isBlock}
                                        removeHandle={removeHandle}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <>
                            <hr className="p-0 m-0" />
                            <div className={style.empty}>
                                <p className="text-secondary">
                                    Không có người dùng nào bị{" "}
                                    {isBlock ? "chặn" : "hạn chế"}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default BlockOrLimitUserModal;
