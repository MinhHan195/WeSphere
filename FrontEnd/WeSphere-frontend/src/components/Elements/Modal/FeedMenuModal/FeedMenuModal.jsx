import { _AUTH } from "../../../../constants/_auth";
import style from "./FeedMenuModal.module.css";
import { setLoading, setAlert } from "../../../../redux/authSlide";
import { useDispatch } from "react-redux";
import authService from "../../../../services/auth.service";
import postService from "../../../../services/post.serice";
import { Environment } from "../../../../environments/environment";
const FeedMenuModal = (props) => {
    const { userId, username, feedId, show, blockHandel, state } = props;
    const ownUserId = localStorage.getItem(_AUTH.ID);
    const dispatch = useDispatch();
    const saveFeed = async () => {
        try {
            dispatch(setLoading(true));
            const res = await postService.saveFeed(feedId);
            if (!res.isError) {
                dispatch(setLoading(false));
                show();
                dispatch(setAlert({ message: res.message }));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setAlert({ message: error.message }));
        }
    };

    const unSaveFeed = async () => {
        try {
            dispatch(setLoading(true));
            const res = await postService.unSaveFeed(feedId);
            if (!res.isError) {
                dispatch(setLoading(false));
                blockHandel({ id: feedId });
                show();
                dispatch(setAlert({ message: res.message }));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setAlert({ message: error.message }));
        }
    };

    const restric = async () => {
        try {
            dispatch(setLoading(true));
            const res = await authService.restricUser(userId);
            if (!res.isError) {
                dispatch(setLoading(false));
                blockHandel({ id: userId });
                show();
                dispatch(setAlert({ message: res.message }));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setAlert({ message: error.message }));
        }
    };

    const block = async () => {
        try {
            dispatch(setLoading(true));
            const res = await authService.blockUser(userId);
            console.log(res);
            if (!res.isError) {
                dispatch(setLoading(false));
                blockHandel({ id: userId });
                show();
                dispatch(setAlert({ message: res.message }));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setAlert({ message: error.message }));
        }
    };

    const deleteFeed = async () => {
        try {
            dispatch(setLoading(true));
            const res = await postService.deleteFeed(feedId);
            if (!res.isError) {
                dispatch(setLoading(false));
                blockHandel({ id: feedId });
                show();
                dispatch(setAlert({ message: res.message }));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setAlert({ message: error.message }));
        }
    };

    const copyHandel = async () => {
        const url = Environment.APP_DOMAIN + `/${username}/post/${feedId}`;
        navigator.clipboard
            .writeText(url)
            .then(() => {
                dispatch(setAlert({ message: "Đã copy" }));
                show();
            })
            .catch(() => dispatch(setAlert({ message: "Copy thất bại" })));
    };

    return (
        <div className={`${style.modal_container} rounded-4 `}>
            <div className={`px-2 fw-semibold `}>
                {state.isSave ? (
                    <div
                        className={`d-flex justify-content-between px-3 py-2 mt-2 rounded-3 ${style.btn}`}
                        onClick={unSaveFeed}
                    >
                        Bỏ Lưu <i className="bi bi-bookmark-x"></i>
                    </div>
                ) : (
                    <div
                        className={`d-flex justify-content-between px-3 py-2 mt-2 rounded-3 ${style.btn}`}
                        onClick={saveFeed}
                    >
                        Lưu <i className="bi bi-bookmark"></i>
                    </div>
                )}
            </div>
            {userId === ownUserId ? null : (
                <div className={`px-2 fw-semibold`}>
                    <div
                        className={`d-flex justify-content-between px-3 py-2 rounded-3 ${style.btn}`}
                    >
                        Không quan tâm<i className="bi bi-eye-slash"></i>
                    </div>
                </div>
            )}

            <hr />

            {userId === ownUserId ? null : (
                <>
                    <div className={`px-2 fw-semibold`}>
                        <div
                            className={`d-flex justify-content-between px-3 py-2 rounded-3 ${style.btn}`}
                            onClick={restric}
                        >
                            Hạn chế<i className="bi bi-shield-exclamation"></i>
                        </div>
                    </div>
                    <div className={`px-2 fw-semibold text-danger`}>
                        <div
                            className={`d-flex justify-content-between px-3 py-2 rounded-3 ${style.btn}`}
                            onClick={block}
                        >
                            Chặn<i className="bi bi-ban"></i>
                        </div>
                    </div>
                </>
            )}

            {userId === ownUserId ? (
                <div className={`px-2 fw-semibold text-danger`}>
                    <div
                        className={`d-flex justify-content-between px-3 py-2 rounded-3 ${style.btn}`}
                        onClick={deleteFeed}
                    >
                        Xóa bài viết<i className="bi bi-trash3"></i>
                    </div>
                </div>
            ) : null}

            <hr />
            <div className={`px-2 fw-semibold`}>
                <div
                    className={`d-flex justify-content-between px-3 py-2 mb-2 rounded-3 ${style.btn}`}
                    onClick={copyHandel}
                >
                    Sao chép liên kết<i className="bi bi-link-45deg fs-5"></i>
                </div>
            </div>
        </div>
    );
};
export default FeedMenuModal;
