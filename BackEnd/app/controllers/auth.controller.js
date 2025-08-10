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
        return next(error)
    }
}


exports.logInWithFacebook = async (req, res, next) => {
    try {
        const { email, id, name, picture } = req.body.accessToken;
        const token = await authService.logInWithFacebook(email, id, name, picture);
        if (!token) {
            return res.send({
                isError: true,
                message: "Tài khoản không tồn tại, vui lòng đăng ký",
            });
        }
        return res.send({
            isError: false,
            message: "Đăng nhập bằng Facebook thành công",
            result: token,
        });
    } catch (error) {
        return next(error)
    }
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
        return next(error)
    }
}

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
        return next(error)
    }
}