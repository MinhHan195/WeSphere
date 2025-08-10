const ApiError = require("../api-error")
const accountRepository = require("../repository/account.repository");
const userRepository = require("../repository/user.repository");
const SQL = require("../utils/sqlserver.util");
const Joi = require("../validation/user.validate")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.logIn = async (username, password) => {
    const AccountRepository = new accountRepository(SQL.client);
    const { value, error } = Joi.signInValidate.validate({ username, password });
    if (error) {
        throw new ApiError(400, error.details[0].message);
    }
    const account = await AccountRepository.getAccountByUsername(username);
    if (!account) {
        throw new ApiError(404, "Không tìm thấy tài khoản");
    }
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
        throw new ApiError(400, "Mật khẩu không chính xác");
    }
    const payload = {
        UserName: account.username,
        Role: "User",
        UserId: account.userId,
    }
    const JWTtoken = jwt.sign(payload, process.env.SECRET_CODE);
    return JWTtoken;
}

exports.logInWithFacebook = async (email, name) => {
    const AccountRepository = new accountRepository(SQL.client);
    const account = await AccountRepository.getAccountByEmail(email);
    if (account === undefined) {
        return false;
    }
    userId = account.userId;
    const payload = {
        UserName: name,
        Role: "User",
        UserId: userId,
    }
    const JWTtoken = jwt.sign(payload, process.env.SECRET_CODE);
    return JWTtoken;
}

exports.signUp = async (data) => {
    const AccountRepository = new accountRepository(SQL.client);
    const UserRepository = new userRepository(SQL.client);
    const user = await UserRepository.createUser(data);
    const newAccount = await AccountRepository.createAccount(data.username, data.avatar, user.userId, data.password);
    const payload = {
        UserName: data.username,
        Role: "User",
        UserId: user.userId,
    }
    const JWTtoken = await jwt.sign(payload, process.env.SECRET_CODE);
    return JWTtoken;
}

exports.checkUsername = async (username) => {
    const AccountRepository = new accountRepository(SQL.client);
    const account = await AccountRepository.getAccountByUsername(username);
    return account === undefined;
}