const db = require('../../models');
class FollowRepository {
    constructor() {
        this.follows = db.follows;
    }

    async isFollowing(followerId, followingId) {
        try {
            const total = await this.follows.count({
                where: {
                    follower_userId: followerId,
                    following_userId: followingId
                }
            });
            return total > 0;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Lỗi hệ thống");
        }
    }

    async getFollowers(userId) {
        try {
            const result = await this.follows.findAll({
                include: [{
                    model: db.users, as: 'follower',
                    require: true,
                    attributes: ['fullName'],
                    include: [{
                        model: db.accounts, as: 'account',
                        attributes: ['username', 'avatar'],
                        required: true
                    }]
                }],
                attributes: ['following_userId'],
                where: { follower_userId: userId }
            });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Lỗi hệ thống");
        }
    }

    async getFollowing(userId) {
        try {
            const result = await this.follows.findAll({
                include: [{
                    model: db.users, as: 'follower',
                    require: true,
                    attributes: ['fullName'],
                    include: [{
                        model: db.accounts, as: 'account',
                        attributes: ['username', 'avatar'],
                        required: true
                    }]
                }],
                attributes: ['following_userId'],
                where: { following_userId: userId }
            });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Lỗi hệ thống");
        }
    }

    async deleteFollowsByUserId(userId) {
        try {
            const result = await this.follows.destroy({ where: { follower_userId: userId } });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Lỗi hệ thống");
        }
    }

    async followUser(userId, user) {
        try {
            const result = await this.follows.create({
                follower_userId: user.UserId,
                following_userId: userId
            });
            return true;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }
    async unfollowUser(userId, user) {
        try {
            const result = await this.follows.destroy({
                where: {
                    follower_userId: user.UserId,
                    following_userId: userId
                }
            });
            return result > 0;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }
}

module.exports = FollowRepository;