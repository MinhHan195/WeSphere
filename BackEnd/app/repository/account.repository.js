const ApiError = require("../api-error");
const bcrypt = require("bcrypt");
const db = require('../../models');
const { where } = require("sequelize");


class accountRepository {
    constructor() {
        this.account = db.accounts;
    }

    extractAccountData(payload) {
        const object = {
            username: payload.username,
            password: payload.password,
            bio: payload.bio,
            privateMode: payload.privateMode === 'true',
            onlineMode: payload.onlineMode,
            userId: payload.userId,
            avatar: payload.avatar,
            publicId: payload.publicId,
            accessToken: payload.accessToken,
        };
        return Object.fromEntries(
            Object.entries(object).filter(([_, value]) => value !== undefined)
        );
    }

    async getAccountByUsername(username) {
        try {
            const account = await this.account.findOne({ where: { username: username } });
            // console.log(account.username);
            return account;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async getAccountByUserId(userId) {
        try {
            const account = await this.account.findOne({ where: { userId: userId } });
            // console.log(account.username);
            return account;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async getAccountByEmail(email) {
        try {
            const account = await this.account.findOne({ where: { email: email } });
            return account;
        } catch (error) {
            console.log("Lỗi database", error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async createAccount(username, avatar, userId, password, accessToken) {
        try {
            console.log("password:", password);
            const hash = await bcrypt.hash(password, 5);
            const data = this.extractAccountData({ username: username, avatar: avatar, userId: userId, accessToken: accessToken, password: hash });
            console.log("Account data to create:", data);
            const newAccount = await this.account.create(data);
            console.log(newAccount);

            return;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async updateAccount(data) {
        try {
            data = this.extractAccountData(data);
            const result = await this.account.update(data, { where: { username: data.username } });
            if (result[0] === 0) {
                throw new ApiError(404, "Không tìm thấy tài khoản");
            }
            const newAccount = await this.getAccountByUsername(data.username);
            return newAccount.dataValues;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async deactivateAccount(username) {
        try {
            const result = await this.account.update({ active: false }, { where: { username: username } });
            if (result[0] === 0) {
                throw new ApiError(404, "Không tìm thấy tài khoản");
            }
            return result[0];
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async deleteAccount(username) {
        try {
            const result = await this.account.destroy({ where: { username: username } });
            console.log("Delete account result:", result);
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }
}

module.exports = accountRepository;