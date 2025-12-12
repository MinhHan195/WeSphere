const db = require("../../models");
class SaveFeedRepository {
    constructor() {
        this.save_feeds = db.save_feeds;
    }

    async saveFeed(feedId, userId) {
        try {
            console.log(feedId, userId);
            const res = await this.save_feeds.create({ userId: userId, feedId: feedId });
            return res;
        } catch (error) {
            console.error("saveFeed:", error);
            throw new ApiError(500, "Error saved feeds");
        }
    }

    async unSaveFeed(feedId, userId) {
        try {
            console.log(feedId, userId);
            const res = await this.save_feeds.destroy({ where: { userId: userId, feedId: feedId } });
            console.log(res);
            return res;
        } catch (error) {
            console.error("saveFeed:", error);
            throw new ApiError(500, "Error saved feeds");
        }
    }

    async getListSavedPostsByUserName(userId) {
        try {
            const result = await this.save_feeds.findAll({ where: { userId: userId } });
            return result.map(item => item.dataValues);
        } catch (error) {
            console.error("Error getting list feeds:", error);
            throw new ApiError(500, "Error getting list saved feeds");
        }
    }

    async isSave(feedId, userId) {
        try {
            const res = await this.save_feeds.count({ where: { feedId: feedId, userId: userId } });
            return res > 0;
        } catch (error) {
            console.error("isSave:", error);
            throw new ApiError(500, "Error getting list saved feeds");
        }
    }

    async deleteSaveFeedByFeedId(feedId) {
        try {
            const res = await this.save_feeds.destroy({ where: { feedId: feedId } })
            console.log(res);
            return res;
        } catch (error) {
            console.error("deleteSaveFeedByFeedId:", error);
            throw new ApiError(500, "Error getting delete saved feeds");
        }
    }
}
module.exports = SaveFeedRepository;