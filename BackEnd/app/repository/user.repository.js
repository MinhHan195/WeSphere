const sql = require("mssql");
const ObjectId = require('bson-objectid');
const ApiError = require("../api-error");

class UserRepository {
    constructor(client) {
        this.db = client;
    }

    extractUserData(payload) {
        const object = {
            userId: payload.userId,
            email: payload.email,
            fullname: payload.fullname,
            gender: payload.gender,
            phone: payload.phone,
        };
        return Object.fromEntries(
            Object.entries(object).filter(([_, value]) => value !== undefined)
        );
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

    async getUserById(userId) {
        const query = "SELECT * FROM Users WHERE userId = @userId";
        const result = await this.db.request()
            .input("userId", sql.VarChar, userId)
            .query(query);
        return result.recordset[0];
    }

    async updateUser(data) {
        try {
            data = this.extractUserData(data);
            let string = "";
            for (const [key, value] of Object.entries(data)) {
                if (key !== "userId") {
                    string += `${key} = '${value !== 'false' && value !== 'true' ? value : value === 'true' ? 1 : 0}', `;
                }
            }
            string = string.slice(0, -2);

            const query = `UPDATE users SET ${string} WHERE userId = @userId`;
            await this.db.request()
                .input("userId", sql.NVarChar, data.userId)
                .query(query);
            return data;
        } catch (error) {
            throw new ApiError(500, "Lỗi hệ thống!")
        }
    }

    async deleteUser(userId) {
        try {
            const query = `
                DELETE FROM users
                WHERE userId = @userId
            `;
            await this.db.request()
                .input("userId", sql.VarChar, userId)
                .query(query);
            return true;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Lỗi hệ thống");
        }
    }
}

module.exports = UserRepository;
