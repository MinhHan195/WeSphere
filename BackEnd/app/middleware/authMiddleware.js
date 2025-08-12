const jwt = require("jsonwebtoken");
const SQL = require("../utils/sqlserver.util");
const ApiError = require("../api-error");
const accountRepository = require("../repository/account.repository");
require("dotenv").config();


exports.verifyToken = async (req, res, next) => {
    // B1: Kiểm tra xem header có token hay không
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return next(new ApiError(401, "Người dùng chưa đăng nhập!"))
    }
    // B2: kiểm tra token
    try {
        const decoded = jwt.verify(token, process.env.SECRET_CODE);
        // Kiểm tra id trong token có hợp lệ không
        const AccountRepository = new accountRepository(SQL.client);
        const user = await AccountRepository.getAccountByUsername(decoded.UserName);
        if (!user) {
            return next(new ApiError(404, "Acount not found"));
        }
        // B3: Lưu thông tin trong token vào req.user
        req.user = decoded;
        // B4: Chuyển đến controller
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new ApiError(401, "Token đã hết hạn!"))
        } else {
            return next(new ApiError(403, "Token khong hop le"));
        }
    }
}; 