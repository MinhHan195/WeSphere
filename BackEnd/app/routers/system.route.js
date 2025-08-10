const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/report_error").post(verifyToken, (req, res) => {
    res.send({
        "isError": false,
        "message": "Đã gửi báo cáo về hệ thống",
    })
})

module.exports = router;