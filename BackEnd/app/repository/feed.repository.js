const ObjectId = require("bson-objectid");
const db = require("../../models");
const ApiError = require("../api-error");
const { or } = require("sequelize");

class FeedRepository {
    constructor() {
        this.feed = db.feeds;
    }

    extractFeedData(payload) {
        const object = {
            id: payload.id,
            content: payload.content,
            tag: payload.tag,
            privateMode: payload.privateMode,
            active: payload.active,
            userId: payload.userId,
            commentOfPost: payload.commentOfPost,
            timeCreate: payload.timeCreate,
        };
        return Object.fromEntries(
            Object.entries(object).filter(([_, value]) => value !== undefined)
        );
    }

    async createFeed(data) {
        try {
            const payload = this.extractFeedData(data);
            const result = await this.feed.create(payload);
            return result.dataValues.id;
        } catch (error) {
            console.error("Error creating feed:", error);
            throw new ApiError(500, "Error creating feed");
        }
    }

    async getListFeeds(userId, index) {
        try {
            const result = await this.feed.findAll({
                attributes: ["id", "userId"],
                where: { active: 1 },
                order: [["timeCreate", "DESC"]],
                limit: 10,
                offset: parseInt(index),
            });
            return result.map((item) => item.dataValues);
        } catch (error) {
            console.error("Error getting list feeds:", error);
            throw new ApiError(500, "Error getting list feeds");
        }
    }

    async getTotalComment(feed_id) {
        try {
            const result = await this.feed.count({
                where: { commentOfPost: feed_id },
            });
            return result;
        } catch (error) {
            console.error("Error getting total comments:", error);
            throw new ApiError(500, "Error getting total comments");
        }
    }

    async getOwner(feed_id) {
        try {
            const result = await this.feed.findOne({
                attributes: [],
                where: { id: feed_id },
                include: [{
                    model: db.users,
                    as: 'user',
                    attributes: ['userId'],
                    required: true,
                    include: [
                        {
                            model: db.accounts,
                            attributes: ["username", "isOnline", "avatar"],
                            required: true,
                        },
                    ],
                }],
            });
            return result.dataValues.user.dataValues;
        } catch (error) {
            console.error("Error getting feed owner:", error);
            throw new ApiError(500, "Error getting feed owner");
        }
    }

    async getListSaveFeedsByUserId(userId) {
        try {
            const result = await this.feed.findAll({
                where: { userId: userId, active: 0 },
            });
            return result.map((item) => item.dataValues);
        } catch (error) {
            console.error("Error getting list feeds:", error);
            throw new ApiError(500, "Error getting list feeds");
        }
    }

    async deleteFeedById(feedId, userId) {
        try {
            const result = await this.feed.destroy({ where: { id: feedId, userId: userId } });
            if (result[0] === 0) {
                throw new ApiError(404, "Feed not found");
            }
            return true; // number of rows deleted
        } catch (error) {
            console.error("Error deleting feed by ID:", error);
            throw new ApiError(500, "Error deleting feed by ID");
        }
    }

    async getFeedById(feedId) {
        try {
            const result = await this.feed.findOne({ where: { id: feedId } });
            return result ? result.dataValues : null;
        } catch (error) {
            console.error("Error getting feed by ID:", error);
            throw new ApiError(500, "Error getting feed by ID");
        }
    }

    async getListCommentFeedId(feedId) {
        try {
            const result = await this.feed.findAll({
                attributes: ["id", "userId"],
                where: { commentOfPost: feedId, active: 1 },
            });
            return result.map((item) => item.dataValues);
        } catch (error) {
            console.error("Error getting list comment by feed ID:", error);
            throw new ApiError(500, "Error getting list comment by feed ID");
        }
    }

    async getListFeedsByUserId(userId) {
        try {
            const result = await this.feed.findAll({
                attributes: ["id", "userId"],
                where: { active: 1, userId: userId },
                order: [["timeCreate", "DESC"]],
            });
            return result.map((item) => item.dataValues);
        } catch (error) {
            console.error("Error getting list feeds:", error);
            throw new ApiError(500, "Error getting list feeds");
        }
    }

    async getListFavoritePostsByUserId(userId) {
        try {
            const result = await this.feed.findAll({
                include: [{ model: db.likes, as: 'likes', attributes: [], where: { userId: userId } }],
                attributes: ['id', 'userId'],
                where: { active: 1 },
            });
            return result.map((item) => item.dataValues);
        } catch (error) {
            console.error("Error getting list feeds:", error);
            throw new ApiError(500, "Error getting list favorite feeds");
        }
    }
}

module.exports = FeedRepository;
