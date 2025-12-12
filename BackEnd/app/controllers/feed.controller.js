const feedService = require("../services/feed.service");

exports.createFeed = async (req, res, next) => {
    try {
        let data = req.body;
        // console.log(data);
        data.listImageTmp = JSON.parse(data.listImageTmp);
        const mediaFiles = req.files;
        data.userId = req.user.UserId;
        const feedData = await feedService.createFeed(data, mediaFiles);
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
        const userId = req.user.UserId;
        const result = await feedService.likeFeed(mode, feedId, userId);
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
        const userId = req.user.UserId;
        const index = req.query.index || 0;
        const feeds = await feedService.getListFeeds(userId, index);
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
        const userId = req.user.UserId;
        const result = await feedService.rePostFeed(feedId, userId, mode);
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

exports.getFeedDetail = async (req, res, next) => {
    try {
        const feedId = req.params.feed_id;
        const userId = req.user.UserId;
        const feedDetail = await feedService.getFeedDetail(feedId, userId);
        return res.send({
            isError: false,
            message: "Lấy thông tin bài viết thành công",
            data: feedDetail
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

exports.getListFeedsByUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const ownerUserId = req.user.UserId;
        const feeds = await feedService.getListFeedsByUser(userId, ownerUserId);
        return res.send({
            isError: false,
            message: "Lấy danh sách bài viết của người dùng thành công",
            data: feeds
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

exports.getListMediasByUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const ownerUserId = req.user.UserId;
        const medias = await feedService.getListMediasByUser(userId, ownerUserId);
        return res.send({
            isError: false,
            message: "Lấy danh sách media của người dùng thành công",
            data: medias
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

exports.getListRePostsByUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const ownerUserId = req.user.UserId;
        const rePosts = await feedService.getListRePostsByUser(userId, ownerUserId);
        return res.send({
            isError: false,
            message: "Lấy danh sách bài viết đã repost của người dùng thành công",
            data: rePosts
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

exports.getListFavoritePost = async (req, res, next) => {
    try {
        const userId = req.user.UserId;
        const favoritePosts = await feedService.getListFavoritePostsByUser(userId);
        return res.send({
            isError: false,
            message: "Lấy danh sách bài viết yêu thích của người dùng thành công",
            data: favoritePosts
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

exports.getListSavePost = async (req, res, next) => {
    try {
        const userId = req.user.UserId;
        const savedPosts = await feedService.getListSavedPostsByUser(userId);
        return res.send({
            isError: false,
            message: "Lấy danh sách bài viết đã lưu của người dùng thành công",
            data: savedPosts
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

exports.saveFeed = async (req, res, next) => {
    try {
        const userId = req.user.UserId;
        const { feedId } = req.params;
        const result = await feedService.saveFeed(feedId, userId);
        return res.send({
            isError: false,
            message: "Luư trữ bài viết thành công",
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

exports.unSaveFeed = async (req, res, next) => {
    try {
        const userId = req.user.UserId;
        const { feedId } = req.params;
        const result = await feedService.unSaveFeed(feedId, userId);
        return res.send({
            isError: false,
            message: "Hủy lưu bài viết",
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

exports.deleteFeed = async (req, res, next) => {
    try {
        const userId = req.user.UserId;
        const { feedId } = req.params;
        const result = await feedService.deleteFeed(feedId, userId);
        return res.send({
            isError: false,
            message: "Xóa bài viết thành công",
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}