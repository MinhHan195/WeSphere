const db = require('../../models');
class FollowRepository {
    constructor() {
        this.follows = db.follows;
    }

    async isFollowing(followerId, followingId) {
        try {
            const total = await this.follows.count({
                where: {
                    follower_username: followerId,
                    following_username: followingId
                }
            });
            return total > 0;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Lỗi hệ thống");
        }
    }

    async getFollowers(username) {
        try {
            const result = await this.follows.findAll({ attributes: ['following_username'], where: { follower_username: username } });
            return result.map(row => row.following_username);
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Lỗi hệ thống");
        }
    }

    async getFollowing(username) {
        try {
            const result = await this.follows.findAll({ attributes: ['follower_username'], where: { following_username: username } });
            return result.map(row => row.follower_username);
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Lỗi hệ thống");
        }
    }

    async deleteFollowsByUsername(username) {
        try {
            const result = await this.follows.destroy({ where: { follower_username: username } });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Lỗi hệ thống");
        }
    }

    async followUser(username, user) {
        try {
            const result = await this.follows.create({
                follower_username: user.UserName,
                following_username: username
            });
            console.log(result);
            return true;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Internal Server Error");
        }
    }
    async unfollowUser(username, user) {
        try {
            const result = await this.follows.destroy({
                where: {
                    follower_username: user.UserName,
                    following_username: username
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