import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Environment } from "../../../../environments/environment";
import { setModal } from "../../../../redux/createSLide";
import { setAlert, setLoading } from "../../../../redux/authSlide";
import { $api } from "../../../../services/service";
import PreviewContainer from "../../PreviewContainer/PreviewContainer";
import FeedSave from "../../FeedSave/FeedSave";
import ModalConfirm from "./ModalConfirm/ModalConfirm";
import EmojiPicker from "emoji-picker-react";
import Giphy from "react-awesome-giphy";
import style from "./CreateModal.module.css";
import Editor from "../../TextEditor/Editor";

const CreateModal = () => {
    const dispatch = useDispatch();
    const [listSaves, setListSaves] = useState([]);
    const [content, setContent] = useState(null);
    const [listImage, setListImage] = useState([]);
    const [tag, setTag] = useState("");
    const [privacy, setPrivacy] = useState("Công khai");

    const [showEmoji, setShowEmoji] = useState(false);
    const [showGif, setShowGif] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showListSavesModal, setShowListSavesModal] = useState(2);
    const show = useSelector((state) => state.create.show);
    const user = useSelector((state) => state.auth.user);
    const [emoji, setEmoji] = useState(null);
    const [editorKey, setEditorKey] = useState(0);

    const updateBefore = () => {
        const textarea = document.querySelector(`.${style.textarea_container}`);
        const beforeContent = document.querySelector(
            `.${style.before_content}`
        );
        beforeContent.style.height = textarea.offsetHeight + 15 + "px";
    };

    const showImagePicker = async (e) => {
        e.stopPropagation();
        try {
            const image = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Photos,
                quality: 100,
            });
            const filename = listImage.length + 1 + ".jpg";
            const response = await fetch(image.webPath);
            const blob = await response.blob();
            const file = new File([blob], filename, { type: blob.type });
            setListImage((prev) => [...prev, file]);
        } catch (error) {
            if (error.message === "User cancelled photos app") return;
            dispatch(
                setAlert({
                    message: error.errors.exceptionMessage || error.message,
                })
            );
        }
    };

    const showEmojiPicker = (e) => {
        e.stopPropagation();
        if (showGif) {
            setShowGif(false);
        }
        setShowEmoji(!showEmoji);
    };

    const showGifPicker = (e) => {
        e.stopPropagation();
        if (showEmoji) {
            setShowEmoji(false);
        }
        setShowGif(!showGif);
    };

    const showHideModalConfirm = (e) => {
        if (e) {
            e.stopPropagation();
        }
        if (validate()) {
            setShowModalConfirm(!showModalConfirm);
        } else {
            handleClose();
        }
    };

    const showListSaves = () => {
        const main = document.getElementById("main-slide");
        if (main.classList.contains(style.show_main_slide)) {
            main.classList.remove(style.show_main_slide);
        }
        main.classList.add(style.hide_main_slide);
        setShowListSavesModal(true);
    };

    const showMainModal = (e) => {
        if (e) {
            e.stopPropagation();
        }
        const main = document.getElementById("main-slide");
        if (main.classList.contains(style.hide_main_slide)) {
            main.classList.remove(style.hide_main_slide);
        }
        main.classList.add(style.show_main_slide);
        setShowListSavesModal(false);
    };

    const closePicker = (event) => {
        event.stopPropagation();
        const element = event.target;
        const emojiPickerPopup = document.querySelector(
            `.${style.emoji_picker_popup}`
        );
        const gifPickerPopup = document.querySelector(
            `.${style.gif_picker_popup}`
        );
        if (
            !element.classList.contains("bi-emoji-smile") &&
            !element.classList.contains("bi-filetype-gif") &&
            !element.classList.contains("btn-icon-emoji") &&
            !element.classList.contains("btn-icon-gif") &&
            !emojiPickerPopup.contains(element) &&
            !gifPickerPopup.contains(element)
        ) {
            setShowEmoji(false);
            setShowGif(false);
        }
    };

    const closeModal = (event) => {
        const element1 = event.target;
        const handler = (e) => {
            const element2 = e.target;
            if (
                element2.classList.contains(style.modal_container) ||
                element2.classList.contains(style.modal_background)
            ) {
                if (element1 === element2) {
                    showHideModalConfirm();
                }
            }
        };
        const temp = document.querySelector(`.${style.modal_background}`);

        temp.addEventListener("click", handler, { once: true });
    };

    const handleClose = () => {
        dispatch(setModal(false));
    };

    const handleEmojiClick = (emoji) => {
        setEmoji(emoji.emoji);
    };

    const handleGifClick = async (gif) => {
        try {
            const filename = listImage.length + 1 + ".gif";
            const gifUrl = gif.images.original.url;
            const response = await fetch(gifUrl);
            const blob = await response.blob();
            const file = new File([blob], filename, { type: blob.type });
            setListImage((prev) => [...prev, file]);
        } catch (error) {
            console.log("Error fetching GIF:", error);
        }
    };

    const handleRemoveImage = (index) => {
        setListImage((prev) => prev.filter((item, idx) => idx !== index));
    };

    const handleSave = () => {
        console.log("Save clicked");
    };

    const handleChoseFeedSave = (data) => {
        setContent(data.feed.content);
        setTag(data.feed.tag);
        setListImage(data.feed.listImages);
        showMainModal();
        setEditorKey((prev) => prev + 1);
    };

    const validate = () => {
        if (!content) return false;
        if (
            content.root.children.length === 0 ||
            content.root.children[0]?.children.length === 0
        ) {
            if (listImage.length === 0 && !tag) {
                return false;
            }
        }
        return true;
    };

    const submit = async (save) => {
        try {
            if (!validate()) {
                return;
            }
            dispatch(setLoading(true));
            const formData = new FormData();
            formData.append("content", content);
            formData.append("tag", tag);
            listImage.forEach((file) => {
                formData.append("file[]", file);
            });
            formData.append("privacy", privacy);
            formData.append("save", save);
            formData.forEach((value, key) => {
                console.log(key, value);
            });
            const res = await $api.post.create(formData);
            if (!res.isError) {
                dispatch(setLoading(false));
                dispatch(setAlert({ message: res.message }));
                handleClose();
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setAlert({ message: error.message }));
        }
    };

    const getListSaves = async () => {
        try {
            dispatch(setLoading(true));
            const res = await $api.post.getListSaves(user.id);
            if (!res.isError && res.data != null) {
                setListSaves(res.data);
                dispatch(setLoading(false));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setAlert({ message: error.errors.exceptionMessage }));
        }
    };

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

    useEffect(() => {
        const textareaContainer = document.querySelector(
            `.${style.textarea_container}`
        );
        if (!textareaContainer) return;

        const resizeObserver = new ResizeObserver(() => {
            updateBefore();
        });

        resizeObserver.observe(textareaContainer);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        updateBefore();
    }, [content, listImage]);

    return (
        <div onMouseDown={closeModal}>
            <div
                className={`${style.modal_background} ${
                    show ? style.show_modal : style.hide_modal
                }`}
            >
                <div className={style.modal_container}>
                    <div
                        className={`${style.modal_dialog_custom} rounded-4`}
                        id="main-slide"
                    >
                        <div
                            className={`${style.modal_content} shadow-sm rounded-4`}
                        >
                            <div className={`${style.modal_header}`}>
                                <button
                                    className="btn"
                                    onClick={showHideModalConfirm}
                                >
                                    Hủy
                                </button>
                                <h6>
                                    <b>Bài đăng mới</b>
                                </h6>
                                <button
                                    className="btn"
                                    type="button"
                                    style={{ fontSize: "20px" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        getListSaves();
                                        showListSaves();
                                    }}
                                >
                                    <i className="bi bi-filter-circle"></i>
                                </button>
                            </div>
                            <div
                                className={`${style.modal_body} ps-3 pe-3 pt-3`}
                                onClick={closePicker}
                            >
                                <div className="d-flex">
                                    <div className="me-2 d-flex flex-column align-items-center">
                                        <div
                                            className={`rounded-circle bg-secondary ${style.avatar}`}
                                        >
                                            <img
                                                className="object-fit-cover w-100 h-100"
                                                src={user.avatar}
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            className={`${style.before_content} mt-1`}
                                        ></div>
                                    </div>
                                    <div
                                        className="flex-grow-1 w-100 position-relative"
                                        style={{
                                            maxWidth: "540px",
                                            maxHeight: "436px",
                                        }}
                                    >
                                        <div className="ms-2">
                                            <strong>{user.username}</strong>
                                            <span className="fs-5 mx-2">›</span>
                                            <input
                                                type="text"
                                                className={`${style.form_control_custom} d-inline-block`}
                                                style={{
                                                    width: "auto",
                                                }}
                                                placeholder="Thêm chủ đề"
                                                value={tag}
                                                onChange={(e) =>
                                                    setTag(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div
                                            className="position-relative"
                                            style={{
                                                overflowY: "auto",
                                                scrollbarWidth: "none",
                                            }}
                                        >
                                            <div
                                                className={
                                                    style.textarea_container
                                                }
                                            >
                                                <Editor
                                                    key={editorKey}
                                                    emoji={emoji}
                                                    json={content}
                                                    editable={true}
                                                    onExport={(json) => {
                                                        setContent(json);
                                                    }}
                                                />
                                                <PreviewContainer
                                                    preview={true}
                                                    listImage={listImage}
                                                    onRemove={handleRemoveImage}
                                                    zoom={true}
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className={`icon ${style.icon_container}`}
                                        >
                                            <button
                                                className="btn"
                                                onClick={showImagePicker}
                                            >
                                                <i className="bi bi-images"></i>
                                            </button>
                                            <button
                                                className="btn btn-icon-emoji"
                                                onClick={showEmojiPicker}
                                            >
                                                <i className="bi bi-emoji-smile"></i>
                                            </button>
                                            <div
                                                className={
                                                    style.emoji_picker_popup
                                                }
                                            >
                                                {showEmoji && (
                                                    <EmojiPicker
                                                        width={300}
                                                        height={370}
                                                        backgroundColor="rgb(251, 236, 215)"
                                                        onEmojiClick={
                                                            handleEmojiClick
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <button
                                                className="btn btn-icon-gif"
                                                onClick={showGifPicker}
                                            >
                                                <i className="bi bi-filetype-gif"></i>
                                            </button>
                                            <div
                                                className={
                                                    style.gif_picker_popup
                                                }
                                            >
                                                {showGif && (
                                                    <Giphy
                                                        apiKey={
                                                            Environment.GIPHY_API_KEY
                                                        }
                                                        callback={
                                                            handleGifClick
                                                        }
                                                        css={`
                                                            background-color: white;
                                                            padding-top: 12px;
                                                            border-radius: 10px;
                                                            border: 1px solid
                                                                #ccc;
                                                            overflow: hidden;
                                                            width: 425px;
                                                            height: 370px;

                                                            button {
                                                                display: none;
                                                            }

                                                            input {
                                                                width: 90%;
                                                                font-size: 18px;
                                                                background-color: #f6f6f6;
                                                            }
                                                            input:focus {
                                                                outline: 1px
                                                                    solid
                                                                    #007bff;
                                                            }
                                                        `}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${style.modal_footer_custom} p-3`}>
                                <div className="text-muted mt-3 small">
                                    <select
                                        className={`form-select ${style.form_select}`}
                                        aria-label="Size 3 select example"
                                        value={privacy}
                                        onChange={(e) =>
                                            setPrivacy(e.target.value)
                                        }
                                    >
                                        <option value="Công khai">
                                            Công khai
                                        </option>
                                        <option value="Bạn bè">Bạn bè</option>
                                        <option value="Chỉ mình tôi">
                                            Chỉ mình tôi
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className={`btn btn-light ms-2 ${style.submit_btn}`}
                                        disabled={!validate()}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            submit(false);
                                        }}
                                    >
                                        Đăng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${style.modal_dialog_custom} ${
                            style.hide_modal
                        } ${
                            showListSavesModal === 2
                                ? null
                                : showListSavesModal
                                ? style.show_children_slide
                                : style.hide_children_slide
                        } rounded-4`}
                    >
                        <div
                            className={`${style.modal_content} ${style.modal_content_saves} shadow-sm rounded-4`}
                        >
                            <div className={`${style.modal_header}`}>
                                <button
                                    className="btn"
                                    type="button"
                                    onClick={showMainModal}
                                >
                                    <i className="bi bi-arrow-return-left"></i>
                                </button>

                                <h6 className="text-center">
                                    <b>Bản nháp</b>
                                </h6>
                                <div style={{ width: "40px" }}></div>
                            </div>
                            <div
                                className="modal-body"
                                style={{
                                    height: "540px",
                                    width: "100%",
                                }}
                            >
                                {listSaves.map((item, idx) => {
                                    return (
                                        <div
                                            className={style.feed_save_item}
                                            key={item.feed.id}
                                        >
                                            <FeedSave
                                                data={item}
                                                key={item.feed.id}
                                                idx={idx}
                                                handleChose={
                                                    handleChoseFeedSave
                                                }
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModalConfirm ? (
                <ModalConfirm
                    show={showModalConfirm}
                    onSave={handleSave}
                    closeConfirmModal={showHideModalConfirm}
                />
            ) : null}
        </div>
    );
};

export default CreateModal;
