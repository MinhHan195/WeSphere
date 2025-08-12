const sql = require("mssql");

class FollowRepository {
    constructor(client) {
        this.db = client;
    }

    async isFollowing(followerId, followingId) {
        const query = "SELECT COUNT(*) AS total FROM Follows WHERE follower_username = @followerId AND following_username = @followingId";
        const result = await this.db.request()
            .input("followerId", sql.VarChar, followerId)
            .input("followingId", sql.VarChar, followingId)
            .query(query);
        return result.recordset[0].total > 0;
    }

    async getFollowers(username) {
        const query = "SELECT following_username FROM Follows WHERE follower_username = @username";
        const result = await this.db.request()
            .input("username", sql.VarChar, username)
            .query(query);
        return result.recordset.map(row => row.following_username);
    }

    async getFollowing(username) {
        const query = "SELECT follower_username FROM Follows WHERE following_username = @username";
        const result = await this.db.request()
            .input("username", sql.VarChar, username)
            .query(query);
        return result.recordset.map(row => row.follower_username);
    }

}
module.exports = FollowRepository;