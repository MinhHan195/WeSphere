import React from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useSelector } from "react-redux";
import ShowMedia from "../ShowMedia/ShowMedia";
import Editor from "../TextEditor/Editor";
import style from "./FeedSave.module.css";

const FeedSave = (props) => {
    const { data, handleChose } = props;
    const user = useSelector((state) => state.auth.user);

    const createAt = () => {
        return formatDistanceToNow(new Date(data.feed.timeCreate), {
            addSuffix: true,
            locale: vi,
        });
    };
    return (
        <div
            className={style.feed_save_container}
            onClick={(e) => {
                e.stopPropagation();
                handleChose(data);
            }}
        >
            <div>
                <div className="me-2">
                    <div
                        className={`rounded-circle bg-secondary ${style.avatar}`}
                    >
                        <img
                            className="object-fit-cover w-100 h-100"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className={style.feed_save_body}>
                <div className="mb-2">
                    <div>
                        <span className="me-2 fw-bold">{user.username}</span>
                        {data.feed.tag && (
                            <span className="me-2 fw-semibold">
                                <i className="bi bi-chevron-right"></i>{" "}
                                {data.feed.tag}
                            </span>
                        )}
                        <span className={style.text_secondary}>
                            {createAt()}
                        </span>
                    </div>
                </div>
                <Editor editable={false} json={data.feed.content} />
                <div style={{ width: "100%" }}>
                    <ShowMedia
                        listImage={data.feed.listImages}
                        preview={false}
                        zoom={false}
                    />
                </div>
            </div>
        </div>
    );
};
export default FeedSave;
