const cloudinaryRepsitory = require("../repository/cloudinary.respository");
const SQL = require("../utils/sqlserver.util");
const feedRepository = require("../repository/feed.repository");
const mediaRepository = require("../repository/media.repository");
const rePostRepository = require("../repository/repost.repository");
const likesRepository = require("../repository/likes.repository");
const fs = require("fs").promises;

exports.createFeed = async (data, mediaFiles) => {
    const CloudinaryRepsitory = new cloudinaryRepsitory();
    const FeedRepository = new feedRepository();
    const MediaRepository = new mediaRepository();
    let listMedia = [];
    for (const file of mediaFiles) {
        const type = file.mimetype.split("/")[0];
        let result;
        if (type === "image") {
            result = await CloudinaryRepsitory.uploadImagePath(file);
        } else if (type === "video") {
            result = await CloudinaryRepsitory.uploadVideoPath(file);
        }
        if (result) {
            result.type = type;
            listMedia.push(result);
            await fs.unlink(file.path);
        }
    }

    if (data.listImageTmp.length > 0) {
        listMedia = [...listMedia, ...data.listImageTmp];
    }

    const feedId = await FeedRepository.createFeed(data);
    for (const media of listMedia) {
        await MediaRepository.addMediaToFeed(feedId, media);
    }

    if (data.id) {
        await MediaRepository.deleteMediaByFeedId(data.id);
        await FeedRepository.deleteFeedById(data.id);
    }
    return true;
};

exports.likeFeed = async (mode, feedId, username) => {
    const LikesRepository = new likesRepository();
    const result = await LikesRepository.likeFeed(mode, feedId, username);
    return result;
};

exports.getListFeeds = async (username) => {
    let listFeeds = [];
    let result = {};
    const FeedRepository = new feedRepository();
    const feeds = await FeedRepository.getListFeeds(username);
    for (const feedItem of feeds) {
        result = await this.getFeed(feedItem.id, feedItem.username);
        listFeeds.push(result);
    }
    return listFeeds.reverse();
};

exports.getFeed = async (feedId, username) => {
    const FeedRepository = new feedRepository();
    const MediaRepository = new mediaRepository();
    const RePostRepository = new rePostRepository();
    const LikesRepository = new likesRepository();
    let results = {};
    const mainFeed = await FeedRepository.getFeedById(feedId);
    if (mainFeed) {
        mainFeed.content = JSON.parse(mainFeed.content);

        const media = await MediaRepository.getListMediasByFeedId(mainFeed.id);
        mainFeed.listImages = media;

        const totalLike = await LikesRepository.getTotalLike(mainFeed.id);
        mainFeed.totalLike = totalLike;

        const totalReposts = await RePostRepository.getTotalRepost(mainFeed.id);
        mainFeed.totalReposts = totalReposts;

        const totalComment = await FeedRepository.getTotalComment(mainFeed.id);
        mainFeed.totalComment = totalComment;
        results.feed = mainFeed;
        const owner = await FeedRepository.getOwner(mainFeed.id);
        const dataOwner = {
            username: owner.dataValues.account.dataValues.username,
            id: owner.dataValues.account.dataValues.user.dataValues.userId,
            isOnline:
                owner.dataValues.account.dataValues.isOnline === 1
                    ? true
                    : false,
            avatar: owner.dataValues.account.dataValues.avatar,
        };
        const isLike = await LikesRepository.isLike(mainFeed.id, username);
        const isRePost = await RePostRepository.isRePost(mainFeed.id, username);
        results.state = {
            isLike: isLike,
            isRePost: isRePost,
        };

        results.feedOwner = dataOwner;
    }

    return results;
};

exports.rePostFeed = async (feedId, username, mode) => {
    const RePostRepository = new rePostRepository();
    let result;
    if (mode === "add") {
        result = await RePostRepository.rePostFeed(feedId, username, mode);
    }
    else if (mode === "minus") {
        result = await RePostRepository.unRePostFeed(feedId, username);
    }
    return result;
};

exports.getSavedFeeds = async (username) => {
    let listFeeds = [];
    const FeedRepository = new feedRepository(SQL.client);
    const MediaRepository = new mediaRepository(SQL.client);
    const feeds = await FeedRepository.getListSaveFeedsByUserName(username);
    for (const feedItem of feeds) {
        feedItem.content = JSON.parse(feedItem.content);
        const media = await MediaRepository.getListMediasByFeedId(feedItem.id);
        feedItem.listImages = media;
        let item = {
            feed: feedItem,
        };
        listFeeds.push(item);
    }
    return listFeeds;
};

exports.getFeedDetail = async (feedId, username) => {
    const FeedRepository = new feedRepository(SQL.client);

    const mainFeed = await this.getFeed(feedId, username);

    const listCommentFeedId = await FeedRepository.getListCommentFeedId(feedId);
    let listComment = [];
    for (const item of listCommentFeedId) {
        const comment = await this.getFeed(item.id, username);
        if (comment) {
            listComment.push(comment);
        }
    }
    mainFeed.listComments = listComment;

    return mainFeed;
};

exports.getListFeedsByUser = async (username) => {
    const FeedRepository = new feedRepository(SQL.client);
    const feeds = await FeedRepository.getListFeedsByUsername(username);
    let listfeed = [];
    for (const item of feeds) {
        const feed = await this.getFeed(item.id, item.username);
        if (feed) {
            listfeed.push(feed);
        }
    }
    return listfeed;
};

exports.getListMediasByUser = async (username) => {
    const MediaRepository = new mediaRepository(SQL.client);
    const medias = await MediaRepository.getListMediasByUserName(username);
    let listFeeds = [];
    for (const item of medias) {
        const feed = await this.getFeed(item.feed_id, username);
        if (feed) {
            listFeeds.push(feed);
        }
    }
    return listFeeds;
};

exports.getListRePostsByUser = async (username) => {
    const RePostRepository = new rePostRepository(SQL.client);
    const repost = await RePostRepository.getListRePostsByUserName(username);
    let listFeeds = [];
    for (const item of repost) {
        const feed = await this.getFeed(item.feedId, username);
        if (feed) {
            const data = {
                userRepost: {
                    username: item.username,
                    timeCreate: item.timeCreate,
                },
                ...feed,
            };
            listFeeds.push(data);
        }
    }
    return listFeeds;
};

exports.getListFavoritePostsByUser = async (username) => {
    const FeedRepository = new feedRepository();
    const favoritePosts = await FeedRepository.getListFavoritePostsByUserName(
        username
    );
    let listFeeds = [];
    console.log(favoritePosts);
    for (const item of favoritePosts) {
        const feed = await this.getFeed(item.id, item.username);
        listFeeds.push(feed);
    }
    return listFeeds;
};

exports.getListSavedPostsByUser = async (username) => {
    const FeedRepository = new feedRepository(SQL.client);
    const savedPosts = await FeedRepository.getListSavedPostsByUserName(
        username
    );
    let listFeeds = [];
    for (const item of savedPosts) {
        const feed = await this.getFeed(item.feedId, username);
        listFeeds.push(feed);
    }
    return listFeeds;
};
