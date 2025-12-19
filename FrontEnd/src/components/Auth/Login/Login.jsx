import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { $api } from "../../../services/service";
import { _AUTH } from "../../../constants/_auth";
import { jwtDecode } from "jwt-decode";
import { Environment } from "../../../environments/environment";
import { useDispatch } from "react-redux";
import style from "./Login.module.css";
import { setAlert, setLoading } from "../../../redux/authSlide";
import SignInModal from "../SignInModal/SignInModal";

const Login = () => {
    const [showSignInModal, setShowSignInModal] = useState(false);

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState(null);
    const [_baseURL, _setBaseURL] = useState("");
    const [_code, _setCode] = useState("");
    const { search } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const saveUserInfo = async (userInfo, token) => {
        localStorage.setItem(_AUTH.TOKEN_NAME, token);
        localStorage.setItem(_AUTH.USERNAME, userInfo["UserName"]);
        localStorage.setItem(_AUTH.ID, userInfo["UserId"]);
    };

    const getCodeFromURL = () => {
        const query = new URLSearchParams(search);
        if (query.get("code")) {
            _setCode(query.get("code"));
            console.log("Code:", query.get("code"));
        }
    };

    const createUrlInstagramLogin = () => {
        const query = {
            client_id: Environment.INSTA_CLIENT_ID,
            redirect_uri: Environment.REDIRECT_URL,
            scope: "instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights",
            response_type: "code",
            // force_reauth: "true",
        };
        const url =
            Environment.OAUTH_URL + "?" + new URLSearchParams(query).toString();
        _setBaseURL(url);
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const credential = { username: username, password: password };
            const res = await $api.auth.login(credential);
            console.log(res);
            let obj_login = await jwtDecode(res.result);
            saveUserInfo(obj_login, res.result);
            if (obj_login["Role"] === "User") {
                navigate("/");
            }
            dispatch(setLoading(false));
        } catch (error) {
            console.log(error);
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error.errors.exceptionMessage,
                })
            );
        }
    };

    const handleLoginWithInstagram = async () => {
        try {
            dispatch(setLoading(true));
            const res = await $api.auth.loginWithInstagram(_code);
            if (res.isError) {
                dispatch(setLoading(false));
                setResponse(response);
                setShowSignInModal(true);
                return;
            }
            let obj_login = await jwtDecode(res.result);
            saveUserInfo(obj_login, res.result);
            if (
                obj_login["Role"] === "User" ||
                obj_login["Role"] === "Student"
            ) {
                navigate("/");
            }
            dispatch(setLoading(false));
        } catch (error) {
            console.log(error);
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error.errors.exceptionMessage,
                })
            );
        }
    };

    useEffect(() => {
        createUrlInstagramLogin();
        getCodeFromURL();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (_code !== "") {
            handleLoginWithInstagram();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_code]);
    return (
        <>
            <div className={style.login_background}>
                <div className={style.login_container}>
                    <div className="mb-4">
                        <img
                            src="/main-logo.svg"
                            alt="logo"
                            style={{ width: "100px" }}
                        />
                    </div>
                    <div className={`${style.login_box} rounded-4`}>
                        <h6 className="mb-4 fw-bold">Đăng nhập vào WeSphere</h6>
                        <form
                            onSubmit={(e) => submit(e)}
                            onKeyDown={(e) => {
                                e.key === "Enter" && submit(e);
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Tên người dùng, email hoặc số điện thoại"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" className={style.btn_login}>
                                Đăng nhập
                            </button>
                        </form>
                        <div className="mt-3">
                            <a
                                href="#"
                                className={style.text_secondary}
                                style={{ fontSize: "0.85rem" }}
                            >
                                Bạn quên mật khẩu?
                            </a>
                        </div>
                        <div
                            className={`${style.divider} ${style.text_secondary}`}
                        >
                            Hoặc
                        </div>

                        <a href={_baseURL} className={style.link_btn}>
                            <div
                                className={`d-flex align-items-center justify-content-center ${style.instagram_login_btn}`}
                            >
                                <i className="bi bi-instagram me-3 fs-4"></i>
                                Tiếp tục bằng Instagram
                            </div>
                        </a>
                    </div>

                    <div
                        className={`${style.footer_links} ${style.text_secondary} mt-4 text-center`}
                    >
                        &copy; 2025 ·<a href="#">Điều khoản</a> ·{" "}
                        <a href="#">Chính sách</a> ·<a href="#">Cookie</a> ·
                        <a href="#">Báo cáo sự cố</a>
                    </div>
                </div>
            </div>
            {showSignInModal ? (
                <SignInModal
                    data={response}
                    show={showSignInModal}
                    handleClose={() => setShowSignInModal(false)}
                />
            ) : null}
        </>
    );
};
export default Login;
