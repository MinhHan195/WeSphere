const express = require("express");
const feedController = require("../controllers/feed.controller");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMediaFeedMiddleware");
const router = express.Router();

router.route("/create").post(verifyToken, upload.array("file[]", 10), feedController.createFeed);

router.route("/like/:mode/:feedId").get(verifyToken, feedController.likeHandler);

router.route("/ListFeeds").get(verifyToken, feedController.getListFeeds);

router.route("/repost/:feed_id/:mode").get(verifyToken, feedController.rePost)

router.route("/saves/:username").get(feedController.getSavedFeeds);

router.route("/FeedDetail/:feed_id").get(verifyToken, feedController.getFeedDetail);

router.route("/ListFeeds/:username").get(verifyToken, feedController.getListFeedsByUser);

router.route("/ListMedias/:username").get(verifyToken, feedController.getListMediasByUser);

router.route("/ListRePosts/:username").get(verifyToken, feedController.getListRePostsByUser);

router.route("/ListFavoritePost").get(verifyToken, feedController.getListFavoritePost);

router.route("/ListSavedPost").get(verifyToken, feedController.getListSavePost);

module.exports = router;
