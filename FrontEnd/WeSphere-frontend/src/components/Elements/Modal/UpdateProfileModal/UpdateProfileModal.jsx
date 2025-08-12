import React, { useState, useEffect } from "react";
import { $api } from "../../../../services/service";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../../redux/authSlide";
import LinkCard from "./LinkCard/LinkCard";
import style from "./UpdateProfileModal.module.css";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import { Form } from "react-router-dom";
import { _AUTH } from "../../../../constants/_auth";

const UpdateProfileModal = (props) => {
    const dispatch = useDispatch();
    const { show, handleHide, user } = props;

    // Biến trạng thái show/hide modal
    const [showAddLink, setShowAddLink] = useState(false);
    const [showAddLinkFromMain, setShowAddLinkFromMain] = useState(false);
    const [showEditLink, setShowEditLink] = useState(false);
    const [showBio, setShowBio] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    // Biến trạng thái để lưu thông tin người dùng
    const [bio, setBio] = useState(user.bio || "Tiểu sử");
    const [phone, setPhone] = useState(user.phone || "");
    const [gender, setGender] = useState(user.gender || "Chọn giới tính");
    const [privateMode, setPrivateMode] = useState(
        user.privateMode == 1 || false
    );
    const [listLinks, setlistLinks] = useState(user.listLinks || []);
    const [fileAvatar, setFileAvatar] = useState(null);

    // Biến tạm lưu thông tin tạm thời cho các thao tác cập nhật của người dùng
    const [tempBio, setTempBio] = useState(user.bio || "Tiểu sử");
    const [editlink, setEditLink] = useState({
        // link_id: "",
        title: "",
        url: "",
    });
    const [isEditLink, setIsEditLink] = useState(false);
    const [linkIndex, setLinkIndex] = useState(null);
    const avatar = user.avatar;
    const [urlError, setUrlError] = useState(false);

    const handleShowBio = (e) => {
        e.stopPropagation();
        const el = document.querySelector(
            `.${style.modal_dialog_custom}.${style.show_modal}`
        );
        if (el.classList.contains(style.show_main_slide)) {
            el.classList.remove(style.show_main_slide);
        }
        el.classList.add(style.hide_main_slide);
        setShowBio(true);
        setShowAddLink(false);
        setShowEditLink(false);
    };

    const handleShowMain = () => {
        const el = document.querySelector(
            `.${style.modal_dialog_custom}.${style.show_modal}`
        );
        if (el.classList.contains(style.hide_main_slide)) {
            el.classList.remove(style.hide_main_slide);
        }
        el.classList.add(style.show_main_slide);
        setShowBio(false);
        setShowAddLink(false);
        setShowEditLink(false);
    };

    const handleShowAddLink = () => {
        const el = document.querySelector(
            `.${style.modal_dialog_custom}.${style.show_modal}`
        );
        if (el.classList.contains(style.show_main_slide)) {
            el.classList.remove(style.show_main_slide);
        }
        el.classList.add(style.hide_main_slide);
        setShowAddLink(true);
        setShowBio(false);
        setShowEditLink(false);
    };

    const handleShowAddLinkFromMain = (payload) => {
        setShowAddLinkFromMain(payload);
    };

    const handleShowEditLink = () => {
        const el = document.querySelector(
            `.${style.modal_dialog_custom}.${style.show_modal}`
        );
        if (el.classList.contains(style.show_main_slide)) {
            el.classList.remove(style.show_main_slide);
        }
        el.classList.add(style.hide_main_slide);
        setShowEditLink(true);
        setShowBio(false);
        setShowAddLink(false);
    };

    const handleShowConfirm = (e) => {
        e.stopPropagation();
        setShowConfirm(true);
    };

    const updateHeightOverlay2 = (newHeight) => {
        const el = document.querySelector(
            `.${style.update_profile_modal_layer_2}`
        );
        if (el) {
            el.style.height = `${newHeight}px`;
        }
    };

    useEffect(() => {
        const el = document.querySelector(`.${style.show_children_slide}`);
        if (el) {
            updateHeightOverlay2(el.offsetHeight);
        } else {
            const el2 = document.querySelector(`.${style.show_main_slide}`);
            if (el2) {
                updateHeightOverlay2(el2.offsetHeight);
            }
        }
    }, [showAddLink, showEditLink, showBio]);

    useEffect(() => {
        const listMainOut = document.querySelectorAll(
            `.${style.hide_main_slide}`
        );
        listMainOut.forEach((el) => {
            el.classList.remove(style.hide_main_slide);
        });

        const listChildrenOut = document.querySelectorAll(
            `.${style.hide_children_slide}`
        );
        listChildrenOut.forEach((el) => {
            el.classList.remove(style.hide_children_slide);
        });
    }, []);

    // Handle data

    const updateBio = () => {
        setBio(tempBio);
        handleShowMain();
    };

    const updatePhone = (e) => {
        setPhone(e.target.value);
    };

    const updateGender = (data) => {
        setGender(data);
    };

    // const updatePrivateMode = (e) => {
    //     setPrivateMode(e.target.checked);
    // };

    const update = async (e) => {
        e.stopPropagation();
        try {
            setLoading(true);
            const payload = new FormData();
            payload.append("bio", tempBio);
            payload.append("phone", phone);
            payload.append("gender", gender);
            payload.append("privateMode", privateMode);
            payload.append("listLinks", JSON.stringify(listLinks));
            payload.append("publicId", user.publicId);
            if (fileAvatar) {
                payload.append("file", fileAvatar);
            }

            // console.log(Object.fromEntries(payload.entries()));

            const res = await $api.auth.updateUser(payload);
            if (!res.isError) {
                // setListLinks(res.result.listLinks);
                dispatch(
                    setAlert({
                        message: res.message,
                    })
                );
                setLoading(false);
                handleHide();
            }
        } catch (error) {
            console.log("error: ", error);
            setLoading(false);
            dispatch(
                setAlert({
                    message: error.errors?.exceptionMessage || error?.message,
                })
            );
        }
    };

    const ShowUpdateLinkEdit = (linkObject, idx) => {
        setEditLink({ ...linkObject });
        setIsEditLink(true);
        setLinkIndex(idx);
        handleShowEditLink();
        handleShowAddLinkFromMain(false);
    };

    const updateListLinks = () => {
        setlistLinks((prev) => {
            if (isEditLink) {
                const tempList = [...prev];
                tempList[linkIndex] = { ...editlink };
                setEditLink({ title: "", url: "" });
                setIsEditLink(false);
                setLinkIndex(null);
                return tempList;
            } else {
                return [...prev, editlink];
            }
        });
    };

    const removeLink = () => {
        setlistLinks((prev) => {
            return prev.filter((_, index) => index !== linkIndex);
        });

        setLinkIndex(null);
        setEditLink({});
        setShowConfirm(false);
        handleShowAddLink();
        handleShowAddLinkFromMain(false);
    };

    return (
        <>
            <div
                className={`${style.update_profile_modal_background}  ${
                    show ? style.show_modal : style.hide_modal
                }`}
            >
                <div className={style.update_profile_modal_container}>
                    <div
                        className={`${style.update_profile_modal_layer_1} ${style.show_modal}`}
                    >
                        <div
                            className={`w-100 rounded-4 overflow-hidden ${style.update_profile_modal_layer_2}`}
                        >
                            <div
                                className={`rounded-4 ${
                                    style.modal_dialog_custom
                                } ${show ? style.show_modal : null}`}
                            >
                                <div className={style.modal_body_custom}>
                                    <div className="row">
                                        <div
                                            className={`col-10 ${style.profile_section}`}
                                        >
                                            <div
                                                className={`${style.profile_label}`}
                                            >
                                                Tên
                                            </div>
                                            <div className="text-secondary">
                                                <i className="bi bi-lock me-1"></i>
                                                <span>
                                                    {user.fullname} (
                                                    {user.username})
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="dropdown">
                                                <button
                                                    className={`btn p-0 rounded-circle d-flex justify-content-center align-items-center overflow-hidden ${style.avatar_container}`}
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    {!fileAvatar ? (
                                                        avatar ? (
                                                            <img
                                                                src={avatar}
                                                                alt="Avatar"
                                                                className="w-100 h-100 object-fit-cover"
                                                            />
                                                        ) : (
                                                            <i className="bi bi-person-add fs-1"></i>
                                                        )
                                                    ) : (
                                                        <img
                                                            src={URL.createObjectURL(
                                                                fileAvatar
                                                            )}
                                                            alt="Avatar"
                                                            className="w-100 h-100 object-fit-cover"
                                                        />
                                                    )}
                                                </button>
                                                <ul
                                                    className={`dropdown-menu ${style.avatar_dropdown_menu_custom}`}
                                                >
                                                    <li>
                                                        <label
                                                            className={`dropdown-item fw-bold ${style.dropdown_item_custom}`}
                                                            htmlFor="file-upload"
                                                        >
                                                            Tải ảnh lên
                                                        </label>
                                                        <input
                                                            id="file-upload"
                                                            className={
                                                                style.input_file
                                                            }
                                                            accept="image/*"
                                                            type="file"
                                                            onChange={(e) => {
                                                                setFileAvatar(
                                                                    e.target
                                                                        .files[0]
                                                                );
                                                            }}
                                                        />
                                                    </li>
                                                    <li
                                                        className={`${style.dropdown_item_custom}`}
                                                        onClick={() => {
                                                            setFileAvatar(null);
                                                        }}
                                                    >
                                                        <p
                                                            className={`dropdown-item text-danger fw-bold ${style.dropdown_item_custom}`}
                                                        >
                                                            Gỡ ảnh
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${style.profile_section}`}>
                                        <div
                                            className={`${style.profile_label}`}
                                        >
                                            Email
                                        </div>
                                        <div className="text-secondary">
                                            <i className="bi bi-lock me-1"></i>
                                            <span>{user.email}</span>
                                        </div>
                                    </div>

                                    <div className={`${style.profile_section}`}>
                                        <div
                                            className={`${style.profile_label}`}
                                        >
                                            Số điện thoại
                                        </div>
                                        <input
                                            type="text"
                                            className={`form-control ${style.form_control_custom} ${style.profile_input}`}
                                            defaultValue={phone}
                                            placeholder="Nhập số điện thoại"
                                            onChange={updatePhone}
                                        />
                                    </div>

                                    <div className={`${style.profile_section}`}>
                                        <div
                                            className={`${style.profile_label}`}
                                        >
                                            Giới tính
                                        </div>
                                        {/* <select
                                            name="gender"
                                            className={`form-control ${style.form_control_custom} ${style.profile_input}`}
                                            defaultValue={gender}
                                            onChange={updateGender}
                                        >
                                            <option>Chọn giới tính</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </select> */}
                                        <div className="dropdown">
                                            <button
                                                className={`btn ${style.dropdown_button_custom}`}
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                {gender}
                                            </button>
                                            <ul
                                                className={`dropdown-menu ${style.dropdown_menu_custom}`}
                                            >
                                                <li
                                                    onClick={() =>
                                                        updateGender("Nam")
                                                    }
                                                >
                                                    Nam
                                                </li>
                                                <li>
                                                    <hr className="dropdown-divider" />
                                                </li>
                                                <li
                                                    onClick={() =>
                                                        updateGender("Nữ")
                                                    }
                                                >
                                                    Nữ
                                                </li>
                                                <li>
                                                    <hr className="dropdown-divider" />
                                                </li>
                                                <li
                                                    onClick={() =>
                                                        updateGender("Khác")
                                                    }
                                                >
                                                    Khác
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className={`${style.profile_section}`}>
                                        <div
                                            className={`${style.profile_label}`}
                                        >
                                            Tiểu sử
                                        </div>
                                        <button
                                            className={`text-start form-control ${style.form_control_custom} ${style.profile_input}`}
                                            data-bs-target="#carouselExample"
                                            data-bs-slide="next"
                                            onClick={handleShowBio}
                                        >
                                            {bio}
                                        </button>
                                    </div>

                                    <div className={`${style.profile_section}`}>
                                        <div
                                            className={`d-flex justify-content-between align-items-center`}
                                        >
                                            <button
                                                className={`text-start form-control ${style.form_control_custom} ${style.profile_input}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleShowAddLink();
                                                    handleShowAddLinkFromMain(
                                                        true
                                                    );
                                                }}
                                            >
                                                <div
                                                    className={`${style.profile_label}`}
                                                >
                                                    Liên kết
                                                </div>
                                            </button>
                                            <div className="d-flex text-secondary">
                                                {listLinks.length != 0
                                                    ? listLinks.length
                                                    : null}
                                                <i className="bi bi-chevron-right ms-2"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${style.profile_section}`}>
                                        <div
                                            className={`d-flex justify-content-between align-items-center`}
                                        >
                                            <div>
                                                <div
                                                    className={`${style.profile_label}`}
                                                >
                                                    Trang cá nhân riêng tư
                                                </div>
                                                <div
                                                    className={`${style.profile_description}`}
                                                >
                                                    Nếu chuyển sang chế độ riêng
                                                    tư, bạn sẽ không thể trả lời
                                                    người khác trừ khi họ theo
                                                    dõi bạn.
                                                </div>
                                            </div>

                                            <div className="form-check form-switch">
                                                <input
                                                    className={`form-check-input focus-ring ${style.form_check_input_custom}`}
                                                    type="checkbox"
                                                    role="switch"
                                                    id="switchCheckDefault"
                                                    checked={privateMode}
                                                    onChange={(e) => {
                                                        setPrivateMode(
                                                            e.target.checked
                                                        );
                                                    }}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="switchCheckDefault"
                                                ></label>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className={`btn ${style.btn_done}`}
                                        onClick={update}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <div className="h-100 d-flex justify-content-center align-items-center">
                                                <div
                                                    className="spinner-border text-light"
                                                    role="status"
                                                >
                                                    <span className="visually-hidden">
                                                        Loading...
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            "Xong"
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div
                                className={`rounded-4 ${
                                    style.modal_dialog_custom
                                } ${style.hide_modal} ${
                                    showBio
                                        ? style.show_children_slide
                                        : style.hide_children_slide
                                }`}
                            >
                                <div className={`${style.modal_header_custom}`}>
                                    <button
                                        className={`btn ${style.btn}`}
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleShowMain();
                                            setTempBio(bio);
                                        }}
                                    >
                                        <i className="bi bi-arrow-return-left"></i>
                                    </button>

                                    <h6 className="text-center">
                                        <b>Chỉnh sửa tiểu sử</b>
                                    </h6>
                                    <div
                                        className={`${style.btn_custom} ${style.btn}`}
                                        style={{ width: "40px" }}
                                        onClick={updateBio}
                                    >
                                        Xong
                                    </div>
                                </div>
                                <div className={style.modal_body_custom}>
                                    <div className={style.profile_section}>
                                        <label
                                            className={style.profile_label}
                                        ></label>
                                        <textarea
                                            rows={5}
                                            className={`${style.form_control_custom} ${style.profile_input}`}
                                            value={tempBio}
                                            onChange={(e) =>
                                                setTempBio(e.target.value)
                                            }
                                        ></textarea>
                                    </div>
                                    <div className="d-flex justify-content-center w-100 mt-2">
                                        <small className="fw-light text-secondary">
                                            Tiểu sử của bạn được hiển thị công
                                            khai
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`rounded-4 ${
                                    style.modal_dialog_custom
                                } ${style.hide_modal} ${
                                    showAddLink
                                        ? showAddLinkFromMain
                                            ? style.show_children_slide
                                            : style.show_main_slide
                                        : showAddLinkFromMain
                                        ? style.hide_children_slide
                                        : style.hide_main_slide
                                }
                            `}
                            >
                                <div className={`${style.modal_header_custom}`}>
                                    <button
                                        className="btn"
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleShowMain();
                                            handleShowAddLinkFromMain(true);
                                        }}
                                    >
                                        <i className="bi bi-arrow-return-left"></i>
                                    </button>

                                    <h6 className="text-center">
                                        <b>Liên kết</b>
                                    </h6>
                                    <div style={{ width: "40px" }}></div>
                                </div>
                                <div
                                    className={`${style.modal_body_custom} ${style.modal_body_custom_2} pt-4`}
                                >
                                    <div
                                        className={`rounded-4 py-2 px-3 w-100 ${style.list_link_container}`}
                                    >
                                        <div
                                            className={style.list_link_wrapper}
                                        >
                                            {listLinks.length > 0 ? (
                                                listLinks.map(
                                                    (linkObject, index) => {
                                                        return (
                                                            <LinkCard
                                                                key={
                                                                    linkObject.url
                                                                }
                                                                idx={index}
                                                                linkObject={
                                                                    linkObject
                                                                }
                                                                onClick={
                                                                    ShowUpdateLinkEdit
                                                                }
                                                            />
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <div className="text-center py-4">
                                                    Chưa có liên kết nào
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div
                                        className={`w-100 mt-5 py-1 rounded-4 ${style.btn_add_link}`}
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleShowEditLink();
                                            handleShowAddLinkFromMain(false);
                                            setEditLink({ url: "", title: "" });
                                            setIsEditLink(false);
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>Thêm liên kết</span>
                                            <i className="bi bi-link-45deg fs-3 fw-bold"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`rounded-4 ${
                                    style.modal_dialog_custom
                                } ${style.hide_modal} ${
                                    showEditLink
                                        ? style.show_children_slide
                                        : style.hide_children_slide
                                }`}
                            >
                                <div
                                    className={`${style.modal_header_custom} mb-0 pb-0`}
                                >
                                    <button
                                        className="btn"
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setLinkIndex(null);
                                            setEditLink({ title: "", url: "" });
                                            handleShowAddLink();
                                            handleShowAddLinkFromMain(false);
                                        }}
                                    >
                                        <i className="bi bi-arrow-return-left"></i>
                                    </button>

                                    <h6 className="text-center">
                                        <b>
                                            {isEditLink
                                                ? "Chỉnh sửa liên kết"
                                                : "Thêm liên kết"}
                                        </b>
                                    </h6>
                                    <div
                                        className={`${style.btn_custom}`}
                                        style={{ width: "40px" }}
                                        onClick={(e) => {
                                            if (urlError || editlink.url == "")
                                                return;
                                            e.stopPropagation();
                                            updateListLinks();
                                            handleShowAddLink();
                                            handleShowAddLinkFromMain(false);
                                        }}
                                    >
                                        Xong
                                    </div>
                                </div>
                                <div
                                    className={`${style.add_link_body_container}`}
                                >
                                    <div
                                        className={`${style.modal_body_custom} ${style.modal_body_custom_2} ${style.add_link_modal_body} `}
                                    >
                                        <div
                                            className={`${style.add_link_form_container} box_shadow`}
                                        >
                                            <input
                                                type="text"
                                                className={`${
                                                    style.form_control_custom
                                                }  ${
                                                    urlError
                                                        ? style.error
                                                        : null
                                                }`}
                                                placeholder="URL"
                                                onChange={(e) => {
                                                    setEditLink({
                                                        ...editlink,
                                                        url: e.target.value,
                                                    });
                                                    const value =
                                                        e.target.value;
                                                    if (
                                                        value &&
                                                        !value.startsWith(
                                                            "http"
                                                        )
                                                    ) {
                                                        setUrlError(true);
                                                    } else {
                                                        setUrlError(false);
                                                    }
                                                }}
                                                value={editlink.url}
                                            />
                                            {urlError && (
                                                <div className={style.error}>
                                                    URL không hợp lệ
                                                </div>
                                            )}
                                            <input
                                                type="text"
                                                className={`${style.form_control_custom}`}
                                                placeholder="Tiêu đề"
                                                onChange={(e) => {
                                                    setEditLink({
                                                        ...editlink,
                                                        title: e.target.value,
                                                    });
                                                }}
                                                value={editlink.title}
                                            />
                                        </div>
                                        {isEditLink ? (
                                            <div
                                                className={` w-100 mt-4 py-1 rounded-4 ${style.btn_add_link}`}
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleShowAddLink();
                                                    handleShowAddLinkFromMain(
                                                        false
                                                    );
                                                    setEditLink({});
                                                    setIsEditLink(false);
                                                }}
                                            >
                                                <div
                                                    className="d-flex justify-content-center align-items-center h-100"
                                                    onClick={handleShowConfirm}
                                                >
                                                    <span className="fw-bold text-danger">
                                                        Gỡ liên kết
                                                    </span>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showConfirm ? (
                <DeleteConfirmModal
                    show={showConfirm}
                    title="Gỡ liên kết?"
                    onCancel={() => {
                        setShowConfirm(false);
                    }}
                    onConfirm={removeLink}
                />
            ) : null}
        </>
    );
};
export default UpdateProfileModal;
