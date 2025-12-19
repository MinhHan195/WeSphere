import Feed from "../../../components/Elements/Feed/Feed";
import { NavLink } from "react-router-dom";
import style from "./FeedCard.module.css";
const FeedCard = ({ data }) => {
    return (
        <NavLink
            to={`/${data.feedOwner.username}/post/${data.feed.id}`}
            className={`${style.link}`}
        >
            <div className="py-3 ">
                <Feed data={data} />
            </div>
        </NavLink>
    );
};
export default FeedCard;
