import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/createSLide";
import { $api } from "../../services/service";
import { setLoading, setAlert } from "../../redux/authSlide";
import Feed from "../../components/Elements/Feed/Feed";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import style from "./HomePage.module.css";
import { _AUTH } from "../../constants/_auth";

const HomePage = () => {
    const [listFeeds, setListFeeds] = useState([]);
    const dispatch = useDispatch();
    const avatar = useSelector((state) => state.auth.user.avatar);
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
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <DefaultLayout>
            <div
                className={`d-flex justify-content-center pt-5 ${style.home_main_container}`}
            >
                <div className={`${style.home_main_dialog}`}>
                    <div
                        className={`card w-100 mb-4 shadow-sm rounded-4 ${style.card}`}
                        onClick={() => dispatch(setModal(true))}
                    >
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <div
                                        className={`rounded-circle bg-secondary ${style.avatar}`}
                                    >
                                        <img
                                            className="object-fit-cover w-100 h-100"
                                            src={avatar}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <span className="text-secondary">
                                    Có gì mới
                                </span>
                            </div>
                            <div className="text-end mt-2">
                                <div
                                    className={`btn btn-outline-dark btn-sm fw-bold rounded-3 ${style.post_button}`}
                                >
                                    Đăng
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`list-post w-100`}>
                        {listFeeds.length > 0
                            ? listFeeds.map((feed, idx) => {
                                  return (
                                      <div
                                          className={`card mb-4 shadow-sm rounded-4 py-4 w-100 ${style.feed_card_item}`}
                                          key={feed.feed.id}
                                      >
                                          <Feed
                                              data={feed}
                                              key={idx}
                                              idx={idx}
                                          />
                                      </div>
                                  );
                              })
                            : null}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default HomePage;
