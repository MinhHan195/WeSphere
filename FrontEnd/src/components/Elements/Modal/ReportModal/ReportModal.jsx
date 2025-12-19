import { useState } from "react";
import style from "./ReportModal.module.css";
import { $api } from "../../../../services/service";
import { setAlert } from "../../../../redux/authSlide";
import { useDispatch } from "react-redux";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
const ReportModal = ({ handleClose }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const submit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("description", text);
            formData.append("file", file);

            const res = await $api.system.reportError(formData);
            if (!res.isError) {
                setLoading(false);
                dispatch(
                    setAlert({
                        message: res.message,
                    })
                );
                handleClose();
            }
            formData.forEach((key, value) => {
                console.log(key, ": ", value);
            });
        } catch (error) {
            setLoading(false);
            dispatch(
                setAlert({
                    message: error.errors?.exceptionMessage || error.message,
                })
            );
        }
    };

    const validate = () => {
        if (text !== "" || file !== "") {
            return true;
        }
        return false;
    };

    const close = (e) => {
        e.stopPropagation();
        const el = document.querySelector(`.${style.background}`);
        if (el === e.target) {
            if (validate()) {
                setShowConfirmModal(true);
            } else {
                handleClose();
            }
        }
    };

    return (
        <>
            <div className={style.background} onClick={close}>
                <div className={`${style.container}`}>
                    <p className="text-center text-white">
                        <strong>Báo cáo sự cố</strong>
                    </p>
                    <div className={`${style.dialog} rounded-4`}>
                        <form onSubmit={submit}>
                            <div>
                                <textarea
                                    name="description"
                                    className={`form-control ${style.form_control}`}
                                    id=""
                                    rows={5}
                                    placeholder="Vui lòng chia sẽ chi tiết nhất có thể..."
                                    onChange={(e) => setText(e.target.value)}
                                    disabled={loading}
                                ></textarea>
                            </div>

                            <div className="d-flex justify-content-between align-items-center pt-2">
                                <div className="d-flex align-items-center">
                                    <label
                                        className={`custom-file-label fs-5 me-1 ${style.file_lable}`}
                                        htmlFor="file-upload"
                                    >
                                        <i className="bi bi-paperclip"></i>
                                    </label>
                                    <input
                                        id="file-upload"
                                        className={style.input_file}
                                        accept="image/*,video/*"
                                        type="file"
                                        onChange={(e) => {
                                            // console.log(e.target.files[0]);
                                            setFile(e.target.files[0]);
                                        }}
                                    />
                                    {file ? (
                                        <div className={style.file_card}>
                                            <span> {file.name}</span>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setFile("");
                                                }}
                                            >
                                                <i class="bi bi-x"></i>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                                <button
                                    className={`btn ${style.btn}`}
                                    disabled={!validate() || loading}
                                >
                                    {loading ? (
                                        <div
                                            class={`spinner-border spinner-border-sm ${style.spinner}`}
                                            role="status"
                                        >
                                            <span class="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    ) : (
                                        "Gửi"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {showConfirmModal ? (
                <DeleteConfirmModal
                    show={showConfirmModal}
                    title="Bạn muốn hủy báo cáo lỗi?"
                    onConfirm={handleClose}
                    onCancel={() => setShowConfirmModal(false)}
                />
            ) : null}
        </>
    );
};
export default ReportModal;
