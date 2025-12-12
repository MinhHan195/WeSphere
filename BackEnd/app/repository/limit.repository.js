const ApiError = require("../api-error");
const db = require('../../models');
class limitRepository {
    constructor() {
        this.limits = db.limits;
    }

    async createLimit(userId, ownUserId) {
        try {
            const result = await this.limits.create({ limiter_userId: ownUserId, limited_userId: userId });
            return "Đã hạn chế người dùng"
        } catch (error) {
            console.log("createLimit: ", error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async getListUserIdLimit(userId) {
        try {
            const result = await this.limits.findAll({
                attributes: ['limited_userId'],
                where: {
                    limiter_userId: userId
                }
            });
            let list = [];
            for (const item of result) {
                list.push(item.dataValues.limited_userId)
            }
            return list;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async getListUserLimit(userId) {
        try {
            const result = await this.limits.findAll({
                include: [{
                    model: db.users,
                    attributes: ['userId', 'fullname'],
                    as: 'limited',
                    required: true,
                    include: [
                        {
                            model: db.accounts, attributes: ['username', 'avatar'],
                            required: true,
                        }],
                }],
                attributes: [],
                where: {
                    limiter_userId: userId
                }
            });
            let list = []
            for (const item of result) {
                list.push(item.dataValues.limited)
            }
            return list;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async removeLimitedUser(limitedUserId, ownerUserId) {
        try {
            console.log(limitedUserId);
            const result = await this.limits.destroy({
                where: {
                    limited_userId: limitedUserId,
                    limiter_userId: ownerUserId
                }
            });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async deleteLimitsByOwnerUserId(userId) {
        try {
            const result = await this.limits.destroy({ where: { limiter_userId: userId } });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }
}

module.exports = limitRepository;