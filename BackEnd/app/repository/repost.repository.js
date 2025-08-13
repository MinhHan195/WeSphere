const ApiError = require("../api-error");
const sql = require("mssql");

class RePostRepository {
    constructor(client) {
        this.db = client;
    }

    async getListRePostsByUserName(username) {
        try {
            const query = `select * from reposts where username = @username`;
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

module.exports = RePostRepository;