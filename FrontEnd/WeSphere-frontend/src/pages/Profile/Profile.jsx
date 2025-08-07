/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setAlert, setLoading } from "../../redux/authSlide.js";
import { setModal } from "../../redux/createSLide.js";
import { $api } from "../../services/service.js";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import UpdateProfileModal from "../../components/Elements/Modal/UpdateProfileModal/UpdateProfileModal.jsx";
import ProfileBar from "../../components/Layouts/ProfileBar/ProfileBar.jsx";
import ListLinkModal from "../../components/Elements/Modal/ListLinkModal/ListLinkModal.jsx";
import style from "./Profile.module.css";
const Profile = () => {
    const dispatch = useDispatch();
    const param = useParams();
    const auth = useSelector((state) => state.auth.user);
    const [user, setUser] = useState({});
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showListLinkModal, setShowListLinkModal] = useState(false);
    const handleShowHideUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
    };

    const handleShowListLinkModal = () => {
        setShowListLinkModal(true);
    };

    const fetchData = async (userName) => {
        try {
            dispatch(setLoading(true));
            const res = await $api.auth.getUser(userName);
            if (!res.isError) {
                setUser(res.data);
                dispatch(setLoading(false));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    message: error?.errors?.exceptionMessage ?? error.message,
                })
            );
        }
    };

    useEffect(() => {
        fetchData(param.username);
    }, []);

    // useEffect(() => {
    //     console.log(user);
    // }, [user]);

    useEffect(() => {
        document.title = `${user.fullname} (${user.username}) • WeSphere`;
    }, [user]);
    return (
        <DefaultLayout>
            <div className=" d-flex justify-content-center w-100">
                <div className={`mt-4 ${style.profile_container}`}>
                    <div className={style.profile_header}>
                        <div className="d-flex align-items-center mb-5">
                            <div className="me-3">
                                <div
                                    className={`bg-secondary rounded-circle ${style.avatar}`}
                                >
                                    <img
                                        className="img-fluid"
                                        src={
                                            user.avatar
                                                ? user.avatar
                                                : "/default_avatar.jpg"
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div>
                                <h5 className="mb-1 fw-bold">
                                    {user.fullname}
                                </h5>
                                <small className={`${style.text_secondary}`}>
                                    {user.username}
                                </small>
                                <p
                                    className={`mt-1 mb-1 ${style.text_secondary}`}
                                >
                                    {user.bio}
                                </p>
                                <small className={`${style.text_secondary}`}>
                                    {user.followers} người theo dõi{" "}
                                    <span className={style.list_link_button}>
                                        {user.listLinks &&
                                        user.listLinks.length > 0 ? (
                                            <>
                                                •{" "}
                                                {user.listLinks.length == 1 ? (
                                                    <a
                                                        href={
                                                            user.listLinks[0]
                                                                .url
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {
                                                            user.listLinks[0]
                                                                .title
                                                        }
                                                    </a>
                                                ) : (
                                                    <>
                                                        <a
                                                            href={
                                                                user
                                                                    .listLinks[0]
                                                                    .url
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {
                                                                user
                                                                    .listLinks[0]
                                                                    .title
                                                            }
                                                        </a>
                                                        <i
                                                            className="bi bi-chevron-down ms-1"
                                                            onClick={
                                                                handleShowListLinkModal
                                                            }
                                                        ></i>
                                                    </>
                                                )}
                                            </>
                                        ) : null}
                                    </span>
                                </small>
                            </div>
                        </div>
                        {user.id === auth.id ? (
                            <div className="mt-3 w-100">
                                <button
                                    className={`btn fw-bold w-100 ${style.update_profile_btn}`}
                                    onClick={handleShowHideUpdateModal}
                                >
                                    Chỉnh sửa trang cá nhân
                                </button>
                            </div>
                        ) : (
                            <div className="mt-3 w-100 d-flex gap-2">
                                {user.isFollowing ? (
                                    <button
                                        className={`btn fw-bold w-100 ${style.update_profile_btn}`}
                                        // onClick={handleShowHideUpdateModal}
                                    >
                                        Đang theo dõi
                                    </button>
                                ) : (
                                    <button
                                        className={`btn fw-bold w-100 ${style.follow_btn}`}
                                        // onClick={handleShowHideUpdateModal}
                                    >
                                        Theo dõi
                                    </button>
                                )}

                                {!user.privateMode || user.isFollowing ? (
                                    <button
                                        className={`btn fw-bold w-100 ${style.update_profile_btn}`}
                                        onClick={() => {
                                            dispatch(
                                                setModal(
                                                    true,
                                                    user.username,
                                                    user.id
                                                )
                                            );
                                        }}
                                    >
                                        Nhắc đến
                                    </button>
                                ) : null}
                            </div>
                        )}
                    </div>
                    {!user.isFollowing && user.privateMode ? null : (
                        <div className="w-100">
                            <ProfileBar
                                username={user.username}
                                isUser={user.id === auth.id}
                            />
                        </div>
                    )}
                </div>
            </div>
            {showUpdateModal ? (
                <UpdateProfileModal
                    show={showUpdateModal}
                    handleHide={handleShowHideUpdateModal}
                    user={user}
                />
            ) : null}
            {showListLinkModal ? (
                <ListLinkModal
                    data={user.listLinks}
                    show={showListLinkModal}
                    handleHide={() => {
                        setShowListLinkModal(false);
                    }}
                />
            ) : null}
        </DefaultLayout>
    );
};
export default Profile;
