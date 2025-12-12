const ApiError = require("../api-error");
const db = require('../../models');
class BlockRepository {
    constructor() {
        this.blocks = db.blocks;
    }

    async createBlock(userId, ownUserId) {
        try {
            const result = await this.blocks.create({ blocker_id: ownUserId, blocked_id: userId });
            return "Đã chặn"
        } catch (error) {
            console.log("createBlock: ", error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async getListUserIdBlock(userId) {
        try {
            const result = await this.blocks.findAll({
                attributes: ['blocked_id'],
                where: {
                    blocker_id: userId
                }
            });
            let list = [];
            for (const item of result) {
                list.push(item.dataValues.blocked_id)
            }
            return list;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }

    async getListUserBlock(userId) {
        try {
            const result = await this.blocks.findAll({
                include: [{
                    model: db.users,
                    attributes: ['userId', 'fullname'],
                    required: true,
                    as: 'blocked',
                    include: [{
                        model: db.accounts, attributes: ['username', 'avatar'],
                        required: true,

                    }],
                }],
                attributes: [],
                where: {
                    blocker_id: userId
                }
            });
            let list = []
            for (const item of result) {
                list.push(item.dataValues.blocked)
            }
            return list;
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
