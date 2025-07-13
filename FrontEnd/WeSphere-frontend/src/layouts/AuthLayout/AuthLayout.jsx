import React from "react";
import Loading from "../../components/Elements/Loading/Loading";
import Alert from "../../components/Elements/Alert/Alert";
import { useSelector } from "react-redux";
function AuthLayout(props) {
  const alert = useSelector((state) => state.auth.alert);
  const loading = useSelector((state) => state.auth.loading);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {loading ? <Loading /> : ''}
      {props.children}
      {alert.message.length > 0 ? <Alert show={alert.message.length > 0} message={alert.message} /> : ''}

    </div>
  );
}

export default AuthLayout;
