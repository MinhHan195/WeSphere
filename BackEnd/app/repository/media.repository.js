const ApiError = require("../api-error");
const sql = require("mssql");

class MediaRepository {
    constructor(client) {
        this.db = client;
    }

    async addMediaToFeed(feedId, media) {
        try {
            const query = `INSERT INTO media (feed_id, publicId, url, type) VALUES (@feedId, @publicId, @url, @type)`;
            await this.db.request()
                .input("feedId", sql.VarChar, feedId)
                .input("publicId", sql.VarChar, media.publicId)
                .input("url", sql.VarChar, media.url)
                .input("type", sql.VarChar, media.type)
                .query(query);
        } catch (error) {
            console.error("Error adding media to feed:", error);
            throw new ApiError(500, "Error adding media to feed");
        }
    }

    async getListMediasByFeedId(feedId) {
        try {
            const query = `SELECT url, type, publicId FROM media WHERE feed_id = @feedId`;
            const result = await this.db.request()
                .input("feedId", sql.VarChar, feedId)
                .query(query);
            return result.recordset;
        } catch (error) {
            console.error("Error getting media by feed ID:", error);
            throw new ApiError(500, "Error getting media by feed ID");
        }
    }

    async deleteMediaByFeedId(feedId) {
        try {
            const query = `DELETE FROM media WHERE feed_id = @feedId`;
            await this.db.request()
                .input("feedId", sql.VarChar, feedId)
                .query(query);
        } catch (error) {
            console.error("Error deleting media by feed ID:", error);
            throw new ApiError(500, "Error deleting media by feed ID");
        }
    }

    async getListMediasByUserName(username) {
        try {
            const query = `select DISTINCT feed_id from media m join feed f on m.feed_id = f.id where f.username = @username`;
            const result = await this.db.request()
                .input("username", sql.VarChar, username)
                .query(query);
            return result.recordset;
        } catch (error) {
            console.error("Error getting media by username:", error);
            throw new ApiError(500, "Error getting media by username");
        }
    }
}

module.exports = MediaRepository;