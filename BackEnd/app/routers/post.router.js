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
                    "content": {
                        "root": {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": "Có gì đó hay ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "mention",
                                            "id": 0,
                                            "name": "Nguyễn Văn A",
                                            "username": "nguyenvana"
                                        },
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": " hả ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "autoLink",
                                            "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "id": 0
                                        }
                                    ],
                                    "direction": "ltr",
                                    "format": "",
                                    "indent": 0,
                                    "type": "paragraph",
                                    "version": 1,
                                    "textFormat": 0,
                                    "textStyle": ""
                                }
                            ],
                            "direction": "ltr",
                            "format": "",
                            "indent": 0,
                            "type": "root",
                            "version": 1
                        }
                    },
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
                    "content": {
                        "root": {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": "Có gì đó hay ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "mention",
                                            "id": 0,
                                            "name": "Nguyễn Văn A",
                                            "username": "nguyenvana"
                                        },
                                        {
                                            "type": "autoLink",
                                            "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "id": 0
                                        }
                                    ],
                                    "direction": "ltr",
                                    "format": "",
                                    "indent": 0,
                                    "type": "paragraph",
                                    "version": 1,
                                    "textFormat": 0,
                                    "textStyle": ""
                                }
                            ],
                            "direction": "ltr",
                            "format": "",
                            "indent": 0,
                            "type": "root",
                            "version": 1
                        }
                    },
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
                "content": {
                    "root": {
                        "children": [
                            {
                                "children": [
                                    {
                                        "detail": 0,
                                        "format": 0,
                                        "mode": "normal",
                                        "style": "",
                                        "text": "Có gì đó hay ",
                                        "type": "text",
                                        "version": 1
                                    },
                                    {
                                        "type": "mention",
                                        "id": 0,
                                        "name": "Nguyễn Văn A",
                                        "username": "nguyenvana"
                                    },
                                    {
                                        "detail": 0,
                                        "format": 0,
                                        "mode": "normal",
                                        "style": "",
                                        "text": " hả ",
                                        "type": "text",
                                        "version": 1
                                    },
                                    {
                                        "type": "autoLink",
                                        "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                        "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                        "id": 0
                                    }
                                ],
                                "direction": "ltr",
                                "format": "",
                                "indent": 0,
                                "type": "paragraph",
                                "version": 1,
                                "textFormat": 0,
                                "textStyle": ""
                            }
                        ],
                        "direction": "ltr",
                        "format": "",
                        "indent": 0,
                        "type": "root",
                        "version": 1
                    }
                },
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
                        "id": "y3249529as34u820jhbjh3u5",
                        "content": {
                            "root": {
                                "children": [
                                    {
                                        "children": [
                                            {
                                                "detail": 0,
                                                "format": 0,
                                                "mode": "normal",
                                                "style": "",
                                                "text": "Có gì đó hay ",
                                                "type": "text",
                                                "version": 1
                                            },
                                            {
                                                "type": "mention",
                                                "id": 0,
                                                "name": "Nguyễn Văn A",
                                                "username": "nguyenvana"
                                            },
                                            {
                                                "detail": 0,
                                                "format": 0,
                                                "mode": "normal",
                                                "style": "",
                                                "text": " hả ",
                                                "type": "text",
                                                "version": 1
                                            },
                                            {
                                                "type": "autoLink",
                                                "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                                "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                                "id": 0
                                            }
                                        ],
                                        "direction": "ltr",
                                        "format": "",
                                        "indent": 0,
                                        "type": "paragraph",
                                        "version": 1,
                                        "textFormat": 0,
                                        "textStyle": ""
                                    }
                                ],
                                "direction": "ltr",
                                "format": "",
                                "indent": 0,
                                "type": "root",
                                "version": 1
                            }
                        },
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
                        "id": "y32495293sdf4u8203u5",
                        "content": {
                            "root": {
                                "children": [
                                    {
                                        "children": [
                                            {
                                                "detail": 0,
                                                "format": 0,
                                                "mode": "normal",
                                                "style": "",
                                                "text": "Có gì đó hay ",
                                                "type": "text",
                                                "version": 1
                                            },
                                            {
                                                "type": "mention",
                                                "id": 0,
                                                "name": "Nguyễn Văn A",
                                                "username": "nguyenvana"
                                            },
                                            {
                                                "detail": 0,
                                                "format": 0,
                                                "mode": "normal",
                                                "style": "",
                                                "text": " hả ",
                                                "type": "text",
                                                "version": 1
                                            },
                                            {
                                                "type": "autoLink",
                                                "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                                "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                                "id": 0
                                            }
                                        ],
                                        "direction": "ltr",
                                        "format": "",
                                        "indent": 0,
                                        "type": "paragraph",
                                        "version": 1,
                                        "textFormat": 0,
                                        "textStyle": ""
                                    }
                                ],
                                "direction": "ltr",
                                "format": "",
                                "indent": 0,
                                "type": "root",
                                "version": 1
                            }
                        },
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
                        "id": "y3249529dsf34u8203u5",
                        "content": {
                            "root": {
                                "children": [
                                    {
                                        "children": [
                                            {
                                                "detail": 0,
                                                "format": 0,
                                                "mode": "normal",
                                                "style": "",
                                                "text": "Có gì đó hay ",
                                                "type": "text",
                                                "version": 1
                                            },
                                            {
                                                "type": "mention",
                                                "id": 0,
                                                "name": "Nguyễn Văn A",
                                                "username": "nguyenvana"
                                            },
                                            {
                                                "detail": 0,
                                                "format": 0,
                                                "mode": "normal",
                                                "style": "",
                                                "text": " hả ",
                                                "type": "text",
                                                "version": 1
                                            },
                                            {
                                                "type": "autoLink",
                                                "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                                "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                                "id": 0
                                            }
                                        ],
                                        "direction": "ltr",
                                        "format": "",
                                        "indent": 0,
                                        "type": "paragraph",
                                        "version": 1,
                                        "textFormat": 0,
                                        "textStyle": ""
                                    }
                                ],
                                "direction": "ltr",
                                "format": "",
                                "indent": 0,
                                "type": "root",
                                "version": 1
                            }
                        },
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
                        "content": {
                            "root": {
                                "children": [
                                    {
                                        "children": [
                                            {
                                                "detail": 0,
                                                "format": 0,
                                                "mode": "normal",
                                                "style": "",
                                                "text": "Có gì đó hay ",
                                                "type": "text",
                                                "version": 1
                                            },
                                            {
                                                "type": "mention",
                                                "id": 0,
                                                "name": "Nguyễn Văn A",
                                                "username": "nguyenvana"
                                            },
                                            {
                                                "detail": 0,
                                                "format": 0,
                                                "mode": "normal",
                                                "style": "",
                                                "text": " hả ",
                                                "type": "text",
                                                "version": 1
                                            },
                                            {
                                                "type": "autoLink",
                                                "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                                "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                                "id": 0
                                            }
                                        ],
                                        "direction": "ltr",
                                        "format": "",
                                        "indent": 0,
                                        "type": "paragraph",
                                        "version": 1,
                                        "textFormat": 0,
                                        "textStyle": ""
                                    }
                                ],
                                "direction": "ltr",
                                "format": "",
                                "indent": 0,
                                "type": "root",
                                "version": 1
                            }
                        },
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
                    },
                    "feedOwner": {
                        "username": "minhanh_02k",
                        "id": "akjndkfaksdbfasbdfkasbdfkj",
                        "isOnline": true
                    }
                },
                {
                    "feed": {
                        "id": "y324952dsf934u8203u5",
                        "content": {
                            "root": {
                                "children": [
                                    {
                                        "children": [
                                            {
                                                "detail": 0,
                                                "format": 0,
                                                "mode": "normal",
                                                "style": "",
                                                "text": "Có gì đó hay ",
                                                "type": "text",
                                                "version": 1
                                            },
                                            {
                                                "type": "mention",
                                                "id": 0,
                                                "name": "Nguyễn Văn A",
                                                "username": "nguyenvana"
                                            },
                                            {
                                                "detail": 0,
                                                "format": 0,
                                                "mode": "normal",
                                                "style": "",
                                                "text": " hả ",
                                                "type": "text",
                                                "version": 1
                                            },
                                            {
                                                "type": "autoLink",
                                                "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                                "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                                "id": 0
                                            }
                                        ],
                                        "direction": "ltr",
                                        "format": "",
                                        "indent": 0,
                                        "type": "paragraph",
                                        "version": 1,
                                        "textFormat": 0,
                                        "textStyle": ""
                                    }
                                ],
                                "direction": "ltr",
                                "format": "",
                                "indent": 0,
                                "type": "root",
                                "version": 1
                            }
                        },
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
                    },
                    "feedOwner": {
                        "username": "minhanh_02k",
                        "id": "akjndkfaksdbfasbdfkasbdfkj"
                    }
                },
            ]
        })
    });

