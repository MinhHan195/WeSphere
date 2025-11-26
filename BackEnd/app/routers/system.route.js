const express = require("express");
const upload = require("../middleware/multerMediaMiddleware");
const systemController = require("../controllers/system.controller");
const { verifyToken } = require("../middleware/authMiddleware");


const router = express.Router();

router.route("/report_error").post(verifyToken, upload.single("file"), systemController.createReport);

module.exports = router;