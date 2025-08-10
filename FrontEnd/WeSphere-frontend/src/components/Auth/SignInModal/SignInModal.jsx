import { useEffect, useState } from "react";
import style from "./SignInModal.module.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setAlert, setLoading } from "../../../redux/authSlide";
import { $api } from "../../../services/service";
import { _AUTH } from "../../../constants/_auth";
const SignInModal = ({ data, show, handleClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState(data.name);
    const [error, setError] = useState("");

    const saveUserInfo = (userInfo, token) => {
        localStorage.setItem(_AUTH.TOKEN_NAME, token);
        localStorage.setItem(_AUTH.USERNAME, userInfo["UserName"]);
    };

    const checkUsername = async () => {
        try {
            const res = await $api.auth.checkUsername(username);
            if (!res.isError) {
                if (!res.result) {
                    setError(res.message);
                }
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error.errors?.exceptionMessage || error.message,
                })
            );
        }
    };

    useEffect(() => {
        if (username !== "") checkUsername();
    }, [username]);

    const submit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const credential = {
                username: username,
                password: password,
                fullName: fullName,
                avatar: data.picture.data.url,
                email: data.email,
            };

            const res = await $api.auth.signUp(credential);
            if (!res.isError) {
                let obj_login = await jwtDecode(res.result);
                saveUserInfo(obj_login, res.result);
                dispatch(setLoading(false));
                navigate("/");
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error.errors?.exceptionMessage || error.message,
                })
            );
        }
    };

    const handleCloseModal = (e) => {
        e.preventDefault();
        const el = document.querySelector(`.${style.background}`);
        if (e.target === el) {
            handleClose();
        }
    };

    return (
        <div
            className={`${style.background} ${show ? style.show : style.hide}`}
            onClick={handleCloseModal}
        >
            <div className={style.container}>
                <h5 className={style.title}>Tạo tài khoản</h5>
                <div>
                    <input
                        type="text"
                        className={`form-control mb-2 ${style.form_control} ${
                            error ? style.invalid : null
                        }`}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {error ? (
                        <div className={style.invalid_feedback}>{error}</div>
                    ) : null}
                    <hr className={style.divider} />
                    <input
                        type="text"
                        className={`form-control mb-2 ${style.form_control}`}
                        placeholder="Họ và tên"
                        defaultValue={fullName}
                        readOnly={data}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <hr className={style.divider} />
                    <input
                        type="password"
                        className={`form-control mb-2 ${style.form_control}`}
                        placeholder="Mật khẩu"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <hr className={style.divider} />
                    <button
                        type="button"
                        className={`btn ${style.btn_register}`}
                        onClick={submit}
                    >
                        Đăng ký
                    </button>
                </div>
            </div>
        </div>
    );
};
export default SignInModal;
