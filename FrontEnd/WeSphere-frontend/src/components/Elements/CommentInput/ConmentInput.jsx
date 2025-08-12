import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Environment } from "../../../environments/environment";
import { setAlert, setLoading } from "../../../redux/authSlide";
import { $api } from "../../../services/service";
import PreviewContainer from "../PreviewContainer/PreviewContainer";
import EmojiPicker from "emoji-picker-react";
import Giphy from "react-awesome-giphy";
import Editor from "../TextEditor/Editor";
import style from "./CommentInput.module.css";
const CommentInput = (props) => {
    const dispatch = useDispatch();
    const { data, close } = props;
    const [content, setContent] = useState("");
    const [listImage, setListImage] = useState([]);
    const [tag, setTag] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [showGif, setShowGif] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const [emoji, setEmoji] = useState(null);

    useEffect(() => {
        if (close) {
            setShowEmoji(false);
            setShowGif(false);
        }
    }, [close]);

    const updateBefore = () => {
        const textarea = document.querySelector(`.${style.textarea_container}`);
        const beforeContent = document.querySelector(
            `.${style.before_content}`
        );
        beforeContent.style.height = textarea.offsetHeight + 15 + "px";
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
        setEmoji(emoji);
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
            <div className={`${style.comment_input_dialog}`}>
                <div className="d-flex w-100">
                    <div className="me-2 d-flex flex-column align-items-center">
                        <div
                            className={`rounded-circle bg-secondary mb-2 ${style.avatar}`}
                        >
                            <img
                                className="object-fit-cover w-100 h-100"
                                src={user.avatar}
                                alt=""
                            />
                        </div>
                        <div className={style.before_content}></div>
                    </div>
                    <div
                        className={`flex-grow-1 position-relative ${style.comment_input_body}`}
                    >
                        <div className="ms-2">
                            <strong>{user.username}</strong>
                            <span className="fs-5 mx-2">›</span>
                            <input
                                type="text"
                                className={`d-inline-block ${style.form_control_custom}`}
                                style={{
                                    width: "auto",
                                }}
                                placeholder="Thêm chủ đề"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                            />
                        </div>
                        <div className={style.comment_input_data}>
                            <div className={style.textarea_container}>
                                <div className="ps-2">
                                    <Editor
                                        emoji={emoji}
                                        json={content}
                                        editable={true}
                                        placeholder={`Trả lời ${data.feedOwner.username} ...`}
                                        onExport={(json) => {
                                            setContent(json);
                                        }}
                                    />
                                </div>
                                <PreviewContainer
                                    preview={true}
                                    listImage={listImage}
                                    onRemove={handleRemoveImage}
                                    zoom={false}
                                />
                            </div>
                        </div>

                        <div className={`icon ${style.icon_container}`}>
                            <label
                                className={`custom-file-label fs-5 me-1 ${style.file_lable}`}
                                htmlFor="file-upload"
                            >
                                <i className="bi bi-images"></i>
                            </label>
                            <input
                                id="file-upload"
                                className={style.input_file}
                                accept="image/*,video/*"
                                type="file"
                                onChange={(e) => {
                                    setListImage((prev) => [
                                        ...prev,
                                        e.target.files[0],
                                    ]);
                                }}
                            />
                            <button
                                className={`btn btn-icon-emoji ${style.icon_custom}`}
                                onClick={showEmojiPicker}
                            >
                                <i className="bi bi-emoji-smile"></i>
                            </button>
                            <div className={style.emoji_picker_popup}>
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
                            <div className={style.gif_picker_popup}>
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
            <div className={`px-3 pb-1 ${style.modal_footer_custom}`}>
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
export default CommentInput;
