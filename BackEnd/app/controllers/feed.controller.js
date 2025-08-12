const feedService = require("../services/feed.service");

exports.createFeed = async (req, res, next) => {
    try {
        const data = req.body;
        data.listImageTmp = JSON.parse(data.listImageTmp);
        const mediaFiles = req.files;
        const username = req.user.UserName;
        const feedData = await feedService.createFeed(data, mediaFiles, username);
        if (feedData === true) {
            return res.send({
                isError: false,
                message: "Tạo bài viết thành công",
            });
        }

    } catch (error) {
        console.log(error);
        return next(error);
    }
};


exports.likeHandler = async (req, res, next) => {
    try {
        const { mode, feedId } = req.params;
        const username = req.user.UserName;
        const result = await feedService.likeFeed(mode, feedId, username);
        if (result) {
            return res.send({
                isError: false,
                message: mode
            });
        }

    } catch (error) {
        console.log(error);
        return next(error);
    }
};

exports.getListFeeds = async (req, res, next) => {
    try {
        const username = req.user.UserName;
        const feeds = await feedService.getListFeeds(username);
        return res.send({
            isError: false,
            message: "Lấy danh sách bài viết thành công",
            data: feeds
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

exports.rePost = async (req, res, next) => {
    try {
        const feedId = req.params.feed_id;
        const mode = req.params.mode;
        const username = req.user.UserName;
        const result = await feedService.rePostFeed(feedId, username, mode);
        if (result) {
            return res.send({
                isError: false,
                message: "Đã đăng lại: " + feedId,
            });
        }

    } catch (error) {
        console.log(error);
        return next(error);
    }
}

exports.getSavedFeeds = async (req, res, next) => {
    try {
        const username = req.params.username;
        const savedFeeds = await feedService.getSavedFeeds(username);
        return res.send({
            isError: false,
            message: "Lấy danh sách bài viết đã lưu thành công",
            data: savedFeeds
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}