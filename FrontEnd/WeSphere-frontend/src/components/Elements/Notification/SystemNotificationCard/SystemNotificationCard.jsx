import React from "react";
import style from "./SystemNotificationCard.module.css";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { NavLink } from "react-router-dom";
const SystemNotificationCard = ({ data }) => {
    const createAt = () => {
        return formatDistanceToNow(new Date(data.timeCreate), {
            addSuffix: true,
            locale: vi,
        });
    };
    return (
        <NavLink to={data.link} className={style.link}>
            <div className="d-flex justify-content-between align-items-center py-2 my-2">
                <div className="d-flex align-items-center gap-3">
                    <div
                        className={`rounded-circle bg-secondary ${style.avatar}`}
                    >
                        <img
                            className="object-fit-cover w-100 h-100"
                            src="./main-logo.svg"
                            alt="avatar"
                        />
                    </div>
                    <div>
                        <div>
                            <strong>Thông báo hệ thống</strong>{" "}
                            <span className={style.text_secondary}>
                                {createAt()}
                            </span>
                        </div>
                        <div className={style.text_secondary}>
                            {data.message}
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};
export default SystemNotificationCard;

// {    type: "system_notification",
//     data: {
//         message: "Thông báo hệ thống",
//         timeCreate: new Date(),
//         link: "/system-notification"
//     }
// }
