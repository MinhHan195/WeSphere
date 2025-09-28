const feedService = require("../services/feed.service");

exports.createFeed = async (req, res, next) => {
    try {
        let data = req.body;
        // console.log(data);
        data.listImageTmp = JSON.parse(data.listImageTmp);
        const mediaFiles = req.files;
        data.username = req.user.UserName;
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
        const username = req.user.UserName;
        console.log(mode, feedId, username);
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

exports.getFeedDetail = async (req, res, next) => {
    try {
        const feedId = req.params.feed_id;
        const username = req.user.UserName;
        const feedDetail = await feedService.getFeedDetail(feedId, username);
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
        const username = req.params.username;
        const feeds = await feedService.getListFeedsByUser(username);
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
        const username = req.params.username;

        console.log(username);
        const medias = await feedService.getListMediasByUser(username);
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
        const username = req.params.username;
        const rePosts = await feedService.getListRePostsByUser(username);
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
        const username = req.user.UserName;
        const favoritePosts = await feedService.getListFavoritePostsByUser(username);
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
        const username = req.user.UserName;
        const savedPosts = await feedService.getListSavedPostsByUser(username);
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