router.route("/ListFeeds/User").get((req, res) => {
    res.send({
        "isError": false,
        "message": "Lấy danh sách bài viết thành công",
        "data": [
            {
                "feed": {
                    "id": "y324952934afsfu8203u5",
                    "content": {
                        "root": {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": "Có gì đó hay ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "mention",
                                            "id": 0,
                                            "name": "Nguyễn Văn A",
                                            "username": "nguyenvana"
                                        },
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": " hả ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "autoLink",
                                            "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "id": 0
                                        }
                                    ],
                                    "direction": "ltr",
                                    "format": "",
                                    "indent": 0,
                                    "type": "paragraph",
                                    "version": 1,
                                    "textFormat": 0,
                                    "textStyle": ""
                                }
                            ],
                            "direction": "ltr",
                            "format": "",
                            "indent": 0,
                            "type": "root",
                            "version": 1
                        }
                    },
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
                    "id": "y324952934uzcz8203u5",
                    "content": {
                        "root": {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": "Có gì đó hay ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "mention",
                                            "id": 0,
                                            "name": "Nguyễn Văn A",
                                            "username": "nguyenvana"
                                        },
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": " hả ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "autoLink",
                                            "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "id": 0
                                        }
                                    ],
                                    "direction": "ltr",
                                    "format": "",
                                    "indent": 0,
                                    "type": "paragraph",
                                    "version": 1,
                                    "textFormat": 0,
                                    "textStyle": ""
                                }
                            ],
                            "direction": "ltr",
                            "format": "",
                            "indent": 0,
                            "type": "root",
                            "version": 1
                        }
                    },
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
});

