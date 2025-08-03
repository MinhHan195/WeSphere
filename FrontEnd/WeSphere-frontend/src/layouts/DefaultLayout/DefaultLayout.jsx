import React from "react";
import SideMenu from "../../components/Layouts/SideMenu/SideMenu";
import CreateModal from "../../components/Elements/Modal/CreateModal/CreateModal";
import Alert from "../../components/Elements/Alert/Alert";
import { useSelector } from "react-redux";
import style from "./DefaultLayout.module.css";

const DefaultLayout = (props) => {
    const alert = useSelector((state) => state.auth.alert);
    const show = useSelector((state) => state.create.show);

    return (
        <div className="m-0 p-0">
            <SideMenu />
            {show ? <CreateModal /> : null}
            <div className={style.main_container}>{props.children}</div>
            {alert.message.length > 0 ? (
                <Alert
                    show={alert.message.length > 0}
                    message={alert.message}
                />
            ) : (
                ""
            )}
        </div>
    );
};

export default DefaultLayout;
