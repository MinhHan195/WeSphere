const sql = require("mssql");
const ObjectId = require('bson-objectid');

class UserRepository {
    constructor(client) {
        this.db = client;
    }

    async createUser(userData) {
        const userId = ObjectId().toString();
        const query = "INSERT INTO Users (userId, email, fullname, gender, phone) VALUES (@userId, @email, @fullname, @gender, @phone)";
        await this.db.request()
            .input("userId", sql.VarChar, userId)
            .input("email", sql.VarChar, userData.email)
            .input("fullname", sql.VarChar, userData.fullName)
            .input("gender", sql.VarChar, "")
            .input("phone", sql.VarChar, "")
            .query(query);
        return { userId: userId, ...userData };
    }
}

module.exports = UserRepository;