router.route("/ListMedias/User").get((req, res) => {
    res.send({
        "isError": false,
        "message": "Lấy danh sách bài viết thành công",
        "data": [
            {
                "feed": {
                    "id": "y324952934afsfu8203u5",
                    "content": {
                        "root": {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": "Có gì đó hay ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "mention",
                                            "id": 0,
                                            "name": "Nguyễn Văn A",
                                            "username": "nguyenvana"
                                        },
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": " hả ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "autoLink",
                                            "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "id": 0
                                        }
                                    ],
                                    "direction": "ltr",
                                    "format": "",
                                    "indent": 0,
                                    "type": "paragraph",
                                    "version": 1,
                                    "textFormat": 0,
                                    "textStyle": ""
                                }
                            ],
                            "direction": "ltr",
                            "format": "",
                            "indent": 0,
                            "type": "root",
                            "version": 1
                        }
                    },
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
                    "id": "y324952934uzcz8203u5",
                    "content": {
                        "root": {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": "Có gì đó hay ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "mention",
                                            "id": 0,
                                            "name": "Nguyễn Văn A",
                                            "username": "nguyenvana"
                                        },
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": " hả ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "autoLink",
                                            "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "id": 0
                                        }
                                    ],
                                    "direction": "ltr",
                                    "format": "",
                                    "indent": 0,
                                    "type": "paragraph",
                                    "version": 1,
                                    "textFormat": 0,
                                    "textStyle": ""
                                }
                            ],
                            "direction": "ltr",
                            "format": "",
                            "indent": 0,
                            "type": "root",
                            "version": 1
                        }
                    },
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
});

router.route("/ListRePosts/User").get((req, res) => {
    res.send({
        "isError": false,
        "message": "Lấy danh sách bài viết thành công",
        "data": [
            {
                "userRepost": {
                    "username": "mh.minhhuyn195",
                    "timeCreate": "2025-07-29T14:35:00+07:00"
                },
                "feed": {
                    "id": "y324952934afsfu8203u5",
                    "content": {
                        "root": {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": "Có gì đó hay ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "mention",
                                            "id": 0,
                                            "name": "Nguyễn Văn A",
                                            "username": "nguyenvana"
                                        },
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": " hả ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "autoLink",
                                            "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "id": 0
                                        }
                                    ],
                                    "direction": "ltr",
                                    "format": "",
                                    "indent": 0,
                                    "type": "paragraph",
                                    "version": 1,
                                    "textFormat": 0,
                                    "textStyle": ""
                                }
                            ],
                            "direction": "ltr",
                            "format": "",
                            "indent": 0,
                            "type": "root",
                            "version": 1
                        }
                    },
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
                "userRepost": {
                    "username": "mh.minhhuyn195",
                    "timeCreate": "2025-07-29T14:35:00+07:00"
                },
                "feed": {
                    "id": "y324952934uzcz8203u5",
                    "content": {
                        "root": {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": "Có gì đó hay ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "mention",
                                            "id": 0,
                                            "name": "Nguyễn Văn A",
                                            "username": "nguyenvana"
                                        },
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": " hả ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "autoLink",
                                            "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "id": 0
                                        }
                                    ],
                                    "direction": "ltr",
                                    "format": "",
                                    "indent": 0,
                                    "type": "paragraph",
                                    "version": 1,
                                    "textFormat": 0,
                                    "textStyle": ""
                                }
                            ],
                            "direction": "ltr",
                            "format": "",
                            "indent": 0,
                            "type": "root",
                            "version": 1
                        }
                    },
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

