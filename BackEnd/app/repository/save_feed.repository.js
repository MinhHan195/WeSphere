const db = require("../../models");
class SaveFeedRepository {
    constructor() {
        this.save_feed = db.save_feed;
    }

    async getListSavedPostsByUserName(userId) {
        try {
            const result = await this.save_feed.findAll({ where: { userId: userId } });
            return result.map(item => item.dataValues);
        } catch (error) {
            console.error("Error getting list feeds:", error);
            throw new ApiError(500, "Error getting list saved feeds");
        }
    }
}
module.exports = SaveFeedRepository;