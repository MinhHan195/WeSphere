const ApiError = require("../api-error");
const db = require('../../models');
class limitRepository {
    constructor() {
        this.limits = db.limits;
    }

    async getListUserLimit(username) {
        try {
            const result = await this.limits.findAll({
                include: [
                    {
                        model: db.accounts, attributes: ['username', 'avatar'],
                        as: 'limiter', required: true,
                        include: [{
                            model: db.users,
                            attributes: ['userId', 'fullname'],
                            required: true
                        }]
                    }],
                attributes: [],
                where: {
                    limiter_username: username
                }
            });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async removeLimitedUser(limitedUsername, ownerUsername) {
        try {
            const result = await this.limits.destroy({
                where: {
                    limited_username: limitedUsername,
                    limiter_username: ownerUsername
                }
            });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async deleteLimitsByOwnerUsername(username) {
        try {
            const result = await this.limits.destroy({ where: { limiter_username: username } });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }
}

module.exports = limitRepository;