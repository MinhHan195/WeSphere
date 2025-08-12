const cloudinaryRepsitory = require("../repository/cloudinary.respository");
const SQL = require("../utils/sqlserver.util");
const feedRepository = require("../repository/feed.repository");
const mediaRepository = require("../repository/media.repository");
const accountRepository = require("../repository/account.repository");
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