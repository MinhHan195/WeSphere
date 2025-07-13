import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { $api } from '../../../services/service';
import { _AUTH } from '../../../constants/_auth';
import { jwtDecode } from 'jwt-decode';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { Environment } from '../../../environments/environment';
import { useDispatch } from 'react-redux';
import './Login.css';
import { setAlert, setLoading } from '../../../redux/authSlide';

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const saveUserInfo = (userInfo, token) => {
        localStorage.setItem(_AUTH.TOKEN_NAME, token);
        localStorage.setItem(_AUTH.USERNAME, userInfo['UserName']);
        localStorage.setItem(_AUTH.ROLE, userInfo['Role']);
    }
    const submit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const credential = { "username": username, "password": password }
            const res = await $api.auth.login(credential);
            let obj_login = await jwtDecode(res.result);
            saveUserInfo(obj_login, res.result);
            if (obj_login['Role'] === 'User' || obj_login['Role'] === 'Student') {
                navigate('/');
            }
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setAlert({
                message: error.errors.exceptionMessage
            }));
        }
    }

    const handleLoginWithFacebook = async (response) => {
        try {
            dispatch(setLoading(true));
            const res = await $api.auth.loginWithFacebook(response);
            let obj_login = await jwtDecode(res.result);
            saveUserInfo(obj_login, res.result);
            if (obj_login['Role'] === 'User' || obj_login['Role'] === 'Student') {
                navigate('/');
            }
            dispatch(setLoading(true));
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setAlert({
                message: error.errors.exceptionMessage
            }));
        }
    }
    return (
        <div className="login-container">
            <div className="mb-4">
                <img
                    src="/main-logo.svg"
                    alt="logo"
                    style={{ width: "100px" }}
                />
            </div>
            <div className="login-box">
                <h6 className="mb-4 fw-bold">Đăng nhập bằng tài khoản Facebook</h6>
                <form onSubmit={(e) => submit(e)}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && submit(e);
                    }}>
                    <input
                        type="text"
                        placeholder="Tên người dùng, email hoặc số điện thoại"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input type="password" placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit' className="btn-login">Đăng nhập</button>
                </form>

                <div className="mt-3">
                    <a href="#" className="text-muted" style={{ fontSize: "0.85rem" }}>
                        Bạn quên mật khẩu?
                    </a>
                </div>
                <div className="divider">hoặc</div>
                {/* <div className="d-flex align-items-center justify-content-center mb-3 register-btn"
                    onClick={handleRegister}
                >
                    Tạo tài khoản
                </div> */}
                <FacebookLogin
                    children={
                        <>
                            <div className="d-flex align-items-center justify-content-center">
                                <i className="bi bi-facebook me-3 fs-4"></i>
                                Tiếp tục bằng Facebook
                            </div>
                        </>
                    }
                    className='facebook-login-btn'
                    appId={Environment.FB_APP_ID}
                    autoLoad={true}
                    fields="name,email,picture,gender"
                    scope='public_profile, email'
                    // onSuccess={(response) => {
                    //     console.log('Login Success!', response);
                    // }}
                    onFail={(error) => {
                        console.log('Login Failed!', error);
                    }}
                    onProfileSuccess={(response) => {
                        handleLoginWithFacebook(response);
                    }}
                />
            </div>

            <div className="footer-links mt-4 text-center">
                &copy; 2025 ·<a href="#">Điều khoản</a> · <a href="#">Chính sách</a> ·
                <a href="#">Cookie</a> ·<a href="#">Báo cáo sự cố</a>
            </div>
        </div>
    )
}
export default Login