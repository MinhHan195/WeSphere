const sql = require("mssql");
const ApiError = require("../api-error");
const bcrypt = require("bcrypt");


class accountRepository {
    constructor(client) {
        this.db = client;
    }

    async getAccountByUsername(username) {
        try {
            const query = "SELECT * FROM accounts WHERE username = @username";
            const result = await this.db.request()
                .input("username", sql.NVarChar, username)
                .query(query);
            return result.recordset[0];
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }

    }

    async getAccountByEmail(email) {
        const query = "SELECT a.* FROM accounts a JOIN users u ON a.userId = u.userId WHERE u.email = @Email";
        const result = await this.db.request()
            .input("Email", sql.NVarChar, email)
            .query(query);
        return result.recordset[0];
    }

    async createAccount(username, avatar, userId, password) {
        try {
            const hash = await bcrypt.hash(password, 5);
            const query = "INSERT INTO accounts (username, password, bio, privateMode, onlineMode, userId, avatar) VALUES (@username, @password, @bio, @privateMode, @onlineMode, @userId, @avatar)";
            await this.db.request()
                .input("username", sql.NVarChar, username)
                .input("password", sql.NVarChar, hash)
                .input("bio", sql.NVarChar, "")
                .input("privateMode", sql.Bit, false)
                .input("onlineMode", sql.NVarChar, "Công khai")
                .input("userId", sql.NVarChar, userId)
                .input("avatar", sql.NVarChar, avatar)
                .query(query);

            return;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }
}

module.exports = accountRepository;