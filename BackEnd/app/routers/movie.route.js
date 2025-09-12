const express = require("express");
const movieController = require("../controllers/movie.controller");
const { verifyToken } = require("../middleware/authMiddleware");


const router = express.Router();

router.route("/rate").post(verifyToken, movieController.rate);

router.route("/getMovie/:movie_id").get(movieController.getMovie);

module.exports = router;