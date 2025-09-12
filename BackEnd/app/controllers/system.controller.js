const systemService = require("../services/system.service");

exports.createReport = async (req, res, next) => {
    try {
        const userId = req.user.UserId;
        const file = req.file;
        const data = req.body;
        const result = await systemService.createReport(userId, file, data);
        res.send({
            "isError": !result,
            "message": result ? "Đã gửi báo cáo về hệ thống" : "Gửi báo cáo thất bại",
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
};