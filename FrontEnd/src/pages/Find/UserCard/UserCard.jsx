import { useState } from "react";
import { $api } from "../../../services/service";
import style from "./UserCard.module.css";
const UserCard = ({ data }) => {
    // data = {
    //     fullname: "khoai lang thang",
    //     username: "khoailangthang",
    //     email: "contact@52hzmedia.com",
    //     totalFollowers: 12400000,
    //     isFollowing: false,
    //     avatar: "https://res.cloudinary.com/dcgog8pcw/image/upload/v1755131100/e29c0fe492873043f31a5128dc98255d_q6bsve.webp",
    // };

    const [isFollowing, setIsFollowing] = useState(data.isFollowing || false);
    async function follow() {
        try {
            const res = await $api.auth.followUser(data.username, !isFollowing);
            if (!res.isError) {
                setIsFollowing(!isFollowing);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function formatNumberShort(num) {
        if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
        }
        if (num >= 1_000) {
            return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
        }
        return num.toString();
    }
    return (
        <div
            className={`${style.list_group_item} d-flex justify-content-between align-items-start py-3 px-0`}
        >
            <div className="d-flex">
                <div
                    className={`me-3 ${style.avatar_container} rounded-circle `}
                >
                    <img
                        src="/default_avatar.jpg"
                        alt={data.username}
                        className="me-3 w-100 h-100"
                    />
                </div>

                <div>
                    <div className="fw-semibold">{data.username}</div>
                    <div className={`${style.text_secondary} small`}>
                        {data.fullname}
                    </div>
                    <div className={`${style.text_secondary} small`}>
                        {data.email}
                    </div>
                    <div className={`${style.text_secondary} small`}>
                        {formatNumberShort(data.totalFollowers)} người theo dõi
                    </div>
                </div>
            </div>

            <button
                className={`btn  btn-sm rounded-pill px-3 ${
                    isFollowing ? style.following : style.not_following
                }`}
                onClick={follow}
            >
                {isFollowing ? "Đang theo dõi" : "Theo dõi"}
            </button>
        </div>
    );
};
export default UserCard;
