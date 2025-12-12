const express = require("express");
const feedController = require("../controllers/feed.controller");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMediaMiddleware");
const router = express.Router();

router.route("/create").post(verifyToken, upload.array("file[]", 10), feedController.createFeed);

router.route("/like/:mode/:feedId").get(verifyToken, feedController.likeHandler);

router.route("/ListFeeds").get(verifyToken, feedController.getListFeeds);

router.route("/repost/:feed_id/:mode").get(verifyToken, feedController.rePost)

router.route("/saves/:username").get(feedController.getSavedFeeds);

router.route("/FeedDetail/:feed_id").get(verifyToken, feedController.getFeedDetail);

router.route("/ListFeeds/:userId").get(verifyToken, feedController.getListFeedsByUser);

router.route("/ListMedias/:userId").get(verifyToken, feedController.getListMediasByUser);

router.route("/ListRePosts/:userId").get(verifyToken, feedController.getListRePostsByUser);

router.route("/ListFavoritePost").get(verifyToken, feedController.getListFavoritePost);

router.route("/ListSavedPost").get(verifyToken, feedController.getListSavePost);

router.route("/SaveFeed/:feedId").get(verifyToken, feedController.saveFeed);

router.route("/UnSaveFeed/:feedId").get(verifyToken, feedController.unSaveFeed);

router.route("/DeleteFeed/:feedId").get(verifyToken, feedController.deleteFeed);

module.exports = router;
