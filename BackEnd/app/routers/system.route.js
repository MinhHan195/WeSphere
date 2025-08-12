const express = require("express");


const router = express.Router();

router.route("/report_error").post((req, res) => {
    res.send({
        "isError": false,
        "message": "Đã gửi báo cáo về hệ thống",
    })
})

module.exports = router;