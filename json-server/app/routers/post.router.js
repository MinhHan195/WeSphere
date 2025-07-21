const express = require("express");

const router = express.Router();

router.route("/create").post((req, res) => {
    res.send({
        "isError": false,
        "message": "Tạo bài viết thành công",
    })
});

module.exports = router;
