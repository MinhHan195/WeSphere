const express = require("express");

const router = express.Router();

router.route("/login")
    .post((req, res) => {
        res.status(400).json({
            "isError": true,
            "errors": {
                "exceptionMessage": "Lấy token không thành công. Tài khoản hanminhnguyen19052003kl không tồn tại trong hệ thống."
            }
        })
        // res.send({
        //     "isError": false,
        //     "message": "Lấy token thành công",
        //     "result": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaGFubWluaG5ndXllbjE5MDUyMDAzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3R1ZGVudCIsIklkIjoiYTQ4ZDg5NTctYzZiMy00NDE1LWE2NGMtMDhkZDkxMmJkMjgzIiwiVXNlck5hbWUiOiJoYW5taW5obmd1eWVuMTkwNTIwMDMiLCJSb2xlIjoiU3R1ZGVudCIsIk5hbWUiOiJOZ3V54buFbiBNaW5oIEjDom4iLCJBdmF0YXIiOiJmc2Znc2Rnc2dmZ3Nmc2ciLCJleHAiOjE3NTQ5NTUwMTUsImlzcyI6IlRheSBEbyBTZWN1cml0eSBBUEkiLCJhdWQiOiJUYXkgRG8gQ2xpZW50IEFwcCJ9.4qGGVgzmWSLfCyyCDVpqqjCsi9ZtmG8yCl-vOPV6Qt4"
        // });
    })
router.route("/login/facebook")
    .post((req, res) => {
        res.send({
            "isError": false,
            "message": "Đăng nhập bằng Facebook thành công",
            "result": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaGFubWluaG5ndXllbjE5MDUyMDAzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3R1ZGVudCIsIklkIjoiYTQ4ZDg5NTctYzZiMy00NDE1LWE2NGMtMDhkZDkxMmJkMjgzIiwiVXNlck5hbWUiOiJoYW5taW5obmd1eWVuMTkwNTIwMDMiLCJSb2xlIjoiU3R1ZGVudCIsIk5hbWUiOiJOZ3V54buFbiBNaW5oIEjDom4iLCJBdmF0YXIiOiJmc2Znc2Rnc2dmZ3Nmc2ciLCJleHAiOjE3NTQ5NTUwMTUsImlzcyI6IlRheSBEbyBTZWN1cml0eSBBUEkiLCJhdWQiOiJUYXkgRG8gQ2xpZW50IEFwcCJ9.4qGGVgzmWSLfCyyCDVpqqjCsi9ZtmG8yCl-vOPV6Qt4"
        });
    });

module.exports = router;
