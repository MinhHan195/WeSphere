import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import { useSelector } from "react-redux";
import MentionNotificationCard from "../../components/Elements/Notification/MentionNotificationCard/MentionNotificationCard";
import NewFeedNotificationCard from "../../components/Elements/Notification/NewFeedNotificationCard/NewFeedNotificationCard";
import RequestFollowCard from "../../components/Elements/Notification/RequestFollowCard/RequestFollowCard";
import SystemNotificationCard from "../../components/Elements/Notification/SystemNotificationCard/SystemNotificationCard";

import style from "./Notification.module.css";
const Notification = () => {
    const [filter, setFilter] = useState("all");
    const listNotification = useSelector(
        (state) => state.auth.listNotifycation
    );
    useEffect(() => {
        document.title = "Thông báo • WeSphere";
    }, []);

    return (
        <DefaultLayout>
            <div className="main-feed d-flex justify-content-center w-100">
                <div className={`${style.container} mt-4`}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="m-0 fw-bold">Hoạt động</h5>
                        <div className="dropdown">
                            <button
                                className={style.btn}
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="bi bi-three-dots"></i>
                            </button>
                            <ul
                                className={`dropdown-menu ${style.dropdown_menu}`}
                            >
                                <li>
                                    <span className="dropdown-item" href="#">
                                        Tất cả thông báo
                                    </span>
                                </li>
                                <li>
                                    <span className="dropdown-item" href="#">
                                        Bạn bè
                                    </span>
                                </li>
                                <li>
                                    <span className="dropdown-item" href="#">
                                        Khác
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {listNotification.map((item, idx) => {
                        if (item.type == "mention") {
                            return (
                                <>
                                    <MentionNotificationCard
                                        data={item.data}
                                        key={idx}
                                    />
                                    <hr className="p-0 m-0" />
                                </>
                            );
                        } else if (item.type == "new_feed") {
                            return (
                                <>
                                    <NewFeedNotificationCard
                                        data={item.data}
                                        key={idx}
                                    />
                                    <hr className="p-0 m-0" />
                                </>
                            );
                        } else if (item.type == "request_follow") {
                            return (
                                <>
                                    <RequestFollowCard
                                        data={item.data}
                                        key={idx}
                                    />
                                    <hr className="p-0 m-0" />
                                </>
                            );
                        } else if (item.type == "system_notification") {
                            return (
                                <>
                                    <SystemNotificationCard
                                        data={item.data}
                                        key={idx}
                                    />
                                    <hr className="p-0 m-0" />
                                </>
                            );
                        }
                    })}

                    {/* <div className=" d-flex align-items-start gap-3 border-bottom pb-3 mb-3">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="avatar"
                            className="rounded-circle"
                        />
                        <div>
                            <div>
                                <strong>q_forsure95</strong>
                                <span className="text-muted">16 giờ</span>
                            </div>
                            <div>biết ai luôn :))</div>
                            <div className="mt-1 text-muted small">
                                <i className="bi bi-heart me-2"></i>293
                                <i className="bi bi-chat mx-2"></i>5
                                <i className="bi bi-arrow-repeat mx-2"></i>10
                            </div>
                        </div>
                    </div>

                    <div className="d-flex align-items-start gap-3 border-bottom pb-3 mb-3">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="avatar"
                            className="rounded-circle"
                        />
                        <div>
                            <div>
                                <strong>iam.chieee_</strong>
                                <span className="text-muted">1 ngày</span>
                            </div>
                            <div>con trai thời nay tán gái kiểu !??</div>
                            <div className="mt-1 text-muted small">
                                <i className="bi bi-heart me-2"></i>4K
                                <i className="bi bi-chat mx-2"></i>125
                                <i className="bi bi-arrow-repeat mx-2"></i>418
                                <i className="bi bi-send mx-2"></i>247
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                        <div className="d-flex align-items-center gap-3">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="avatar"
                                className="rounded-circle"
                            />
                            <div>
                                <div>
                                    <strong>lkharnhi</strong>{" "}
                                    <span className="text-muted">2 ngày</span>
                                </div>
                                <div className="text-muted">Gợi ý theo dõi</div>
                            </div>
                        </div>
                        <button className="btn btn-dark">Theo dõi</button>
                    </div> */}
                </div>
            </div>
        </DefaultLayout>
    );
};
export default Notification;

// Có người yêu cầu theo dõi
// Thông báo bạn bè có bài đăng mới
// Thông báo từ hệ thống
// Thông báo khi có người tag tên
