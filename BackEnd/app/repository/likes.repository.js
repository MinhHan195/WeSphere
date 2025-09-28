const { where } = require("sequelize");
const db = require("../../models");
const ApiError = require("../api-error");
class LikesRepository {
    constructor() {
        this.likes = db.likes;
    }

    async likeFeed(mode, feedId, username) {
        try {
            let result;
            if (mode === "add") {
                result = await this.likes.create({
                    username: username,
                    feed_id: feedId,
                });
            } else if (mode === "minus") {
                result = await this.likes.destroy({
                    where: { username: username, feed_id: feedId },
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
            // const query = `SELECT COUNT(*) AS totalLike FROM likes WHERE feedId = @feedId`;
            // const result = await this.db.request()
            //     .input("feedId", sql.VarChar, feed_id)
            //     .query(query);
            // return result.recordset[0].totalLike;
            const result = await this.likes.count({
                where: { feed_id: feed_id },
            });
            return result;
        } catch (error) {
            console.error("Error getting total likes:", error);
            throw new ApiError(500, "Error getting total likes");
        }
    }

    async isLike(feedId, username) {
        try {
            const result = await this.likes.count({
                where: { feed_id: feedId, username: username },
            });
            return result > 0;
        } catch (error) {
            console.error("Error checking if feed is liked:", error);
            throw new ApiError(500, "Error checking if feed is liked");
        }
    }


}

module.exports = LikesRepository;
