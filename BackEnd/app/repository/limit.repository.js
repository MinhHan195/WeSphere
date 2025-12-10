const ApiError = require("../api-error");
const db = require('../../models');
class limitRepository {
    constructor() {
        this.limits = db.limits;
    }

    async getListUserLimit(userId) {
        try {
            const result = await this.limits.findAll({
                include: [{
                    model: db.users,
                    attributes: ['userId', 'fullname'],
                    as: 'limiter',
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
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async removeLimitedUser(limitedUserId, ownerUserId) {
        try {
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