import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Environment } from "../../../environments/environment";
import { setModal } from "../../../redux/createSLide";
import { setAlert, setLoading } from "../../../redux/authSlide";
import { $api } from "../../../services/service";
import PreviewContainer from "../PreviewContainer/PreviewContainer";
import ModalConfirm from "./ModalConfirm/ModalConfirm";
import EmojiPicker from "emoji-picker-react";
import Giphy from "react-awesome-giphy";
import "./CreateModal.css";

const CreateModal = () => {
  const dispatch = useDispatch();
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
      const textarea = document.querySelector(".form-control-textarea-custom");
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 370) + "px";
      setContent(e.target.value);
      updateBefore();
    }
  };

  const updateBefore = () => {
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

  const closeModal = (e) => {
    const element1 = e.target;
    document
      .querySelector(".modal-dialog-custom")
      .addEventListener("click", (e) => {
        const element2 = e.target;
        if (
          element2.classList.contains("modal-dialog-custom") &&
          element1 === element2
        ) {
          showHideModalConfirm();
        }
      });
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

  const submit = async () => {
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

  return (
    <div>
      <div
        className={"modal-background " + (show ? "show-modal" : "hide-modal")}
        onMouseDown={closeModal}
      >
        <div className="modal-dialog-custom">
          <div
            className="modal-content shadow-sm rounded-4"
            onClick={closePicker}
          >
            <div className="modal-header">
              <button className="btn" onClick={showHideModalConfirm}>
                Hủy
              </button>
              <h6>
                <b>Bài đăng mới</b>
              </h6>
              <button className="btn" style={{ fontSize: "20px" }}>
                <i className="bi bi-filter-circle"></i>
              </button>
            </div>
            <div className="modal-body ps-3 pe-3 pt-3">
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
                <div className="flex-grow-1 w-100 position-relative">
                  <div className="ms-2">
                    <strong>{user.username}</strong>
                    <span className="fs-5 mx-2">›</span>
                    <input
                      type="text"
                      className="form-control-custom d-inline-block"
                      style={{ width: "auto" }}
                      placeholder="Thêm chủ đề"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                    />
                  </div>
                  <div className="position-relative">
                    <div className="before-content"></div>
                    <div className="textarea-container" onChange={updateBefore}>
                      <textarea
                        placeholder="Có gì mới?"
                        className="form-control-textarea-custom mt-2 p-0 ms-2 border-0 shadow-none "
                        value={content}
                        onInput={handleInput}
                      ></textarea>
                      <PreviewContainer
                        listImage={listImage}
                        onRemove={handleRemoveImage}
                      />
                    </div>
                  </div>

                  <div className="icon">
                    <button className="btn" onClick={showImagePicker}>
                      <i className="bi bi-images"></i>
                    </button>
                    <button
                      className="btn btn-icon-emoji"
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
                      className="btn btn-icon-gif"
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
            <div className="modal-footer-custom p-3">
              <div className="text-muted mt-3 small">
                <select
                  className="form-select"
                  aria-label="Size 3 select example"
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value)}
                >
                  <option value="Công khai">Công khai</option>
                  <option value="Bạn bè">Bạn bè</option>
                  <option value="Chỉ mình tôi">Chỉ mình tôi</option>
                </select>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-light ms-2 submit-btn"
                  disabled={!validate()}
                  onClick={submit}
                >
                  Đăng
                </button>
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
