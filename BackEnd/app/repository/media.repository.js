const ApiError = require("../api-error");
const db = require("../../models");

class MediaRepository {
    constructor() {
        this.media = db.media;
    }

    async addMediaToFeed(feedId, media) {
        try {
            // const query = `INSERT INTO media (feed_id, publicId, url, type) VALUES (@feedId, @publicId, @url, @type)`;
            // await this.db.request()
            //     .input("feedId", sql.VarChar, feedId)
            //     .input("publicId", sql.VarChar, media.publicId)
            //     .input("url", sql.VarChar, media.url)
            //     .input("type", sql.VarChar, media.type)
            //     .query(query);
            const result = await this.media.create({
                feed_id: feedId,
                publicId: media.publicId,
                url: media.url,
                type: media.type
            });
            return result ? result.dataValues : null;
        } catch (error) {
            console.error("Error adding media to feed:", error);
            throw new ApiError(500, "Error adding media to feed");
        }
    }

    async getListMediasByFeedId(feedId) {
        try {
            const result = await this.media.findAll({ where: { feed_id: feedId } });
            return result.map(item => item.dataValues);
        } catch (error) {
            console.error("Error getting media by feed ID:", error);
            throw new ApiError(500, "Error getting media by feed ID");
        }
    }

    async deleteMediaByFeedId(feedId) {
        try {
            const result = await this.media.destroy({ where: { feed_id: feedId } });
            return result[0];
        } catch (error) {
            console.error("Error deleting media by feed ID:", error);
            throw new ApiError(500, "Error deleting media by feed ID");
        }
    }

    async getListMediasByUserId(userId) {
        try {
            const result = await this.media.findAll({
                distinct: true,
                include: [{
                    model: db.feeds,
                    where: { userId: userId },
                    attributes: [],
                    order: [["timeCreate", "DESC"]],

                }],
                attributes: ['feed_id'],
                group: ['feed_id'],

            });
            return result.map(item => item.dataValues);
        } catch (error) {
            console.error("Error getting media by username:", error);
            throw new ApiError(500, "Error getting media by username");
        }
    }
}

module.exports = MediaRepository;