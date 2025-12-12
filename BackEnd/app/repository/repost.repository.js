const ApiError = require("../api-error");
const db = require("../../models")

class RePostRepository {
    constructor() {
        this.reposts = db.reposts;
    }

    async rePostFeed(feedId, userId, mode) {
        try {
            const result = await this.reposts.create({ feedId: feedId, userId: userId });
            return result.dataValues ? true : false;
        } catch (error) {
            console.error("Error reposting feed:", error);
            throw new ApiError(500, "Error reposting feed");
        }
    }

    async unRePostFeed(feedId, userId) {
        try {
            const result = await this.reposts.destroy({ where: { feedId: feedId, userId: userId } });
            return result[0] > 0;
        } catch (error) {
            console.error("Error unreposting feed:", error);
            throw new ApiError(500, "Error unreposting feed");
        }
    }

    async getListRePostsByUserId(userId) {
        try {
            const result = await this.reposts.findAll({ where: { userId: userId }, order: [["timeCreate", "DESC"]], });
            console.log(userId)
            return result;
        } catch (error) {
            console.error("Error getting media by username:", error);
            throw new ApiError(500, "Error getting media by username");
        }
    }

    async isRePost(feedId, userId) {
        try {
            const result = await this.reposts.count({ where: { feedId: feedId, userId: userId } });
            return result > 0;
        } catch (error) {
            console.error("Error checking if feed is reposted:", error);
            throw new ApiError(500, "Error checking if feed is reposted");
        }
    }

    async getTotalRepost(feed_id) {
        try {
            const result = await this.reposts.count({ where: { feedId: feed_id } });
            return result;
        } catch (error) {
            console.error("Error getting total likes:", error);
            throw new ApiError(500, "Error getting total repost");
        }
    }

}

module.exports = RePostRepository;