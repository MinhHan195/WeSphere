import React, { useState } from "react";
import style from "./Feed.module.css";
const Post = (props) => {
  const [heartClicked, setHeartClicked] = useState(false);

  const handleHeartClick = () => {
    setHeartClicked(!heartClicked);
  };
  return (
    <div
      className={`card mb-4 shadow-sm rounded-4 feed-card p-3 ${style.feed_container}`}
    >
      <div className="">
        <div className="me-2">
          <div className="rounded-circle bg-secondary avatar">
            <img
              className="object-fit-cover w-100 h-100"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="">
        <div className="mb-2">
          <div>
            <span className="me-2 fw-bold">minhanh_02k</span>
            {props.post.tag && (
              <span className="me-2 fw-semibold">
                <i className="bi bi-chevron-right"></i> {props.post.tag}
              </span>
            )}
            <span className="text-muted">14 giờ</span>
          </div>
        </div>
        <p className={style.text_content_custom}>
          Ê ý là tui cũng ko xấu , ngoại hình ưa nhìn mà thế nào ế tận 5 năm vậy
          Ê ý là tui cũng ko xấu , ngoại hình ưa nhìn mà thế nào ế tận 5 năm
          vậyÊ ý là tui cũng ko xấu , ngoại hình ưa nhìn mà thế nào ế tận 5 năm
          vậyÊ ý là tui cũng ko xấu , ngoại hình ưa nhìn mà thế nào ế tận 5 năm
          vậy
        </p>
        <img
          src="https://i.pinimg.com/736x/f9/6b/60/f96b60c7616b0dd29fa19ab4100e4947.jpg"
          className="img-fluid mb-2"
          alt="Ảnh bài viết"
        />
        <div className={style.btn_icon_container}>
          <button
            className={`btn rounded-pill m-0 px-2 py-1 ${style.btn_icon}`}
            onClick={handleHeartClick}
          >
            <i
              className={`bi ${
                heartClicked ? "bi-heart-fill text-danger" : "bi-heart"
              }`}
            ></i>{" "}
            <span className={heartClicked ? "text-danger" : ""}>527</span>
          </button>
          <button
            className={`btn rounded-pill m-0 px-2 py-1 ${style.btn_icon}`}
          >
            <i className="bi bi-chat"></i> <span>79</span>
          </button>
          <button
            className={`btn rounded-pill m-0 px-2 py-1 ${style.btn_icon}`}
          >
            <i className="bi bi-arrow-repeat"></i> <span>2</span>
          </button>
          <button
            className={`btn rounded-pill m-0 px-2 py-1 ${style.btn_icon}`}
          >
            <i className="bi bi-send"></i> <span>89</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Post;
