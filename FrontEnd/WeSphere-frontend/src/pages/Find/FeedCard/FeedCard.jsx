import Feed from "../../../components/Elements/Feed/Feed";
import { NavLink } from "react-router-dom";
import style from "./FeedCard.module.css";
const FeedCard = ({ data }) => {
    // data = {
    //     feed: {
    //         id: "689b94b7574cfc46cc5c3eda",
    //         content: {
    //             root: {
    //                 children: [
    //                     {
    //                         children: [
    //                             {
    //                                 detail: 0,
    //                                 format: 0,
    //                                 mode: "normal",
    //                                 style: "",
    //                                 text: "Xin chào ",
    //                                 type: "text",
    //                                 version: 1,
    //                             },
    //                         ],
    //                         direction: "ltr",
    //                         format: "",
    //                         indent: 0,
    //                         type: "paragraph",
    //                         version: 1,
    //                         textFormat: 0,
    //                         textStyle: "",
    //                     },
    //                 ],
    //                 direction: "ltr",
    //                 format: "",
    //                 indent: 0,
    //                 type: "root",
    //                 version: 1,
    //             },
    //         },
    //         tag: "love",
    //         privateMode: "Công khai",
    //         username: "bn.ngoc",
    //         commentOfPost: null,
    //         timeCreate: "2025-08-13T02:23:35.430Z",
    //         active: true,
    //         listImages: [
    //             {
    //                 url: "https://res.cloudinary.com/dcgog8pcw/image/upload/v1755026601/WeSphere/ynbwtshdv6sm7fqrjpod.jpg",
    //                 type: "image",
    //                 publicId: "WeSphere/ynbwtshdv6sm7fqrjpod",
    //             },
    //             {
    //                 url: "https://res.cloudinary.com/dcgog8pcw/video/upload/v1755026615/WeSphere/lnjylyo0xdhbvsuhrnpw.mp4",
    //                 type: "video",
    //                 publicId: "WeSphere/lnjylyo0xdhbvsuhrnpw",
    //             },
    //         ],
    //         totalLike: 1,
    //         totalReposts: 1,
    //         totalComment: 14,
    //     },
    //     feedOwner: {
    //         username: "bn.ngoc",
    //         id: "68990d2193bcb5236e36c18e",
    //         isOnline: false,
    //     },
    //     state: {
    //         isLike: true,
    //         isRePost: true,
    //     },
    // };
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
