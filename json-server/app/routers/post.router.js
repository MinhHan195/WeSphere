const express = require("express");

const router = express.Router();

router.route("/create").post((req, res) => {
    res.send({
        "isError": false,
        "message": "Tạo bài viết thành công",
    })
});

router.route("/like/:mode").get((req, res) => {
    const mode = req.params.mode;
    if (mode === "add") {
        res.send({
            "isError": false,
            "message": "add",
        })
    }
    else if (mode === "minus") {
        res.send({
            "isError": false,
            "message": "minus",
        })
        // res.status(400).json({
        //     "isError": true,
        //     "errors": {
        //         "exceptionMessage": "Hãy thử lại"
        //     }
        // })
    }

});

router.route("/saves/:id").get((req, res) => {
    res.send({
        "isError": false,
        "message": "Lấy danh sách thành công",
        "data": [
            {
                "feed": {
                    "id": "y324952934u8203u5",
                    "content":
                        "Ê ý là tui cũng ko xấu , ngoại hình ưa nhìn mà thế nào ế tận 5 năm vậy trời 😭 Trời ơi tôi muốn có ny 😔",
                    "tag": "Gernang",
                    "listImages": [
                        {
                            "url": "https://i.pinimg.com/736x/31/91/ae/3191ae5125b68ccc4de96820e62fc8dc.jpg",
                            "type": "image",
                        },
                        {
                            "url": "https://i.pinimg.com/736x/53/d2/0c/53d20cdf8569c45655ef6e039f237691.jpg",
                            "type": "image",
                        },
                        {
                            "url": "https://i.pinimg.com/736x/cd/5e/2b/cd5e2bd8964a72355fe76c04c51623c3.jpg",
                            "type": "image",
                        },
                        {
                            "url": "https://i.pinimg.com/736x/39/b5/cf/39b5cfd220b1f198ae2b5aff579fadb5.jpg",
                            "type": "image",
                        },
                    ],
                    "totalLike": 564,
                    "totalComment": 86,
                    "totalReposts": 8,
                    "totalShare": 78,
                    "timeCreate": "2025-07-21T14:35:00+07:00",
                }
            },
            {
                "feed": {
                    "id": "y324952934u8203nmu5",
                    "content":
                        "Ê ý là tui cũng ko xấu , ngoại hình ưa nhìn mà thế nào ế tận 5 năm vậy trời 😭 Trời ơi tôi muốn có ny 😔",
                    "tag": "Gernang",
                    "listImages": [
                        {
                            "url": "https://i.pinimg.com/736x/31/91/ae/3191ae5125b68ccc4de96820e62fc8dc.jpg",
                            "type": "image",
                        },
                        {
                            "url": "https://i.pinimg.com/736x/53/d2/0c/53d20cdf8569c45655ef6e039f237691.jpg",
                            "type": "image",
                        },
                        {
                            "url": "https://i.pinimg.com/736x/cd/5e/2b/cd5e2bd8964a72355fe76c04c51623c3.jpg",
                            "type": "image",
                        }
                    ],
                    "totalLike": 564,
                    "totalComment": 86,
                    "totalReposts": 8,
                    "totalShare": 78,
                    "timeCreate": "2025-07-21T14:35:00+07:00",
                }
            }
        ]
    })
});

router.route("/repost/:feed_id").get((req, res) => {
    const feedId = req.params.feed_id;
    res.send({
        "isError": false,
        "message": "Đã đăng lại: " + feedId,
    })
});

