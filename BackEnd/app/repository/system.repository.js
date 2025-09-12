const sql = require("mssql");
const ObjectId = require('bson-objectid');
const ApiError = require("../api-error");

class SystemRepository {
    constructor(client) {
        this.db = client;
    }

    async createReport(userId, file, data) {
        const id = ObjectId().toString();
        const query = "INSERT INTO report (id, description, userId, media, publicId) VALUES (@id, @description, @userId, @media, @publicId)";
        const result = await this.db.request()
            .input("id", sql.VarChar, id)
            .input("description", sql.VarChar, data.description)
            .input("userId", sql.VarChar, userId)
            .input("media", sql.VarChar, file.url)
            .input("publicId", sql.VarChar, file.publicId)
            .query(query);
        if (result.rowsAffected[0] === 0) {
            throw new ApiError(500, "Failed to create report");
        }
        return true;
    }
}

module.exports = SystemRepository