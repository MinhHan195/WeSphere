import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Environment } from "../../../environments/environment";
import { setAlert, setLoading } from "../../../redux/authSlide";
import { $api } from "../../../services/service";
import PreviewContainer from "../PreviewContainer/PreviewContainer";
import EmojiPicker from "emoji-picker-react";
import Giphy from "react-awesome-giphy";
import style from "./CommentInput.module.css";
const ConmentInput = (props) => {
    const dispatch = useDispatch();
    const { data } = props;

    const [content, setContent] = useState("");
    const [listImage, setListImage] = useState([]);
    const [tag, setTag] = useState("");

    const [showEmoji, setShowEmoji] = useState(false);
    const [showGif, setShowGif] = useState(false);
    const user = useSelector((state) => state.auth.user);

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

    const handleInput = (e) => {
        if (e) {
            const textarea = document.querySelector(
                `.${style.form_control_textarea_custom}`
            );
            textarea.style.height = "auto";
            textarea.style.height = Math.min(textarea.scrollHeight, 370) + "px";
            setContent(e.target.value);
        }
    };

    const updateBefore = () => {
        const textareaContainer = document.querySelector(
            `.${style.textarea_container}`
        );
        const textareaContainerHeight = textareaContainer.offsetHeight;
        const beforeContent = document.querySelector(".before-content");
        beforeContent.style.height = textareaContainerHeight + 15 + "px";
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

    const handleEmojiClick = (emoji) => {
        setContent((prev) => prev + emoji.emoji);
        handleInput();
    };

    const showGifPicker = () => {
        if (showEmoji) {
            setShowEmoji(false);
        }
        setShowGif(!showGif);
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
            formData.append("save", save);
            formData.append("commentOfPost", data.feed.id);
            const res = await $api.post.create(formData);
            if (!res.isError) {
                dispatch(setLoading(false));
                dispatch(setAlert({ message: res.message }));
            }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setAlert({ message: error.message }));
        }
    };

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

    return (
        <div className={style.comment_input_container}>
            <div
                className={`${style.comment_input_dialog}`}
                onClick={closePicker}
            >
                <div className="d-flex w-100">
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
                        className={`flex-grow-1 position-relative ${style.comment_input_body}`}
                    >
                        <div className="ms-2">
                            <strong>{user.username}</strong>
                            <span className="fs-5 mx-2">›</span>
                            <input
                                type="text"
                                className="form-control-custom d-inline-block"
                                style={{
                                    width: "auto",
                                }}
                                placeholder="Thêm chủ đề"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                            />
                        </div>
                        <div className={style.comment_input_data}>
                            <div className="before-content"></div>
                            <div className={style.textarea_container}>
                                <textarea
                                    placeholder={`Trả lời ${data.feedOwner.username} ...`}
                                    className={`p-0 ms-2 border-0 shadow-none ${style.form_control_textarea_custom}`}
                                    value={content}
                                    onInput={handleInput}
                                ></textarea>
                                <PreviewContainer
                                    preview={true}
                                    listImage={listImage}
                                    onRemove={handleRemoveImage}
                                    zoom={false}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                className={`btn ${style.icon_custom}`}
                                onClick={showImagePicker}
                            >
                                <i className="bi bi-images"></i>
                            </button>
                            <button
                                className={`btn btn-icon-emoji ${style.icon_custom}`}
                                onClick={showEmojiPicker}
                            >
                                <i className="bi bi-emoji-smile"></i>
                            </button>
                            <div className="emoji-picker-popup">
                                {showEmoji && (
                                    <EmojiPicker
                                        width={300}
                                        height={400}
                                        backgroundColor="rgb(251, 236, 215)"
                                        onEmojiClick={handleEmojiClick}
                                    />
                                )}
                            </div>
                            <button
                                className={`btn btn-icon-gif ${style.icon_custom}`}
                                onClick={showGifPicker}
                            >
                                <i className="bi bi-filetype-gif"></i>
                            </button>
                            <div className="gif-picker-popup">
                                {showGif && (
                                    <Giphy
                                        apiKey={Environment.GIPHY_API_KEY}
                                        callback={handleGifClick}
                                        css={`
                                            background-color: white;
                                            padding-top: 12px;
                                            border-radius: 10px;
                                            border: 1px solid #ccc;
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
                                                outline: 1px solid #007bff;
                                            }
                                        `}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`p-3 ${style.modal_footer_custom}`}>
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
    );
};
export default ConmentInput;
