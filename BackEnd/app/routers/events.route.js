const express = require("express");
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.route("/").get((req, res) => {
    res.setHeader('Content-Type', 'text/event-stream'); // bắt buộc
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    // Gửi ping mỗi 10s để giữ kết nối
    const ping = setInterval(() => {
        res.write(`event: ping\ndata: {}\n\n`);
    }, 10000);

    // Gửi dữ liệu thông báo sau 3s (mô phỏng)
    // setTimeout(() => {
    //     res.write(`event: notification\ndata: {"message": "Bạn có thông báo mới!"}\n\n`);
    // }, 3000);

    // setTimeout(() => {
    //     res.write(`event: notification\ndata: {"message": "Bạn có thông báo mới!"}\n\n`);
    // }, 7000);

    // Cleanup nếu user ngắt kết nối
    req.on('close', () => {
        clearInterval(ping);
        res.end();
    });
});

module.exports = router;

