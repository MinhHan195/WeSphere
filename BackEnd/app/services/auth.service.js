const ApiError = require("../api-error")
const accountRepository = require("../repository/account.repository");
const userRepository = require("../repository/user.repository");
const followRepository = require("../repository/follow.repository");
const linkRepository = require("../repository/link.repository");
const limitRepository = require("../repository/limit.repository");
const blockRepository = require("../repository/block.repository");
const cloudinaryRepsitory = require("../repository/cloudinary.respository");
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
        avatar: account.avatar,
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
        UserName: account.username,
        Role: "User",
        UserId: userId,
        avatar: account.avatar,
    }
    const JWTtoken = jwt.sign(payload, process.env.SECRET_CODE);
    return JWTtoken;
}

exports.signUp = async (data) => {
    const AccountRepository = new accountRepository();
    const UserRepository = new userRepository();
    const user = await UserRepository.createUser(data);
    const newAccount = await AccountRepository.createAccount(data.username, data.avatar, user.userId, data.password);
    const payload = {
        UserName: data.username,
        Role: "User",
        UserId: user.userId,
        avatar: data.avatar,
    }
    const JWTtoken = jwt.sign(payload, process.env.SECRET_CODE);
    return JWTtoken;
}

exports.checkUsername = async (username) => {
    const AccountRepository = new accountRepository(SQL.client);
    const account = await AccountRepository.getAccountByUsername(username);
    return account === undefined;
}

exports.getDetailUser = async (username, ownUser) => {
    const UserRepository = new userRepository(SQL.client);
    const AccountRepository = new accountRepository(SQL.client);
    const FollowRepository = new followRepository(SQL.client);
    const LinkRepository = new linkRepository(SQL.client);

    let result = {};
    const account = await AccountRepository.getAccountByUsername(username);
    const user = await UserRepository.getUserById(account.userId);
    const isFollowing = await FollowRepository.isFollowing(ownUser.UserName, account.username);
    const listFollowers = await FollowRepository.getFollowers(account.username);
    const listFollowing = await FollowRepository.getFollowing(account.username);
    const listLinks = await LinkRepository.getListLinks(account.username);
    result = {
        id: account.userId,
        username: account.username,
        bio: account.bio,
        privateMode: account.privateMode,
        avatar: account.avatar,
        publicId: account.publicId,
        fullname: user.fullname,
        phone: user.phone,
        gender: user.gender,
        email: user.email,
        onlineMode: account.onlineMode,
        listLinks: listLinks,
        isFollowing: isFollowing,
        followers: listFollowers.length,
        following: listFollowing.length
    }
    // const userDetails = await UserRepository.getUserByUsername(username);

    return result;
}

exports.updateUser = async (data, file) => {
    // console.log(JSON.parse(data.listLinks));
    const AccountRepository = new accountRepository(SQL.client);
    const UserRepository = new userRepository(SQL.client);
    const CloudinaryRepsitory = new cloudinaryRepsitory();
    const LinkRepository = new linkRepository(SQL.client);
    let result;
    if (file) {
        if (data.publicId !== "null" && data.publicId !== '') {
            result = await CloudinaryRepsitory.updateImage(file, data.publicId);
        }
        else {
            result = await CloudinaryRepsitory.uploadImagePath(file);
        }

        data.avatar = result.url;
        data.publicId = result.publicId;
    }



    const updateAccount = await AccountRepository.updateAccount(data);
    // console.log(updateAccount);
    const updateUser = await UserRepository.updateUser(data);

    let listLinks = await LinkRepository.getListLinks(data.username);

    if (data.listLinks !== undefined) {
        listLinks = JSON.parse(data.listLinks);
        for (const link of listLinks) {
            if (!link.link_id) {
                await LinkRepository.createLink(link, data.username);
            } else {
                await LinkRepository.updateLink(link);
            }
        }
        listLinks = await LinkRepository.getListLinks(data.username);
    }
    const dataResult = { ...updateAccount, ...updateUser, listLinks };
    return dataResult;
}


exports.updatePrivateMode = async (username, privateMode) => {
    const AccountRepository = new accountRepository(SQL.client);
    const res = await AccountRepository.updateAccount({ privateMode: privateMode, username: username });
    return res;
}

exports.updateOnlineStatus = async (username, onlineStatus) => {
    const AccountRepository = new accountRepository(SQL.client);
    const res = await AccountRepository.updateAccount({ onlineMode: onlineStatus, username: username });
    return res;
}

exports.getListUserBlock = async (username) => {
    const BlockRepository = new blockRepository();
    const res = await BlockRepository.getListUserBlock(username);
    return res;
}

exports.getListUserLimit = async (username) => {
    const LimitRepository = new limitRepository();
    const res = await LimitRepository.getListUserLimit(username);
    return res;
}

exports.removeLimitedUser = async (limitedUsername, ownerUsername) => {
    const LimitRepository = new limitRepository();
    await LimitRepository.removeLimitedUser(limitedUsername, ownerUsername);
    const res = await LimitRepository.getListUserLimit(ownerUsername);
    return res;
}

exports.removeBlockedUser = async (blockedUsername, ownerUsername) => {

    await AccountRepository.removeBlockedUser(blockedUsername, ownerUsername);
    const res = await AccountRepository.getListUserBlock(ownerUsername);
    return res;
}

exports.deactivateAccount = async (username) => {
    const AccountRepository = new accountRepository(SQL.client);
    const res = await AccountRepository.deactivateAccount(username);
    if (res == 1) {
        return true;
    }
    return false;
}

exports.deleteAccount = async (AuthUsername, data) => {

    const AccountRepository = new accountRepository();
    const UserRepository = new userRepository();
    const LinkRepository = new linkRepository();
    const BlockRepository = new blockRepository();
    const LimitRepository = new limitRepository();
    const FollowRepository = new followRepository();
    const account = await AccountRepository.getAccountByUsername(data.username);
    if (!account) {
        throw new ApiError(404, "Tài khoản không tồn tại");
    }

    if (data.username !== AuthUsername) {
        throw new ApiError(403, "Bạn không có quyền xóa tài khoản này");
    }

    const isMatch = await bcrypt.compare(data.password, account.password);
    if (!isMatch) {
        throw new ApiError(400, "Mật khẩu không chính xác");
    }

    await LinkRepository.deleteLinksByUsername(data.username);
    await FollowRepository.deleteFollowsByUsername(data.username);
    await BlockRepository.deleteBlocksByOwnerUsername(data.username);
    await LimitRepository.deleteLimitsByOwnerUsername(data.username);
    const result = await AccountRepository.deleteAccount(AuthUsername);

    if (!result) {
        throw new ApiError(500, "Xóa tài khoản thất bại");
    } else {
        const res = await UserRepository.deleteUser(data.id);
        return res;
    }
}

exports.followUser = async (username, mode, user) => {
    const FollowRepository = new followRepository();
    let res;
    if (mode) {
        res = await FollowRepository.followUser(username, user);
    } else {
        res = await FollowRepository.unfollowUser(username, user);
    }
    return res;
}


exports.test = async (data, user) => {
    const LinkRepository = new linkRepository();
    let result = await LinkRepository.updateLink(data);
    console.log(result);
    return result;
}