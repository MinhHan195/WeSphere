import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { NavLink } from "react-router-dom";
import style from "./RequestFollowCard.module.css";

const RequestFollowCard = ({ data }) => {
    const createAt = () => {
        return formatDistanceToNow(new Date(data.timeCreate), {
            addSuffix: true,
            locale: vi,
        });
    };

    const acceptFollow = async () => {};
    return (
        <NavLink to={`/${data.username}`} className={style.link}>
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
                            Yêu cầu theo dõi theo dõi
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        className={`btn ${style.btn_accept}`}
                        onClick={acceptFollow}
                    >
                        Chấp nhận
                    </button>
                    <button
                        className={`btn ${style.btn_no} ms-3`}
                        onClick={acceptFollow}
                    >
                        Từ chối
                    </button>
                </div>
            </div>
        </NavLink>
    );
};
export default RequestFollowCard;

// {
//     type: "request_follow",
//     data: {
//         username: data.username,
//         avatar: data.avatar,
//         timeCreate: data.timeCreate,
//         id: data.id,
//         NotificationId: data.NotificationId
//     }
// }
