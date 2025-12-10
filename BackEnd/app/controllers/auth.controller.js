const ApiError = require("../api-error");
const authService = require("../services/auth.service");

exports.logIn = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const token = await authService.logIn(username, password);
        return res.send({
            isError: false,
            message: "Đăng nhập thành công",
            result: token,
        });
    } catch (error) {
        return next(error);
    }
};

exports.logInWithInstagram = async (req, res, next) => {
    try {
        const { code } = req.body;
        const token = await authService.logInWithInstagram(code);
        return res.send({
            isError: false,
            message: "Đăng nhập bằng Instagram thành công",
            result: token,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

exports.getAccessToken = async (req, res, next) => {
    console.log(req.body);
    return res.send({
        message: "Lấy access token thành công",
    })
}

exports.signUp = async (req, res, next) => {
    try {
        const userData = req.body;
        const token = await authService.signUp(userData);
        return res.send({
            isError: false,
            message: "Đăng ký thành công",
            result: token,
        });
    } catch (error) {
        return next(error);
    }
};

exports.checkUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const isAvailable = await authService.checkUsername(username);
        return res.send({
            isError: false,
            message: isAvailable ? null : "Username đã tồn tại.",
            result: isAvailable,
        });
    } catch (error) {
        return next(error);
    }
};

exports.getDetailUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { user } = req;
        const userDetails = await authService.getDetailUser(userId, user);
        return res.send({
            isError: false,
            message: "Lấy thông tin người dùng thành công",
            data: userDetails,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

exports.updatePrivateMode = async (req, res, next) => {
    try {
        const { username, privateMode } = req.params;
        const result = await authService.updatePrivateMode(
            username,
            privateMode
        );
        return res.send({
            isError: false,
            message: "Cập nhật chế độ riêng tư thành công",
            data: result,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

exports.updateOnlineStatus = async (req, res, next) => {
    try {
        const { username, onlineStatus } = req.params;
        const result = await authService.updateOnlineStatus(
            username,
            onlineStatus
        );
        return res.send({
            isError: false,
            message: "Cập nhật trạng thái trực tuyến thành công",
            data: result,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

exports.deactivateAccount = async (req, res, next) => {
    try {
        const username = req.user.UserName;
        const result = await authService.deactivateAccount(username);
        return res.send({
            isError: !result,
            message: result
                ? "Vô hiệu hóa tài khoản thành công"
                : "Vô hiệu hóa tài khoản thất bại",
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

exports.deleteAccount = async (req, res, next) => {
    try {
        const data = req.body;
        const AuthUsername = req.user.UserName;
        data.userId = req.user.UserId;
        const result = await authService.deleteAccount(AuthUsername, data);
        return res.send({
            isError: !result,
            message: result
                ? "Xóa tài khoản thành công"
                : "Xóa tài khoản thất bại",
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

exports.followUser = async (req, res, next) => {
    try {
        const { username, mode } = req.params;
        const { user } = req;
        const result = await authService.followUser(username, mode, user);
        return res.send({
            isError: !result,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

exports.test = async (req, res, next) => {
    try {
        const user = req.user;
        const data = req.body;
        const result = await authService.test(data, user);
        return res.send({
            result: result,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};
