const authService = require("../services/auth.service");

exports.updateUser = async (req, res, next) => {
    try {
        const file = req.file;
        const data = req.body;
        const username = req.user.UserName;
        data.userId = req.user.UserId;
        const authData = await authService.updateUser(data, file, username);
        return res.send({
            isError: false,
            message: "Cập nhật thông tin người dùng thành công",
            result: authData,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

exports.getListUserBlock = async (req, res, next) => {
    try {
        const userId = req.user.UserId;
        const blockedUsers = await authService.getListUserBlock(userId);
        return res.send({
            isError: false,
            result: blockedUsers,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

exports.getListUserLimit = async (req, res, next) => {
    try {
        const userId = req.user.UserId;
        const limitedUsers = await authService.getListUserLimit(userId);
        return res.send({
            isError: false,
            result: limitedUsers,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

exports.removeLimitedUser = async (req, res, next) => {
    try {
        const { limitedUsername, ownerUsername } = req.params;
        const data = await authService.removeLimitedUser(limitedUsername, ownerUsername);
        return res.send({
            isError: false,
            message: "Xóa người dùng khỏi danh sách hạn chế thành công",
            result: data,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

exports.removeBlockedUser = async (req, res, next) => {
    try {
        const { blockedUsername, ownerUsername } = req.params;
        const data = await authService.removeBlockedUser(blockedUsername, ownerUsername);
        return res.send({
            isError: false,
            message: "Xóa người dùng khỏi danh sách chặn thành công",
            result: data,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}