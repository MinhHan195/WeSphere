const sql = require("mssql");
const ApiError = require("../api-error");
const bcrypt = require("bcrypt");


class accountRepository {
    constructor(client) {
        this.db = client;
    }

    extractAccountData(payload) {
        const object = {
            username: payload.username,
            password: payload.password,
            bio: payload.bio,
            privateMode: payload.privateMode,
            onlineMode: payload.onlineMode,
            userId: payload.userId,
            avatar: payload.avatar,
            publicId: payload.publicId
        };
        return Object.fromEntries(
            Object.entries(object).filter(([_, value]) => value !== undefined)
        );
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

    async updateAccount(data) {

        try {
            data = this.extractAccountData(data);
            let string = "";
            for (const [key, value] of Object.entries(data)) {
                if (key !== "username") {
                    string += `${key} = '${value !== 'false' && value !== 'true' ? value : value === 'true' ? 1 : 0}', `;
                }
            }
            string = string.slice(0, -2);

            const query = `UPDATE accounts SET ${string} WHERE username = @username`;
            await this.db.request()
                .input("username", sql.NVarChar, data.username)
                .query(query);
            return data;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async getListUserBlock(username) {
        try {
            const query = `
                SELECT u.userId, a.username, a.avatar, u.fullname
                FROM  accounts a
                JOIN blocks ub ON a.username = ub.blocked_username
                JOIN users u  ON u.userId = a.userId
                WHERE ub.blocker_username = @username
            `;
            const result = await this.db.request()
                .input("username", sql.NVarChar, username)
                .query(query);
            return result.recordset;
        } catch (error) {
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async getListUserLimit(username) {
        try {
            const query = `
                SELECT u.userId, a.username, a.avatar, u.fullname
                FROM  accounts a
                JOIN limits ul ON a.username = ul.limited_username
                JOIN users u  ON u.userId = a.userId
                WHERE ul.limiter_username = @username
            `;
            const result = await this.db.request()
                .input("username", sql.NVarChar, username)
                .query(query);
            return result.recordset;
        } catch (error) {
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async removeLimitedUser(limitedUsername, ownerUsername) {
        try {
            const query = `
                DELETE FROM limits
                WHERE limited_username = @limitedUsername AND limiter_username = @ownerUsername
            `;
            await this.db.request()
                .input("limitedUsername", sql.NVarChar, limitedUsername)
                .input("ownerUsername", sql.NVarChar, ownerUsername)
                .query(query);
            return;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async removeBlockedUser(blockedUsername, ownerUsername) {
        try {
            const query = `
                DELETE FROM blocks
                WHERE blocked_username = @blockedUsername AND blocker_username = @ownerUsername
            `;
            await this.db.request()
                .input("blockedUsername", sql.NVarChar, blockedUsername)
                .input("ownerUsername", sql.NVarChar, ownerUsername)
                .query(query);
            return;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async deactivateAccount(userId, user) {
        console.log(userId);
        try {
            const query = `
                 UPDATE accounts
                SET active = 0
                WHERE userId = @userId
            `;
            const res = await this.db.request()
                .input("userId", sql.NVarChar, userId)
                .query(query);
            return res;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async deleteAccount(username) {
        try {
            const query = `
                DELETE FROM links WHERE username = @username
                DELETE FROM follows WHERE follower_username = @username or following_username = @username
                DELETE FROM blocks WHERE blocker_username = @username or blocked_username = @username
                DELETE FROM limits WHERE limiter_username = @username or limited_username = @username
                DELETE FROM accounts WHERE username = @username
            `;
            await this.db.request()
                .input("username", sql.NVarChar, username)
                .query(query);
            return true;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

}

module.exports = accountRepository;