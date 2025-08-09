const express = require("express");
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.route("/login").post((req, res) => {
    // res.status(400).json({
    //     "isError": true,
    //     "errors": {
    //         "exceptionMessage": "Lấy token không thành công. Tài khoản hanminhnguyen19052003kl không tồn tại trong hệ thống."
    //     }
    // })
    res.send({
        "isError": false,
        "message": "Lấy token thành công",
        "result": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaGFubWluaG5ndXllbjE5MDUyMDAzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3R1ZGVudCIsIklkIjoiYTQ4ZDg5NTctYzZiMy00NDE1LWE2NGMtMDhkZDkxMmJkMjgzIiwiVXNlck5hbWUiOiJoYW5taW5obmd1eWVuMTkwNTIwMDMiLCJSb2xlIjoiU3R1ZGVudCIsIk5hbWUiOiJOZ3V54buFbiBNaW5oIEjDom4iLCJBdmF0YXIiOiJmc2Znc2Rnc2dmZ3Nmc2ciLCJleHAiOjE3NTQ5NTUwMTUsImlzcyI6IlRheSBEbyBTZWN1cml0eSBBUEkiLCJhdWQiOiJUYXkgRG8gQ2xpZW50IEFwcCJ9.4qGGVgzmWSLfCyyCDVpqqjCsi9ZtmG8yCl-vOPV6Qt4"
    });
});

router.route("/login/facebook").post((req, res) => {
    res.send({
        "isError": false,
        "message": "Đăng nhập bằng Facebook thành công",
        "result": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaGFubWluaG5ndXllbjE5MDUyMDAzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3R1ZGVudCIsIklkIjoiYTQ4ZDg5NTctYzZiMy00NDE1LWE2NGMtMDhkZDkxMmJkMjgzIiwiVXNlck5hbWUiOiJoYW5taW5obmd1eWVuMTkwNTIwMDMiLCJSb2xlIjoiU3R1ZGVudCIsIk5hbWUiOiJOZ3V54buFbiBNaW5oIEjDom4iLCJBdmF0YXIiOiJmc2Znc2Rnc2dmZ3Nmc2ciLCJleHAiOjE3NTQ5NTUwMTUsImlzcyI6IlRheSBEbyBTZWN1cml0eSBBUEkiLCJhdWQiOiJUYXkgRG8gQ2xpZW50IEFwcCJ9.4qGGVgzmWSLfCyyCDVpqqjCsi9ZtmG8yCl-vOPV6Qt4"
    });
});

router.route("/update").put(upload.none(), (req, res) => {
    try {
        const userData = req.body;
        // Simulate updating user data
        console.log(req.file)
        res.send({
            "isError": false,
            "message": "Cập nhật thông tin người dùng thành công",
            "result": userData
        });
    } catch (error) {
        console.log(error);
    }

});

router.route("/GetProfileData/:username").get((req, res) => {
    res.send({
        "isError": false,
        "message": "Lấy thông tin người dùng thành công",
        "data": {
            "id": 'jaksdaknfk   ajlndfkajdsnf',
            "username": 'mh.minh_han',
            "followers": 1,
            "following": 0,
            "bio": 'Chào mừng bạn đến với nhật ký của tôi',
            "fullname": 'Minh Hân',
            "email": 'mh.minh_han@example.com',
            "privateMode": false,
            "phone": '0123456789',
            "gender": 'Nam',
            "isFollowing": false,
            "avatar": 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
            "listLinks": [
                {
                    "title": "facebook",
                    "url": "https://www.facebook.com/minh.han195/"
                },
                {
                    "title": "tiktok",
                    "url": "https://www.tiktok.com/@min.hyun195"
                },
                {
                    "title": "threads",
                    "url": "https://www.threads.com/@mh.minh_han"
                },
                {
                    "title": "threads",
                    "url": "https://www.threads.com/@mh.minh_han"
                }
            ]

        }
    })
});

router.route("/updatePrivateMode/:userId/:privateMode").patch((req, res) => {
    const { userId, privateMode } = req.params;
    if (!userId || privateMode === undefined) {
        return res.status(400).json({ isError: true, message: "User ID and private mode are required" });
    }
    // Simulate updating private mode
    res.send({
        "isError": false,
        "data": { userId, privateMode: privateMode === 'true' }
    });
});

router.route("/isAlive").post((req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ isError: true, message: "User ID is required" });
    }
    // Simulate checking if user is alive
    res.sendStatus(200); // Tương đương với res.status(200).end();
});

router.route("/updateOnlineStatus/:userId/:onlineStatus").patch((req, res) => {
    const { userId, onlineStatus } = req.params;
    if (!userId || onlineStatus === undefined) {
        return res.status(400).json({ isError: true, message: "User ID and online status are required" });
    }
    // Simulate updating online status
    res.send({
        "isError": false,
        "message": "Cập nhật thành công",
        "data": { onlineStatus: onlineStatus }
    });
});

router.route("/ListUserBlock/:userId").get((req, res) => {
    res.send({
        "isError": false,
        "data": [
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            }
        ]
    })
});

router.route("/ListUserLimit/:userId").get((req, res) => {
    res.send({
        "isError": false,
        "data": [
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            }, {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            }
        ]
    })
});

router.route("/removeLimitedUser/:limitedUserId/:ownerUserId").patch((req, res) => {
    res.send({
        "isError": false,
        "message": "Xóa người dùng khỏi danh sách hạn chế thành công",
        "data": [
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
        ]
    })
});

router.route("/removeBlockedUser/:blockedUserId/:ownerUserId").patch((req, res) => {
    res.send({
        "isError": false,
        "message": "Xóa người dùng khỏi danh sách chặn thành công",
        "data": [
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
            {
                "id": "iahidsbfkjasdfka",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                "username": "mh.minh_han",
                "fullname": "minh han"
            },
        ]
    })
});

router.route("/deleteAccount").delete((req, res) => {
    res.send({
        "isError": false,
        "message": "Xóa tài khoản thành công",
        "data": req.body
    })
})

router.route("/deactivateAccount/:userId").patch((req, res) => {
    res.send({
        "isError": false,
        "message": "Vô hiệu hóa tài khoản thành công",
    })
});

module.exports = router;
