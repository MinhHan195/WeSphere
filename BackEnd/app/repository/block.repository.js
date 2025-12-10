const ApiError = require("../api-error");
const db = require('../../models');
class BlockRepository {
    constructor() {
        this.blocks = db.blocks;
    }

    async getListUserBlock(userId) {
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
                    blocker_id: userId
                }
            });
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async removeBlockedUser(blockedUserId, ownerUserId) {
        try {
            const result = await this.blocks.destroy({
                where: {
                    blocked_id: blockedUserId,
                    blocker_id: ownerUserId
                }
            });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async deleteBlocksByOwnerUserId(userId) {
        try {
            const result = await this.blocks.destroy({ where: { blocker_id: userId } });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }
}
module.exports = BlockRepository;
