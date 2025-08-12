const ObjectId = require('bson-objectid');
const sql = require("mssql");
const ApiError = require('../api-error');

class FeedRepository {
    constructor(client) {
        this.db = client;
    }

    async createFeed(data, username) {
        try {
            const feedId = ObjectId().toString();
            const { content, tag, privateMode, active } = data;
            const query = `INSERT INTO feed (id, content, tag, privateMode, active, username) VALUES (@id, @content, @tag, @privateMode, @active, @username)`;
            const result = await this.db.request()
                .input("id", sql.VarChar, feedId)
                .input("content", sql.VarChar, content)
                .input("tag", sql.VarChar, tag)
                .input("privateMode", sql.VarChar, privateMode)
                .input("active", sql.Bit, active)
                .input("username", sql.VarChar, username)
                .query(query);
            return feedId;
        } catch (error) {
            console.error("Error creating feed:", error);
            throw new ApiError(500, "Error creating feed");
        }
    }

    async likeFeed(mode, feedId, username) {
        try {
            let query;
            if (mode === "add") {
                query = `INSERT INTO likes (username, feedId) VALUES (@username, @feedId)`;
            } else if (mode === "minus") {
                query = `DELETE FROM likes WHERE username = @username AND feedId = @feedId`;
            }
            const res = await this.db.request()
                .input("feedId", sql.VarChar, feedId)
                .input("username", sql.VarChar, username)
                .query(query);
            return true;
        } catch (error) {
            console.error("Error liking feed:", error);
            throw new ApiError(500, "Error liking feed");
        }
    }

    async getListFeeds(username) {
        try {
            const query = `SELECT * FROM feed where active=1`;
            const result = await this.db.request()
                .query(query);
            return result.recordset;
        } catch (error) {
            console.error("Error getting list feeds:", error);
            throw new ApiError(500, "Error getting list feeds");
        }
    }

    async getTotalLike(feed_id) {
        try {
            const query = `SELECT COUNT(*) AS totalLike FROM likes WHERE feedId = @feedId`;
            const result = await this.db.request()
                .input("feedId", sql.VarChar, feed_id)
                .query(query);
            return result.recordset[0].totalLike;
        } catch (error) {
            console.error("Error getting total likes:", error);
            throw new ApiError(500, "Error getting total likes");
        }
    }

    async getTotalRepost(feed_id) {
        try {
            const query = `SELECT COUNT(*) AS totalReposts FROM reposts WHERE feedId = @feedId`;
            const result = await this.db.request()
                .input("feedId", sql.VarChar, feed_id)
                .query(query);
            return result.recordset[0].totalReposts;
        } catch (error) {
            console.error("Error getting total likes:", error);
            throw new ApiError(500, "Error getting total repost");
        }
    }

    async getTotalComment(feed_id) {
        try {
            const query = `SELECT COUNT(*) AS totalComments FROM feed WHERE commentOfPost = @feedId`;
            const result = await this.db.request()
                .input("feedId", sql.VarChar, feed_id)
                .query(query);
            return result.recordset[0].totalComments;
        } catch (error) {
            console.error("Error getting total comments:", error);
            throw new ApiError(500, "Error getting total comments");
        }
    }

    async getOwner(feed_id) {
        try {
            const query = `select a.username, u.userId as id, a.isOnline from accounts a join users u on a.userId=u.userId join feed f on f.username = a.username where f.id = @feedId`;
            const result = await this.db.request()
                .input("feedId", sql.VarChar, feed_id)
                .query(query);
            return result.recordset[0];
        } catch (error) {
            console.error("Error getting feed owner:", error);
            throw new ApiError(500, "Error getting feed owner");
        }
    }

    async rePostFeed(feedId, username, mode) {
        try {
            let query;
            if (mode === "add") {
                query = `INSERT INTO reposts ( username, feedId) VALUES (@username, @feedId)`;
            } else if (mode === "minus") {
                query = `DELETE FROM reposts WHERE username = @username AND feedId = @feedId`;
            }

            await this.db.request()
                .input("feedId", sql.VarChar, feedId)
                .input("username", sql.VarChar, username)
                .query(query);
            return true;
        } catch (error) {
            console.error("Error reposting feed:", error);
            throw new ApiError(500, "Error reposting feed");
        }
    }

    async isLike(feedId, username) {
        try {
            const query = `SELECT COUNT(*) AS isLiked FROM likes WHERE feedId = @feedId AND username = @username`;
            const result = await this.db.request()
                .input("feedId", sql.VarChar, feedId)
                .input("username", sql.VarChar, username)
                .query(query);
            return result.recordset[0].isLiked > 0;
        } catch (error) {
            console.error("Error checking if feed is liked:", error);
            throw new ApiError(500, "Error checking if feed is liked");
        }
    }

    async isRePost(feedId, username) {
        try {
            const query = `SELECT COUNT(*) AS isRePosted FROM reposts WHERE feedId = @feedId AND username = @username`;
            const result = await this.db.request()
                .input("feedId", sql.VarChar, feedId)
                .input("username", sql.VarChar, username)
                .query(query);
            return result.recordset[0].isRePosted > 0;
        } catch (error) {
            console.error("Error checking if feed is reposted:", error);
            throw new ApiError(500, "Error checking if feed is reposted");
        }
    }

    async getListSaveFeedsByUserName(username) {
        try {
            const query = `SELECT * FROM feed WHERE username = @username and active=0`;
            const result = await this.db.request()
                .input("username", sql.VarChar, username)
                .query(query);
            return result.recordset;
        } catch (error) {
            console.error("Error getting list feeds:", error);
            throw new ApiError(500, "Error getting list feeds");
        }
    }

    async deleteFeedById(feedId) {
        try {
            const query = `
            DELETE FROM feed WHERE id = @feedId`;
            await this.db.request()
                .input("feedId", sql.VarChar, feedId)
                .query(query);
        } catch (error) {
            console.error("Error deleting feed by ID:", error);
            throw new ApiError(500, "Error deleting feed by ID");
        }
    }
}

module.exports = FeedRepository;
