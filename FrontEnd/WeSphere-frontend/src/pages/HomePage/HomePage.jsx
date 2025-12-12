import React, { useState, useEffect, useRef } from "react";
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
    const [lastIndex, setLastIndex] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const [listBlock, setListBlock] = useState([]);
    const dispatch = useDispatch();
    const avatar = useSelector((state) => state.auth.user.avatar);
    const sentinelRef = useRef(null);

    const fetchData = async (startIndex) => {
        try {
            dispatch(setLoading(true));
            setLoadingMore(true);
            const res = await $api.post.getListFeeds(startIndex);
            if (!res.isError) {
                // setListFeeds((prev) => [...prev, ...res.data]);
                setListFeeds((prev) => {
                    const existingIds = new Set(
                        prev.map((item) => item?.feed?.id)
                    );
                    const newItems = res.data.filter(
                        (item) => !existingIds.has(item?.feed?.id)
                    );
                    return [...prev, ...newItems];
                });
                dispatch(setLoading(false));
                setLoadingMore(false);
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

    const addIdLock = async (id) => {
        setListBlock((prev) => [...prev, id]);
    };

    useEffect(() => {
        // console.log(listBlock);
        const blockIds = new Set(listBlock.map((i) => i?.id));
        setListFeeds((prev) => {
            return prev.filter(
                (item) =>
                    !(
                        blockIds.has(item?.feedOwner?.id) ||
                        blockIds.has(item?.feed?.id)
                    )
            );
        });
    }, [listBlock]);

    useEffect(() => {
        document.title = "WeSphere • Trang chủ";
        fetchData(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setLastIndex(listFeeds.length);
            }
        });

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sentinelRef.current]);

    useEffect(() => {
        fetchData(lastIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastIndex]);
    return (
        <DefaultLayout>
            <div
                className={`d-flex align-items-center flex-column ${style.home_main_container}`}
            >
                <div
                    className={`card  mb-4 shadow-sm rounded-4 mt-5 ${style.card}`}
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
                            <span className="text-secondary">Có gì mới</span>
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
                {listFeeds.length > 0
                    ? listFeeds.map((feed, idx) => {
                          if (idx == listFeeds.length - 2) {
                              return (
                                  <div
                                      className={`card mb-4 shadow-sm rounded-4 py-4  ${style.feed_card_item}`}
                                      key={feed.feed.id}
                                      ref={sentinelRef}
                                      id="sentinel"
                                  >
                                      <Feed
                                          data={feed}
                                          key={idx}
                                          idx={idx}
                                          block={addIdLock}
                                      />
                                  </div>
                              );
                          } else {
                              return (
                                  <div
                                      className={`card mb-4 shadow-sm rounded-4 py-4  ${style.feed_card_item}`}
                                      key={feed.feed.id}
                                  >
                                      <Feed
                                          data={feed}
                                          key={idx}
                                          idx={idx}
                                          block={addIdLock}
                                      />
                                  </div>
                              );
                          }
                      })
                    : null}
                {loadingMore ? (
                    <div className="d-flex justify-content-center my-3">
                        <div
                            className={`spinner-border ${style.spinner}`}
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : null}
            </div>
        </DefaultLayout>
    );
};

export default HomePage;
