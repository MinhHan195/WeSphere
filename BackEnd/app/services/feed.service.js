const cloudinaryRepsitory = require("../repository/cloudinary.respository");
const SQL = require("../utils/sqlserver.util");
const feedRepository = require("../repository/feed.repository");
const mediaRepository = require("../repository/media.repository");
const rePostRepository = require("../repository/repost.repository");
const likesRepository = require("../repository/likes.repository");
const accountRepository = require("../repository/account.repository");
const saveFeedRepository = require("../repository/save_feed.repository");
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

exports.likeFeed = async (mode, feedId, userId) => {
    const LikesRepository = new likesRepository();
    const result = await LikesRepository.likeFeed(mode, feedId, userId);
    return result;
};

exports.getListFeeds = async (userId, index) => {
    let listFeeds = [];
    let result = {};
    const FeedRepository = new feedRepository();
    const feeds = await FeedRepository.getListFeeds(userId, index);
    for (const feedItem of feeds) {
        result = await this.getFeed(feedItem.id, feedItem.userId);
        listFeeds.push(result);
    }
    return listFeeds;
};

exports.getFeed = async (feedId, userId) => {
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
            username: owner.account.dataValues.username,
            id: owner.userId,
            isOnline:
                owner.account.dataValues.isOnline === 1
                    ? true
                    : false,
            avatar: owner.account.dataValues.avatar,
        };
        const isLike = await LikesRepository.isLike(mainFeed.id, userId);
        const isRePost = await RePostRepository.isRePost(mainFeed.id, userId);
        results.state = {
            isLike: isLike,
            isRePost: isRePost,
        };

        results.feedOwner = dataOwner;
    }

    return results;
};

exports.rePostFeed = async (feedId, userId, mode) => {
    const RePostRepository = new rePostRepository();
    let result;
    if (mode === "add") {
        result = await RePostRepository.rePostFeed(feedId, userId, mode);
    }
    else if (mode === "minus") {
        result = await RePostRepository.unRePostFeed(feedId, userId);
    }
    return result;
};

exports.getSavedFeeds = async (username) => {
    let listFeeds = [];
    const FeedRepository = new feedRepository();
    const MediaRepository = new mediaRepository();
    const AccountRepository = new accountRepository();
    const userId = await AccountRepository.getUserIdFromUsername(username);
    const feeds = await FeedRepository.getListSaveFeedsByUserId(userId);
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

exports.getFeedDetail = async (feedId, userId) => {
    const FeedRepository = new feedRepository(SQL.client);
    const mainFeed = await this.getFeed(feedId, userId);
    const listCommentFeedId = await FeedRepository.getListCommentFeedId(feedId);
    let listComment = [];
    for (const item of listCommentFeedId) {
        const comment = await this.getFeed(item.id, item.userId);
        listComment.push(comment);
    }
    mainFeed.listComments = listComment;
    return mainFeed;
};

exports.getListFeedsByUser = async (userId) => {
    const FeedRepository = new feedRepository();
    const AccountRepository = new accountRepository();
    // const userId = await AccountRepository.getUsernameFromUserId(userId);
    const feeds = await FeedRepository.getListFeedsByUserId(userId);
    let listfeed = [];
    for (const item of feeds) {
        const feed = await this.getFeed(item.id, item.userId);
        if (feed) {
            listfeed.push(feed);
        }
    }
    return listfeed;
};

exports.getListMediasByUser = async (userId) => {
    const MediaRepository = new mediaRepository();
    const medias = await MediaRepository.getListMediasByUserId(userId);
    let listFeeds = [];
    for (const item of medias) {
        const feed = await this.getFeed(item.feed_id, item.userId);
        if (feed) {
            listFeeds.push(feed);
        }
    }
    return listFeeds;
};

exports.getListRePostsByUser = async (userId) => {
    const RePostRepository = new rePostRepository();
    const repost = await RePostRepository.getListRePostsByUserId(userId);
    let listFeeds = [];
    for (const item of repost) {
        const feed = await this.getFeed(item.feedId, item.userId);
        if (feed) {
            const data = {
                userRepost: {
                    userId: item.userId,
                    timeCreate: item.timeCreate,
                },
                ...feed,
            };
            listFeeds.push(data);
        }
    }
    return listFeeds;
};

exports.getListFavoritePostsByUser = async (userId) => {
    const FeedRepository = new feedRepository();
    const favoritePosts = await FeedRepository.getListFavoritePostsByUserId(
        userId
    );
    let listFeeds = [];
    for (const item of favoritePosts) {
        const feed = await this.getFeed(item.id, item.userId);
        listFeeds.push(feed);
    }
    return listFeeds;
};

exports.getListSavedPostsByUser = async (userId) => {
    const SaveFeedRepository = new saveFeedRepository();
    const savedPosts = await SaveFeedRepository.getListSavedPostsByUserName(
        userId
    );
    let listFeeds = [];
    for (const item of savedPosts) {
        const feed = await this.getFeed(item.feedId, item.userId);
        listFeeds.push(feed);
    }
    return listFeeds;
};
