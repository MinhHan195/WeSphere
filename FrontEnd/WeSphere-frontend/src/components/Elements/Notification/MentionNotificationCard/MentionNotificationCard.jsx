import React from "react";
import style from "./MentionNotificationCard.module.css";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { NavLink } from "react-router-dom";
const MentionNotificationCard = ({ data }) => {
    const createAt = () => {
        return formatDistanceToNow(new Date(data.timeCreate), {
            addSuffix: true,
            locale: vi,
        });
    };
    return (
        <NavLink
            to={`/${data.username}/post/${data.postId}`}
            className={style.link}
        >
            <div className="d-flex justify-content-between align-items-center py-2 my-2">
                <div className="d-flex align-items-center gap-3">
                    <div
                        className={`rounded-circle bg-secondary ${style.avatar}`}
                    >
                        <img
                            className="object-fit-cover w-100 h-100"
                            src={data.avatar}
                            alt="avatar"
                        />
                    </div>
                    <div>
                        <div>
                            <strong>{data.username}</strong>{" "}
                            <span className={style.text_secondary}>
                                {createAt()}
                            </span>
                        </div>
                        <div className={style.text_secondary}>
                            Người dùng <strong>{data.username}</strong> đã nhắc
                            đến bạn trong bài viết mới
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};
export default MentionNotificationCard;

// {
//     type: "mention",
//     data: {
//         username: "user123",
//         avatar: "./avatar.png",
//         postId: "post123",
//         timeCreate: new Date(),
//     },
// }
