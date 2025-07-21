import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/createSLide";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Post from "../../components/Elements/Feed/Feed";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import style from "./HomePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    document.title = "WeSphere • Trang chủ";
  }, []);
  return (
    <DefaultLayout>
      <div className={`d-flex flex-column align-items-center pt-5`}>
        <div
          className={`card mb-4 shadow-sm rounded-4 ${style.card}`}
          onClick={() => dispatch(setModal(true))}
        >
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <div className="rounded-circle bg-secondary avatar">
                  <img
                    className="object-fit-cover w-100 h-100"
                    src={user.avatar}
                    alt=""
                  />
                </div>
              </div>
              <span className="text-secondary">Có gì mới</span>
            </div>
            <div className="text-end mt-2">
              <div className="btn btn-outline-dark btn-sm fw-bold rounded-3">
                Đăng
              </div>
            </div>
          </div>
        </div>
        <div className={`list-post`}>
          <Post post={{ id: 1, content: "Post 1", tag: "Tag1" }} />
          <Post post={{ id: 2, content: "Post 2", tag: "Tag2" }} />
          <Post post={{ id: 3, content: "Post 3", tag: "Tag3" }} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