router.route("/ListFavoritePost").get((req, res) => {
    res.send({
        "isError": false,
        "message": "Lấy danh sách bài viết thành công",
        "data": [
            {
                "feed": {
                    "id": "y324952934afsfu8203u5",
                    "content": {
                        "root": {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": "Có gì đó hay ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "mention",
                                            "id": 0,
                                            "name": "Nguyễn Văn A",
                                            "username": "nguyenvana"
                                        },
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": " hả ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "autoLink",
                                            "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "id": 0
                                        }
                                    ],
                                    "direction": "ltr",
                                    "format": "",
                                    "indent": 0,
                                    "type": "paragraph",
                                    "version": 1,
                                    "textFormat": 0,
                                    "textStyle": ""
                                }
                            ],
                            "direction": "ltr",
                            "format": "",
                            "indent": 0,
                            "type": "root",
                            "version": 1
                        }
                    },
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
                    "id": "y324952934uzcz8203u5",
                    "content": {
                        "root": {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": "Có gì đó hay ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "mention",
                                            "id": 0,
                                            "name": "Nguyễn Văn A",
                                            "username": "nguyenvana"
                                        },
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": " hả ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "autoLink",
                                            "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "id": 0
                                        }
                                    ],
                                    "direction": "ltr",
                                    "format": "",
                                    "indent": 0,
                                    "type": "paragraph",
                                    "version": 1,
                                    "textFormat": 0,
                                    "textStyle": ""
                                }
                            ],
                            "direction": "ltr",
                            "format": "",
                            "indent": 0,
                            "type": "root",
                            "version": 1
                        }
                    },
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

router.route("/ListSavedPost").get((req, res) => {
    res.send({
        "isError": false,
        "message": "Lấy danh sách bài viết thành công",
        "data": [
            {
                "feed": {
                    "id": "y324952934afsfu8203u5",
                    "content": {
                        "root": {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": "Có gì đó hay ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "mention",
                                            "id": 0,
                                            "name": "Nguyễn Văn A",
                                            "username": "nguyenvana"
                                        },
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": " hả ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "autoLink",
                                            "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "id": 0
                                        }
                                    ],
                                    "direction": "ltr",
                                    "format": "",
                                    "indent": 0,
                                    "type": "paragraph",
                                    "version": 1,
                                    "textFormat": 0,
                                    "textStyle": ""
                                }
                            ],
                            "direction": "ltr",
                            "format": "",
                            "indent": 0,
                            "type": "root",
                            "version": 1
                        }
                    },
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
                    "id": "y324952934uzcz8203u5",
                    "content": {
                        "root": {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": "Có gì đó hay ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "mention",
                                            "id": 0,
                                            "name": "Nguyễn Văn A",
                                            "username": "nguyenvana"
                                        },
                                        {
                                            "detail": 0,
                                            "format": 0,
                                            "mode": "normal",
                                            "style": "",
                                            "text": " hả ",
                                            "type": "text",
                                            "version": 1
                                        },
                                        {
                                            "type": "autoLink",
                                            "title": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "url": "https://www.youtube.com/watch?v=moZPDhsatLU&list=RDmoZPDhsatLU&start_radio=1",
                                            "id": 0
                                        }
                                    ],
                                    "direction": "ltr",
                                    "format": "",
                                    "indent": 0,
                                    "type": "paragraph",
                                    "version": 1,
                                    "textFormat": 0,
                                    "textStyle": ""
                                }
                            ],
                            "direction": "ltr",
                            "format": "",
                            "indent": 0,
                            "type": "root",
                            "version": 1
                        }
                    },
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
