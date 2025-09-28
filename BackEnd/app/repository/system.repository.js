const db = require("../../models");
const ApiError = require("../api-error");

class SystemRepository {
    constructor() {
        this.reports = db.reports;
        console.log(this.reports);
    }

    async createReport(userId, file, data) {
        try {
            const result = await this.reports.create({
                description: data.description,
                userId: userId,
                media: file.url,
                publicId: file.publicId
            });
            return result.dataValues;
        } catch (error) {
            console.error("Error creating report:", error);
            throw new ApiError(500, "Error creating report");
        }
    }
}

module.exports = SystemRepository