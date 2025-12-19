import style from "./UserCard.module.css";
const UserCard = (props) => {
    const { user, isBlock, removeHandle } = props;
    return (
        <div className="d-flex">
            <div className="me-3">
                <div className={`rounded-circle bg-secondary ${style.avatar}`}>
                    <img
                        className="object-fit-cover w-100 h-100"
                        src={user.account.avatar || "/default_avatar.jpg"}
                        alt=""
                    />
                </div>
            </div>
            <div
                className={`d-flex justify-content-between align-items-center border-bottom pb-2 ${style.user_card_content}`}
            >
                <div>
                    <p className="p-0 m-0 fw-bold">{user.account.username}</p>
                </div>
                <button
                    className={`${style.button_custom} rounded-3 fw-bold px-3`}
                    onClick={() => {
                        removeHandle(user.userId);
                    }}
                >
                    {isBlock ? "Bỏ chặn" : "Bỏ hạn chế"}
                </button>
            </div>
        </div>
    );
};
export default UserCard;
