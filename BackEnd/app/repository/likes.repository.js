const { where } = require("sequelize");
const db = require("../../models");
const ApiError = require("../api-error");
class LikesRepository {
    constructor() {
        this.likes = db.likes;
    }

    async likeFeed(mode, feedId, userId) {
        try {
            let result;
            if (mode === "add") {
                result = await this.likes.create({
                    userId: userId,
                    feed_id: feedId,
                });
            } else if (mode === "minus") {
                result = await this.likes.destroy({
                    where: { userId: userId, feed_id: feedId },
                });
            }
            return result ? true : false;
        } catch (error) {
            console.error("Error liking feed:", error);
            throw new ApiError(500, "Error liking feed");
        }
    }

    async getTotalLike(feed_id) {
        try {
            const result = await this.likes.count({
                where: { feed_id: feed_id },
            });
            return result;
        } catch (error) {
            throw new ApiError(500, "Error getting total likes");
        }
    }

    async isLike(feedId, userId) {
        try {
            const result = await this.likes.count({
                where: { feed_id: feedId, userId: userId },
            });
            return result > 0;
        } catch (error) {
            console.error("Error checking if feed is liked:", error);
            throw new ApiError(500, "Error checking if feed is liked");
        }
    }


}

module.exports = LikesRepository;
