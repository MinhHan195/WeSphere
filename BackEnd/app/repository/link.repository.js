const db = require('../../models');

class LinkRepository {
    constructor() {
        this.links = db.links;
    }

    async getListLinks(userId) {
        try {
            const result = await this.links.findAll({ where: { userId: userId } });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Lỗi hệ thống");
        }
    }

    async createLink(link, userId) {
        try {
            const result = await this.links.create({
                userId: userId,
                title: link.title,
                url: link.url
            });
            console.log(result);
            return result.dataValues;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Lỗi hệ thống");
        }
    }

    async updateLink(link) {
        try {
            const result = await this.links.update(
                {
                    title: link.title,
                    url: link.url
                },
                {
                    where: {
                        link_id: link.link_id,
                        userId: link.userId
                    }
                }
            );
            if (result[0] === 0) {
                throw new ApiError(404, "Link not found or no changes made");
            }
            return result[0];
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Lỗi hệ thống");
        }
    }

    async deleteLinksByUserId(userId) {
        try {
            const result = await this.links.destroy({ where: { userId: userId } });
            return result;
        } catch (error) {
            console.log(error);
            throw new ApiError(500, "Lỗi hệ thống");
        }
    }

}

module.exports = LinkRepository;