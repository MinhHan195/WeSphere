const ApiError = require("../api-error");
const db = require('../../models');  // Sequelize sẽ load index.js và init toàn bộ models


class UserRepository {
    constructor() {
        this.users = db.users;
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
            Object.entries(object).filter(([_, value]) => value !== undefined && value !== 'null')
        );
    }

    async createUser(userData) {
        const data = this.extractUserData(userData);
        const result = await this.users.create(data);
        return { ...result.dataValues, ...userData };
    }

    async getUserById(userId) {
        try {
            const user = await this.users.findOne({ where: { userId: userId } });
            return user;
        } catch (error) {
            throw new ApiError(500, "Lỗi hệ thống!");
        }
    }

    async updateUser(data) {
        try {
            data = this.extractUserData(data);
            const result = await this.users.update(data, { where: { userId: data.userId } });
            if (result[0] === 0) {
                throw new ApiError(404, "Người dùng không tồn tại");
            }
            const newUser = await this.getUserById(data.userId);
            return newUser.dataValues;
        } catch (error) {
            console.log("Error updating user:", error);
            throw new ApiError(500, "Lỗi hệ thống!")
        }
    }

    async deleteUser(userId) {
        try {
            const result = await this.users.destroy({ where: { userId: userId } });
            console.log("Delete user result:", result);
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Lỗi hệ thống");
        }
    }
}

module.exports = UserRepository;
