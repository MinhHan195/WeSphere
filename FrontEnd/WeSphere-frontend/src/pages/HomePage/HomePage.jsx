import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/createSLide";
import { $api } from "../../services/service";
import { setLoading, setAlert } from "../../redux/authSlide";
import { useNavigate } from "react-router-dom";
import { _AUTH } from "../../constants/_auth";
import Feed from "../../components/Elements/Feed/Feed";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import style from "./HomePage.module.css";
import ViewImage from "../../components/Elements/ViewImage/ViewImage";

const HomePage = () => {
    const token = localStorage.getItem(_AUTH.TOKEN_NAME);
    const navigate = useNavigate();
    const [listFeeds, setListFeeds] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const fetchData = async () => {
        try {
            dispatch(setLoading(true));
            const res = await $api.post.getListFeeds();
            if (!res.isError && res.data.length > 0) {
                setListFeeds(res.data);
                dispatch(setLoading(false));
            }
        } catch (error) {
            console.error("Error fetching feeds:", error);
            dispatch(setLoading(false));
            dispatch(
                setAlert({
                    type: "error",
                    message: error.errors.exceptionMessage ?? error.message,
                })
            );
        }
    };
    useEffect(() => {
        document.title = "WeSphere • Trang chủ";
        if (!token) {
            navigate("/auth ");
        }
        fetchData();
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
                    {listFeeds.length > 0
                        ? listFeeds.map((feed, idx) => {
                              return <Feed data={feed} key={idx} idx={idx} />;
                          })
                        : null}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default HomePage;
