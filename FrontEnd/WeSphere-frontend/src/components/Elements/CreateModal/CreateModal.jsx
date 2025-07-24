import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Environment } from "../../../environments/environment";
import { setModal } from "../../../redux/createSLide";
import { setAlert, setLoading } from "../../../redux/authSlide";
import { $api } from "../../../services/service";
import PreviewContainer from "../PreviewContainer/PreviewContainer";
import FeedSave from "../FeedSave/FeedSave";
import ModalConfirm from "./ModalConfirm/ModalConfirm";
import EmojiPicker from "emoji-picker-react";
import Giphy from "react-awesome-giphy";
import "dragscroll";
import "./CreateModal.css";

const CreateModal = () => {
    const dispatch = useDispatch();
    const [listSaves, setListSaves] = useState([]);
    const [content, setContent] = useState("");
    const [listImage, setListImage] = useState([]);
    const [tag, setTag] = useState("");
    const [privacy, setPrivacy] = useState("Công khai");

    const [showEmoji, setShowEmoji] = useState(false);
    const [showGif, setShowGif] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const show = useSelector((state) => state.create.show);
    const user = useSelector((state) => state.auth.user);

    const handleInput = (e) => {
        if (e) {
            updateBefore();
            setContent(e.target.value);
        }
    };

    const updateBefore = () => {
        const textarea = document.querySelector(
            ".form-control-textarea-custom"
        );
        textarea.style.height = "auto";
        textarea.style.height = Math.min(textarea.scrollHeight, 370) + "px";
        const textareaContainer = document.querySelector(".textarea-container");
        const textareaContainerHeight = textareaContainer.offsetHeight;
        const beforeContent = document.querySelector(".before-content");
        beforeContent.style.height = textareaContainerHeight + 15 + "px";
    };

    const handleEmojiClick = (emoji) => {
        setContent((prev) => prev + emoji.emoji);
        handleInput();
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

    const showImagePicker = async () => {
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
            console.log("error: ", error);
            dispatch(setAlert({ message: error.errors.exceptionMessage }));
        }
    };

    const handleRemoveImage = (index) => {
        setListImage((prev) => prev.filter((item, idx) => idx !== index));
    };

    const showEmojiPicker = () => {
        if (showGif) {
            setShowGif(false);
        }
        setShowEmoji(!showEmoji);
    };

    const showGifPicker = () => {
        if (showEmoji) {
            setShowEmoji(false);
        }
        setShowGif(!showGif);
    };

    const closePicker = (event) => {
        const element = event.target;
        const emojiPickerPopup = document.querySelector(".emoji-picker-popup");
        const gifPickerPopup = document.querySelector(".gif-picker-popup");
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
                element2.classList.contains("modal-dialog-custom") ||
                element2.classList.contains("modal-background")
            ) {
                if (element1 === element2) {
                    showHideModalConfirm();
                }
            }
        };
        const temp = document.querySelector(".modal-background");

        temp.addEventListener("click", handler, { once: true });
    };

    const showHideModalConfirm = () => {
        if (validate()) {
            setShowModalConfirm(!showModalConfirm);
        } else {
            handleClose();
        }
    };

    const handleSave = () => {
        console.log("Save clicked");
    };

    const handleClose = () => {
        dispatch(setModal(false));
    };

    const validate = () => {
        if (!content.trim() && listImage.length === 0) {
            return false;
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

    useEffect(() => {
        const modal = document.querySelector(".modal-background");
        if (modal) {
            if (show) {
                modal.classList.add("show-modal");
                modal.classList.remove("hide-modal");
            } else {
                modal.classList.remove("show-modal");
                modal.classList.add("hide-modal");
            }
        }
    }, [show]);

    useEffect(() => {
        const textareaContainer = document.querySelector(".textarea-container");
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

    const handleChoseFeedSave = (data) => {
        // console.log(data);
        setContent(data.feed.content);
        setTag(data.feed.tag);
        setListImage(data.feed.listImages);
        document
            .querySelector(
                'button[data-bs-target="#carouselExampleFade"][data-bs-slide="prev"]'
            )
            .click();
    };

    return (
        <div onMouseDown={closeModal}>
            <div
                className={
                    "modal-background " + (show ? "show-modal" : "hide-modal")
                }
            >
                <div className="modal-dialog-custom">
                    <div
                        id="carouselExampleFade"
                        className="carousel slide carousel-fade"
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="modal-content shadow-sm rounded-4">
                                    <div className="modal-header">
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
                                            data-bs-target="#carouselExampleFade"
                                            data-bs-slide="next"
                                            style={{ fontSize: "20px" }}
                                            onClick={() => {
                                                getListSaves();
                                            }}
                                        >
                                            <i className="bi bi-filter-circle"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="modal-body ps-3 pe-3 pt-3"
                                        onClick={closePicker}
                                    >
                                        <div className="d-flex">
                                            <div className="me-2">
                                                <div className="rounded-circle bg-secondary avatar">
                                                    <img
                                                        className="object-fit-cover w-100 h-100"
                                                        src={user.avatar}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="flex-grow-1 w-100 position-relative"
                                                style={{ maxWidth: "540px" }}
                                            >
                                                <div className="ms-2">
                                                    <strong>
                                                        {user.username}
                                                    </strong>
                                                    <span className="fs-5 mx-2">
                                                        ›
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control-custom d-inline-block"
                                                        style={{
                                                            width: "auto",
                                                        }}
                                                        placeholder="Thêm chủ đề"
                                                        value={tag}
                                                        onChange={(e) =>
                                                            setTag(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="position-relative">
                                                    <div className="before-content"></div>
                                                    <div className="textarea-container">
                                                        <textarea
                                                            placeholder="Có gì mới?"
                                                            className="form-control-textarea-custom mt-2 p-0 ms-2 border-0 shadow-none "
                                                            value={content}
                                                            onChange={
                                                                handleInput
                                                            }
                                                            onInput={
                                                                handleInput
                                                            }
                                                        ></textarea>
                                                        <PreviewContainer
                                                            preview={true}
                                                            listImage={
                                                                listImage
                                                            }
                                                            onRemove={
                                                                handleRemoveImage
                                                            }
                                                            zoom={true}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="icon">
                                                    <button
                                                        className="btn"
                                                        onClick={
                                                            showImagePicker
                                                        }
                                                    >
                                                        <i className="bi bi-images"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-icon-emoji"
                                                        onClick={
                                                            showEmojiPicker
                                                        }
                                                    >
                                                        <i className="bi bi-emoji-smile"></i>
                                                    </button>
                                                    <div className="emoji-picker-popup">
                                                        {showEmoji && (
                                                            <EmojiPicker
                                                                width={300}
                                                                height={400}
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
                                                    <div className="gif-picker-popup">
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
                                                                    border: 1px
                                                                        solid
                                                                        #ccc;
                                                                    overflow: hidden;
                                                                    width: 425px;
                                                                    height: 400px;

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
                                    <div className="modal-footer-custom p-3">
                                        <div className="text-muted mt-3 small">
                                            <select
                                                className="form-select"
                                                aria-label="Size 3 select example"
                                                value={privacy}
                                                onChange={(e) =>
                                                    setPrivacy(e.target.value)
                                                }
                                            >
                                                <option value="Công khai">
                                                    Công khai
                                                </option>
                                                <option value="Bạn bè">
                                                    Bạn bè
                                                </option>
                                                <option value="Chỉ mình tôi">
                                                    Chỉ mình tôi
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-light ms-2 submit-btn"
                                                disabled={!validate()}
                                                onClick={() => submit(false)}
                                            >
                                                Đăng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="modal-content modal-content-saves shadow-sm rounded-4">
                                    <div className="modal-header">
                                        <button
                                            className="btn"
                                            type="button"
                                            data-bs-target="#carouselExampleFade"
                                            data-bs-slide="prev"
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
                                                <FeedSave
                                                    data={item}
                                                    key={item.feed.id}
                                                    idx={idx}
                                                    handleChose={
                                                        handleChoseFeedSave
                                                    }
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
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
            {/* <ModalConfirm
        show={true}
        onSave={handleClose}
        closeCreateModal={handleClose}
      /> */}
        </div>
    );
};

export default CreateModal;