router.route("/FeedDetail/:feed_id").get((req, res) => {
    const feedId = req.params.feed_id;
    res.send({
        "isError": false,
        "message": "Lấy thông tin thành công",
        "data": {
            "feed": {
                "id": "y324952934u8203u5",
                "content":
                    "Ê ý là tui cũng ko xấu , ngoại hình ưa nhìn mà thế nào ế tận 5 năm vậy trời 😭 Trời ơi tôi muốn có ny 😔",
                "tag": "Gernang",
                "listImages": [
                    {
                        "url": "https://i.pinimg.com/736x/31/91/ae/3191ae5125b68ccc4de96820e62fc8dc.jpg",
                        "type": "image",
                    },
                    {
                        "url": "https://i.pinimg.com/736x/53/d2/0c/53d20cdf8569c45655ef6e039f237691.jpg",
                        "type": "image",
                    },
                    {
                        "url": "https://i.pinimg.com/736x/cd/5e/2b/cd5e2bd8964a72355fe76c04c51623c3.jpg",
                        "type": "image",
                    },
                    {
                        "url": "https://i.pinimg.com/736x/39/b5/cf/39b5cfd220b1f198ae2b5aff579fadb5.jpg",
                        "type": "image",
                    },
                ],
                "totalLike": 564,
                "totalComment": 86,
                "totalReposts": 8,
                "totalShare": 78,
                "commentOfPost": null,
                "timeCreate": "2025-07-21T14:35:00+07:00",
            },
            "feedOwner": {
                "username": "minhanh_02k",
                "id": "akjndkfaksdbfasbdfkasbdfkj"
            },
            "listComments": [
                {
                    "feed": {
                        "id": "y324952934u820jhbjh3u5",
                        "content":
                            "Ê ý là tui cũng ko xấu , ngoại hình ưa nhìn mà thế nào ế tận 5 năm vậy trời 😭 Trời ơi tôi muốn có ny 😔",
                        "tag": "Gernang",
                        "listImages": [],
                        "totalLike": 564,
                        "totalComment": 86,
                        "totalReposts": 8,
                        "totalShare": 78,
                        "commentOfPost": "y324952934u8203u5",
                        "timeCreate": "2025-07-21T14:35:00+07:00",
                    },
                    "feedOwner": {
                        "username": "minhanh_02k22",
                        "id": "akjndkfaksdbfasbdfkasbdfkj"
                    },
                },
                {
                    "feed": {
                        "id": "y324952934u8203u5",
                        "content":
                            "Bà đẹp lắm",
                        "tag": "Gernang",
                        "listImages": [],
                        "totalLike": 564,
                        "totalComment": 86,
                        "totalReposts": 8,
                        "totalShare": 78,
                        "commentOfPost": "y324952934u8203u5",
                        "timeCreate": "2025-07-21T14:35:00+07:00",
                    },
                    "feedOwner": {
                        "username": "minhanh_02k11",
                        "id": "akjndkfaksdbfasbdfkasbdfkj"
                    },
                },
                {
                    "feed": {
                        "id": "y324952934u8203u5",
                        "content":
                            "Ê ý là tui cũng ko xấu , ngoại hình ưa nhìn mà thế nào ế tận 5 năm vậy trời 😭 Trời ơi tôi muốn có ny 😔",
                        "tag": "Gernang",
                        "listImages": [
                            {
                                "url": "https://i.pinimg.com/736x/39/b5/cf/39b5cfd220b1f198ae2b5aff579fadb5.jpg",
                                "type": "image",
                            },
                        ],
                        "totalLike": 564,
                        "totalComment": 86,
                        "totalReposts": 8,
                        "totalShare": 78,
                        "commentOfPost": "y324952934u8203u5",
                        "timeCreate": "2025-07-21T14:35:00+07:00",
                    },
                    "feedOwner": {
                        "username": "minhanh_02k",
                        "id": "akjndkfaksdbfasbdfkasbdfkj"
                    },
                }
            ]

        }
    })
}),

    router.route("/ListFeeds").get((req, res) => {
        res.send({
            "isError": false,
            "message": "Lấy danh sách bài viết thành công",
            "data": [
                {
                    "feed": {
                        "id": "y324952934u8203u5",
                        "content":
                            "Ê ý là tui cũng ko xấu , ngoại hình ưa nhìn mà thế nào ế tận 5 năm vậy trời 😭 Trời ơi tôi muốn có ny 😔",
                        "tag": "Gernang",
                        "listImages": [
                            {
                                "url": "https://i.pinimg.com/736x/31/91/ae/3191ae5125b68ccc4de96820e62fc8dc.jpg",
                                "type": "image",
                            },
                            {
                                "url": "https://i.pinimg.com/736x/53/d2/0c/53d20cdf8569c45655ef6e039f237691.jpg",
                                "type": "image",
                            },
                            {
                                "url": "https://i.pinimg.com/736x/cd/5e/2b/cd5e2bd8964a72355fe76c04c51623c3.jpg",
                                "type": "image",
                            },
                            {
                                "url": "https://i.pinimg.com/736x/39/b5/cf/39b5cfd220b1f198ae2b5aff579fadb5.jpg",
                                "type": "image",
                            },
                        ],
                        "totalLike": 564,
                        "totalComment": 86,
                        "totalReposts": 8,
                        "totalShare": 78,
                        "commentOfPost": null,
                        "timeCreate": "2025-07-21T14:35:00+07:00",
                    },
                    "feedOwner": {
                        "username": "minhanh_02k",
                        "id": "akjndkfaksdbfasbdfkasbdfkj"
                    }
                },
                {
                    "feed": {
                        "id": "y324952934u8203u5",
                        "content":
                            "Ê ý là tui cũng ko xấu , ngoại hình ưa nhìn mà thế nào ế tận 5 năm vậy trời 😭 Trời ơi tôi muốn có ny 😔",
                        "tag": "Gernang",
                        "listImages": [
                            {
                                "url": "https://i.pinimg.com/736x/31/91/ae/3191ae5125b68ccc4de96820e62fc8dc.jpg",
                                "type": "image",
                            },
                            {
                                "url": "https://i.pinimg.com/736x/53/d2/0c/53d20cdf8569c45655ef6e039f237691.jpg",
                                "type": "image",
                            },
                            {
                                "url": "https://i.pinimg.com/736x/cd/5e/2b/cd5e2bd8964a72355fe76c04c51623c3.jpg",
                                "type": "image",
                            },
                            {
                                "url": "https://i.pinimg.com/736x/39/b5/cf/39b5cfd220b1f198ae2b5aff579fadb5.jpg",
                                "type": "image",
                            },
                        ],
                        "totalLike": 564,
                        "totalComment": 86,
                        "totalReposts": 8,
                        "totalShare": 78,
                        "commentOfPost": null,
                        "timeCreate": "2025-07-21T14:35:00+07:00",
                    },
                    "feedOwner": {
                        "username": "minhanh_02k",
                        "id": "akjndkfaksdbfasbdfkasbdfkj"
                    }
                }
            ]
        })
    })

module.exports = router;
