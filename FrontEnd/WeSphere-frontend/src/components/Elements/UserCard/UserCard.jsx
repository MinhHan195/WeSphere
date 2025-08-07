import style from "./UserCard.module.css";
const UserCard = ({ user, isBlock, removeHandle }) => {
    return (
        <div className="d-flex">
            <div className="me-3">
                <div className={`rounded-circle bg-secondary ${style.avatar}`}>
                    <img
                        className="object-fit-cover w-100 h-100"
                        src={user.avatar}
                        alt=""
                    />
                </div>
            </div>
            <div
                className={`d-flex justify-content-between align-items-center border-bottom pb-2 ${style.user_card_content}`}
            >
                <div>
                    <p className="p-0 m-0 fw-bold">{user.username}</p>
                    <p className="p-0 m-0 fw-light text-secondary">
                        {user.fullname}
                    </p>
                </div>
                <button
                    className={`${style.button_custom} rounded-3 fw-bold px-3`}
                    onClick={() => {
                        removeHandle(user.id);
                    }}
                >
                    {isBlock ? "Bỏ chặn" : "Bỏ hạn chế"}
                </button>
            </div>
        </div>
    );
};
export default UserCard;
