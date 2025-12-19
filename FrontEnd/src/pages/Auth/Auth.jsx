import React from "react";
import { useEffect } from "react";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Login from "../../components/Auth/Login/Login";
import { useNavigate } from "react-router-dom";
import { _AUTH } from "../../constants/_auth";

function Auth() {
  const token = localStorage.getItem(_AUTH.TOKEN_NAME);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });
  useEffect(() => {
    document.title = "WeSphere • Đăng nhập";
  }, []);

  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}

export default Auth;
