import React, { useState } from "react";
import { useEffect } from "react";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import UserCard from "./UserCard/UserCard";
import FilmCard from "./FilmCard/FilmCard";
import FeedCard from "./FeedCard/FeedCard";
import style from "./Find.module.css";
const Find = () => {
    const data = [
        {
            fullname: "khoai lang thang",
            username: "khoailangthang",
            email: "contact@52hzmedia.com",
            totalFollowers: 12400000,
            isFollowing: false,
            avatar: "https://res.cloudinary.com/dcgog8pcw/image/upload/v1755131100/e29c0fe492873043f31a5128dc98255d_q6bsve.webp",
        },
        {
            fullname: "Fahoka",
            username: "fahoka",
            email: "fahoka@example.com",
            totalFollowers: 500000,
            isFollowing: true,
            avatar: "https://res.cloudinary.com/dcgog8pcw/image/upload/v1755131100/e29c0fe492873043f31a5128dc98255d_q6bsve.webp",
        },
        {
            title: "Marvel Ironheart",
            actor: "Chinaka Hodge",
            id: "689d2df231af8d4cfc112716",
            poster: "https://res.cloudinary.com/dcgog8pcw/image/upload/v1755131100/e29c0fe492873043f31a5128dc98255d_q6bsve.webp",
        },
        {
            feed: {
                id: "689b94b7574cfc46cc5c3eda",
                content: {
                    root: {
                        children: [
                            {
                                children: [
                                    {
                                        detail: 0,
                                        format: 0,
                                        mode: "normal",
                                        style: "",
                                        text: "Xin chào ",
                                        type: "text",
                                        version: 1,
                                    },
                                ],
                                direction: "ltr",
                                format: "",
                                indent: 0,
                                type: "paragraph",
                                version: 1,
                                textFormat: 0,
                                textStyle: "",
                            },
                        ],
                        direction: "ltr",
                        format: "",
                        indent: 0,
                        type: "root",
                        version: 1,
                    },
                },
                tag: "love",
                privateMode: "Công khai",
                username: "bn.ngoc",
                commentOfPost: null,
                timeCreate: "2025-08-13T02:23:35.430Z",
                active: true,
                listImages: [
                    {
                        url: "https://res.cloudinary.com/dcgog8pcw/image/upload/v1755026601/WeSphere/ynbwtshdv6sm7fqrjpod.jpg",
                        type: "image",
                        publicId: "WeSphere/ynbwtshdv6sm7fqrjpod",
                    },
                    {
                        url: "https://res.cloudinary.com/dcgog8pcw/video/upload/v1755026615/WeSphere/lnjylyo0xdhbvsuhrnpw.mp4",
                        type: "video",
                        publicId: "WeSphere/lnjylyo0xdhbvsuhrnpw",
                    },
                ],
                totalLike: 1,
                totalReposts: 1,
                totalComment: 14,
            },
            feedOwner: {
                username: "bn.ngoc",
                id: "68990d2193bcb5236e36c18e",
                isOnline: false,
            },
            state: {
                isLike: true,
                isRePost: true,
            },
        },
    ];

    const [keyword, setKeyword] = useState("");
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        if (!keyword.trim()) {
            setFilteredData(data);
            return;
        }
        const lowerKeyword = keyword.toLowerCase();
        setFilteredData(
            data.filter((item) => {
                // User
                if (item.fullname || item.username) {
                    return (
                        item.fullname?.toLowerCase().includes(lowerKeyword) ||
                        item.username?.toLowerCase().includes(lowerKeyword)
                    );
                }
                // Film
                if (item.title || item.actor) {
                    return (
                        item.title?.toLowerCase().includes(lowerKeyword) ||
                        item.actor?.toLowerCase().includes(lowerKeyword)
                    );
                }
                // Feed
                if (item.feed) {
                    return (
                        item.feed.tag?.toLowerCase().includes(lowerKeyword) ||
                        item.feedOwner?.username
                            ?.toLowerCase()
                            .includes(lowerKeyword)
                    );
                }
                return false;
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword]);

    useEffect(() => {
        document.title = "Tìm kiếm • WeSphere";
    }, []);

    return (
        <DefaultLayout>
            <div>
                <div
                    className={`${style.main_feed} d-flex justify-content-center`}
                >
                    <div className={`${style.container} mt-4`}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="m-0 fw-bold">Tìm kiếm</h5>
                            <i className="bi bi-three-dots-vertical fs-5"></i>
                        </div>

                        <div
                            className={`${style.search_input} input-group mb-4 rounded-pill overflow-hidden`}
                        >
                            <span className="input-group-text border-0">
                                <i className="bi bi-search text-muted"></i>
                            </span>
                            <input
                                type="text"
                                className={`form-control border-0 focus-ring-light ${style.form_custom}`}
                                placeholder="Tìm kiếm người dùng..."
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>

                        <h6 className="mb-3">Kết quả tìm kiếm</h6>

                        <div className={`${style.list_custom}`}>
                            {filteredData.map((item, idx) => {
                                if (item.fullname || item.username) {
                                    return <UserCard data={item} key={idx} />;
                                } else if (item.title || item.actor) {
                                    return <FilmCard data={item} key={idx} />;
                                } else if (item.feed) {
                                    return <FeedCard data={item} key={idx} />;
                                }
                                return null;
                            })}
                            {/* <UserCard />
                            <hr className={`${style.hr_custom}`} />
                            <FilmCard />
                            <hr className={`${style.hr_custom}`} />
                            <FeedCard /> */}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Find;
