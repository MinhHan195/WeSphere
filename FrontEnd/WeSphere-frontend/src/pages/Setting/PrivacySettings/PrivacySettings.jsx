import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { setLoading, setAlert, updateUser } from "../../../redux/authSlide";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { $api } from "../../../services/service";
import PrivacySettingConfirmModal from "../../../components/Elements/Modal/PrivacySettingConfirmModal/PrivacySettingConfirmModal";
import BlockOrLimitUserModal from "../../../components/Elements/Modal/BlockOrLimitUserModal/BlockOrLimitUserModal";
import style from "./PrivacySettings.module.css";
const PrivacySettings = () => {
    const dispatch = useDispatch();
    const { user } = useOutletContext();

    // PRIVACY SETTING
    const privacySettings = user.privateMode;
    const [showPrivacySettingModal, setShowPrivacySettingModal] =
        useState(false);

    const confirmHandle = (value) => {
        setShowPrivacySettingModal(false);
        if (value) {
            updatePrivateMode(!privacySettings);
        }
    };

    const updatePrivateMode = async (value) => {
        try {
            dispatch(setLoading(true));
            const res = await $api.auth.updatePrivateMode(value, user.id);
            if (!res.isError) {
                dispatch(updateUser({ privateMode: res.data.privateMode }));
                dispatch(setLoading(false));
                dispatch(setAlert({ message: res.message }));
                return true;
            }
            return false;
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error.errors?.exceptionMessage ?? error.message,
                })
            );
            return false;
        }
    };

    // BLOCK OR LIMIT SETTING

    const [showBlockOrLimitModal, setShowBlockOrLimitModal] = useState(false);
    const [block, setBlock] = useState(true);
    const [listUser, setListUser] = useState([]);

    const showModalBlockOrLimitHandle = async (isBlock) => {
        if (isBlock) {
            const l = await fectListBlockUser();
            setListUser(l);
        } else {
            const l = await fectListLimitUser();
            setListUser(l);
        }
        setBlock(isBlock);
        setShowBlockOrLimitModal(true);
    };

    const fectListBlockUser = async () => {
        try {
            dispatch(setLoading(true));
            const res = await $api.auth.getListUserBlock(user.id);
            if (!res.isError) {
                console.log(res);
                dispatch(setLoading(false));
                return res.data;
            }
            return [];
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error.errors?.exceptionMessage ?? error.message,
                })
            );
            return [];
        }
    };

    const fectListLimitUser = async () => {
        try {
            dispatch(setLoading(true));
            const res = await $api.auth.getListUserLimit(user.id);
            if (!res.isError) {
                dispatch(setLoading(false));
                return res.data;
            }
            return [];
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error.errors?.exceptionMessage ?? error.message,
                })
            );
            return [];
        }
    };

    const removeUserLimit = async (limitedUserId) => {
        try {
            dispatch(setLoading(true));
            const res = await $api.auth.removeLimitedUser(
                limitedUserId,
                user.id
            );
            if (!res.isError) {
                dispatch(setLoading(false));
                dispatch(setAlert({ message: res.message }));
                setListUser(res.data);
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error.errors?.exceptionMessage ?? error.message,
                })
            );
        }
    };
    const removeUserBlock = async (blockedUserId) => {
        try {
            dispatch(setLoading(true));
            const res = await $api.auth.removeBlockedUser(
                blockedUserId,
                user.id
            );
            if (!res.isError) {
                dispatch(setLoading(false));
                setListUser(res.data);
                dispatch(setAlert({ message: res.message }));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error.errors?.exceptionMessage ?? error.message,
                })
            );
        }
    };
    return (
        <>
            <div>
                <div className="mb-4 d-flex justify-content-between align-items-center">
                    <div>
                        <i className={`bi bi-lock me-2 ${style.icon}`}></i>Trang
                        cá nhân riêng tư
                    </div>
                    <div className="form-check form-switch">
                        <input
                            className={`form-check-input ${style.switch_input}`}
                            type="checkbox"
                            role="switch"
                            id="switchCheckChecked"
                            onChange={() => {
                                setShowPrivacySettingModal(true);
                            }}
                            checked={privacySettings}
                        />
                    </div>
                </div>
                <NavLink
                    to={"/setting/online_status"}
                    className={style.nav_setting_item}
                >
                    <div className="mb-4 d-flex justify-content-between">
                        <div>
                            <i
                                className={`bi bi-activity me-2 ${style.icon}`}
                            ></i>{" "}
                            Trạng thái online
                        </div>
                        <div className="d-flex">
                            <div className={style.text_secondary}>
                                Không ai cả
                            </div>
                            <i className="bi bi-chevron-right ms-1"></i>
                        </div>
                    </div>
                </NavLink>

                <div
                    className="mb-4 d-flex justify-content-between"
                    onClick={() => {
                        showModalBlockOrLimitHandle(false);
                    }}
                >
                    <div>
                        <i
                            className={`bi bi-person-dash me-2 ${style.icon}`}
                        ></i>{" "}
                        Trang cá nhân đã hạn chế
                    </div>
                    <div className="d-flex">
                        <i className="bi bi-chevron-right ms-1"></i>
                    </div>
                </div>
                <div
                    className="mb-4 d-flex justify-content-between"
                    onClick={() => {
                        showModalBlockOrLimitHandle(true);
                    }}
                >
                    <div>
                        <i className={`bi bi-person-x me-2 ${style.icon}`}></i>{" "}
                        Trang cá nhân đã chặn
                    </div>
                    <div className="d-flex">
                        <i className="bi bi-chevron-right ms-1"></i>
                    </div>
                </div>
            </div>
            {showPrivacySettingModal ? (
                <PrivacySettingConfirmModal
                    mode={privacySettings}
                    show={showPrivacySettingModal}
                    closeHandel={() => {
                        setShowPrivacySettingModal(false);
                    }}
                    confirmHanle={confirmHandle}
                />
            ) : null}
            {showBlockOrLimitModal ? (
                <BlockOrLimitUserModal
                    listUser={listUser}
                    isBlock={block}
                    closeModal={() => {
                        setShowBlockOrLimitModal(false);
                    }}
                    removeHandle={block ? removeUserBlock : removeUserLimit}
                />
            ) : null}
        </>
    );
};
export default PrivacySettings;
