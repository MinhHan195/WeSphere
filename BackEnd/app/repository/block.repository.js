const ApiError = require("../api-error");
const db = require('../../models');
class BlockRepository {
    constructor() {
        this.blocks = db.blocks;
    }

    async getListUserBlock(username) {
        try {
            const result = await this.blocks.findAll({
                include: [{
                    model: db.accounts, attributes: ['username', 'avatar'],
                    as: 'blocker', required: true,
                    include: [{
                        model: db.users,
                        attributes: ['userId', 'fullname'],
                        required: true
                    }]
                }],
                attributes: [],
                where: {
                    blocker_username: username
                }
            });
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async removeBlockedUser(blockedUsername, ownerUsername) {
        try {
            const result = await this.blocks.destroy({
                where: {
                    blocked_username: blockedUsername,
                    blocker_username: ownerUsername
                }
            });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async deleteBlocksByOwnerUsername(username) {
        try {
            const result = await this.blocks.destroy({ where: { blocker_username: username } });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }
}
module.exports = BlockRepository;
