const cloudinaryRepsitory = require("../repository/cloudinary.respository");
const SQL = require("../utils/sqlserver.util");
const feedRepository = require("../repository/feed.repository");
const mediaRepository = require("../repository/media.repository");
const rePostRepository = require("../repository/repost.repository");
const fs = require('fs');

exports.createFeed = async (data, mediaFiles, username) => {

    const CloudinaryRepsitory = new cloudinaryRepsitory();
    const FeedRepository = new feedRepository(SQL.client);
    const MediaRepository = new mediaRepository(SQL.client);
    let listMedia = [];
    for (const file of mediaFiles) {
        const type = file.mimetype.split("/")[0];
        let result;
        if (type === "image") {
            result = await CloudinaryRepsitory.uploadImagePath(file);
        } else if (type === "video") {
            result = await CloudinaryRepsitory.uploadVideo(file);
        }
        if (result) {
            result.type = type;
            listMedia.push(result);
            fs.unlinkSync(file.path);
        }
    };

    if (data.listImageTmp.length > 0) {
        listMedia = [...listMedia, ...data.listImageTmp];
    }

    const feedId = await FeedRepository.createFeed(data, username);
    for (const media of listMedia) {
        await MediaRepository.addMediaToFeed(feedId, media);
    }

    if (data.id) {
        await MediaRepository.deleteMediaByFeedId(data.id);
        await FeedRepository.deleteFeedById(data.id);
    }
    return true;
}

exports.likeFeed = async (mode, feedId, username) => {
    const FeedRepository = new feedRepository(SQL.client);
    const result = await FeedRepository.likeFeed(mode, feedId, username);
    return result;
}

exports.getListFeeds = async (username) => {
    let listFeeds = [];
    const FeedRepository = new feedRepository(SQL.client);
    const MediaRepository = new mediaRepository(SQL.client);

    const feeds = await FeedRepository.getListFeeds(username);
    for (const feedItem of feeds) {
        feedItem.content = JSON.parse(feedItem.content);
        const media = await MediaRepository.getListMediasByFeedId(feedItem.id);
        feedItem.listImages = media;

        const totalLike = await FeedRepository.getTotalLike(feedItem.id);
        feedItem.totalLike = totalLike;

        const totalReposts = await FeedRepository.getTotalRepost(feedItem.id);
        feedItem.totalReposts = totalReposts;

        const totalComment = await FeedRepository.getTotalComment(feedItem.id);
        feedItem.totalComment = totalComment;

        const owner = await FeedRepository.getOwner(feedItem.id);
        const isLike = await FeedRepository.isLike(feedItem.id, username);
        const isRePost = await FeedRepository.isRePost(feedItem.id, username);
        let item = {
            feed: feedItem,
            feedOwner: owner,
            state: {
                isLike: isLike,
                isRePost: isRePost
            }
        };
        listFeeds.push(item);

    }
    return listFeeds;
}

exports.rePostFeed = async (feedId, username, mode) => {
    const FeedRepository = new feedRepository(SQL.client);
    const result = await FeedRepository.rePostFeed(feedId, username, mode);
    return result;
}

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
}

exports.getFeed = async (feedId, username) => {
    const FeedRepository = new feedRepository(SQL.client);
    const MediaRepository = new mediaRepository(SQL.client);
    let results = {};
    const mainFeed = await FeedRepository.getFeedById(feedId);
    if (mainFeed) {
        mainFeed.content = JSON.parse(mainFeed.content);

        const media = await MediaRepository.getListMediasByFeedId(mainFeed.id);
        mainFeed.listImages = media;

        const totalLike = await FeedRepository.getTotalLike(mainFeed.id);
        mainFeed.totalLike = totalLike;

        const totalReposts = await FeedRepository.getTotalRepost(mainFeed.id);
        mainFeed.totalReposts = totalReposts;

        const totalComment = await FeedRepository.getTotalComment(mainFeed.id);
        mainFeed.totalComment = totalComment;
        results.feed = mainFeed;
        const owner = await FeedRepository.getOwner(mainFeed.id);
        owner.isOnline = owner.isOnline === 1 ? true : false;
        const isLike = await FeedRepository.isLike(mainFeed.id, username);
        const isRePost = await FeedRepository.isRePost(mainFeed.id, username);
        results.state = {
            isLike: isLike,
            isRePost: isRePost,
        }

        results.feedOwner = owner;
    }

    return results;
}

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
}

exports.getListFeedsByUser = async (username) => {
    const FeedRepository = new feedRepository(SQL.client);
    const feeds = await FeedRepository.getMyFeeds(username);
    let listfeed = [];
    for (const item of feeds) {
        const feed = await this.getFeed(item.id, username);
        if (feed) {
            listfeed.push(feed);
        }
    }
    return listfeed;
}

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
}

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
            }
            listFeeds.push(data);
        }
    }
    return listFeeds;
}

exports.getListFavoritePostsByUser = async (username) => {
    const FeedRepository = new feedRepository(SQL.client);
    const favoritePosts = await FeedRepository.getListFavoritePostsByUserName(username);
    let listFeeds = [];
    for (const item of favoritePosts) {
        const feed = await this.getFeed(item.feedId, username);
        listFeeds.push(feed);
    }
    return listFeeds;
}

exports.getListSavedPostsByUser = async (username) => {
    const FeedRepository = new feedRepository(SQL.client);
    const savedPosts = await FeedRepository.getListSavedPostsByUserName(username);
    let listFeeds = [];
    for (const item of savedPosts) {
        const feed = await this.getFeed(item.feedId, username);
        listFeeds.push(feed);
    }
    return listFeeds;
}
