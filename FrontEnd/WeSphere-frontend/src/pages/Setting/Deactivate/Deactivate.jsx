import style from "./Deactivate.module.css";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading, logout, setNotifycation } from "../../../redux/authSlide";
import { useNavigate } from "react-router-dom";
import { $api } from "../../../services/service";
import FormConfirmModal from "../../../components/Elements/Modal/FormConfirmModal/FormConfirmModal";
import DeleteConfirmModal from "../../../components/Elements/Modal/DeleteConfirmModal/DeleteConfirmModal";
import { useState } from "react";
const Deactivate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useOutletContext();
    const [showFormConfirmModal, setShowFormConfirmModal] = useState(false);
    const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

    const deactivateAccount = async () => {
        try {
            dispatch(setLoading(true));
            const res = await $api.auth.deactivateAccount(user.id);
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
            <div>
                <div className={`${style.user_card}`}>
                    <img
                        src="https://i.pinimg.com/736x/50/b7/16/50b716a944c630c9a324b54be6a90027.jpg"
                        alt="Avatar"
                    />
                    <div>
                        <div>
                            <strong>@{user.username}</strong>
                        </div>
                        <div>{user.fullname}</div>
                    </div>
                </div>

                <div className={`${style.info_title}`}>
                    Vô hiệu hóa trang cá nhân chỉ mang tính tạm thời
                </div>
                <div className={`${style.info_text}`}>
                    Trang cá nhân, nội dung, lượt thích và người theo dõi trên
                    mạng xã hội của bạn sẽ không hiển thị với bất kỳ ai cho đến
                    khi bạn đăng nhập lại để kích hoạt lại trang cá nhân.
                </div>

                <div className={`${style.info_title}`}>
                    Xóa trang cá nhân là mang tính vĩnh viễn
                </div>
                <div className={`${style.info_text}`}>
                    Trước khi bị gỡ vĩnh viễn, trang cá nhân, nội dung, lượt
                    thích và người theo dõi trên WeSphere của bạn sẽ bị ẩn trong
                    30 ngày.
                </div>

                <div className={`${style.info_title}`}>
                    Chỉ áp dụng cho tài khoản WeSphere cá nhân của bạn
                </div>
                <div className={`${style.info_text}`}>
                    Tài khoản Facebook của bạn (@{user.username}) sẽ không bị
                    xóa hoặc vô hiệu hóa.
                </div>

                <button
                    className={`${style.button} ${style.deactivate_btn} fw-bold`}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowDeactivateConfirm(true);
                    }}
                >
                    Vô hiệu hóa trang cá nhân
                </button>
                <button
                    className={`${style.button} ${style.delete_btn}`}
                    onClick={() => setShowFormConfirmModal(true)}
                >
                    Xóa trang cá nhân
                </button>
            </div>
            {showFormConfirmModal ? (
                <FormConfirmModal
                    show={showFormConfirmModal}
                    username={user.username}
                    fullname={user.fullname}
                    userId={user.id}
                    closeModal={() => setShowFormConfirmModal(false)}
                />
            ) : null}

            {showDeactivateConfirm ? (
                <DeleteConfirmModal
                    show={showDeactivateConfirm}
                    title="Xác nhận vô hiệu hóa tài khoản"
                    onConfirm={deactivateAccount}
                    onCancel={() => setShowDeactivateConfirm(false)}
                />
            ) : null}
        </>
    );
};
export default Deactivate;
