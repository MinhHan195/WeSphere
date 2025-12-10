require('dotenv').config({ override: true });
const ApiError = require("../api-error");
const accountRepository = require("../repository/account.repository");
const userRepository = require("../repository/user.repository");
const followRepository = require("../repository/follow.repository");
const linkRepository = require("../repository/link.repository");
const limitRepository = require("../repository/limit.repository");
const blockRepository = require("../repository/block.repository");
const cloudinaryRepsitory = require("../repository/cloudinary.respository");
const Joi = require("../validation/user.validate");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.createJWToken = (account) => {
    const payload = {
        UserName: account.username,
        Role: "User",
        UserId: account.userId,
        avatar: account.avatar,
    };
    const JWTtoken = jwt.sign(payload, process.env.SECRET_CODE);
    return JWTtoken;
}

exports.logIn = async (username, password) => {
    const AccountRepository = new accountRepository();
    const { value, error } = Joi.signInValidate.validate({
        username,
        password,
    });
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

    return this.createJWToken(account);
};

exports.logInWithInstagram = async (code) => {
    // Lấy access token từ Instagram bằng code
    let authData = await this.getAccessTokenFromInstagram(code);
    // Lấy access token dài hạn
    const longLivedToken = await this.getLongLiveAccessToken(authData.accessToken);
    authData = { ...authData, ...longLivedToken };
    // Gọi API của Instagram để lấy thông tin người dùng
    const userInfo = await this.getUserInfoFromInstagram(authData.accessToken);
    // Kiểm tra nếu người dùng tồn tại trong hệ thống
    const AccountRepository = new accountRepository();
    const account = await AccountRepository.getAccountByUserId(authData.userId.toString());
    if (!account) {
        const payload = {
            userId: authData.userId,
            email: null,
            fullname: null,
            gender: null,
            phone: null,
            username: userInfo.username,
            avatar: userInfo.profile_picture_url,
            accessToken: authData.accessToken,
            password: crypto.randomBytes(16).toString('hex'),
        };
        const JWToken = await this.signUp(payload);
        return JWToken;
    }
    // Nếu tồn tại, đồng bộ lại thông tin trả về từ insta và database
    this.updateUser({
        userId: authData.userId.toString(),
        avatar: userInfo.profile_picture_url,
        username: userInfo.username,
    })
    // Tạo và trả về JWT token
    return this.createJWToken(account);
};

exports.getAccessTokenFromInstagram = async (code) => {
    const params = new URLSearchParams();
    params.append("client_id", process.env.IG_CLIENT_ID);
    params.append("client_secret", process.env.IG_CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", process.env.REDIRECT_URI);
    params.append("code", code);

    const response = await fetch(process.env.IG_OAUTH_URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
    });
    const data = await response.json();
    if (data.access_token) {
        return {
            accessToken: data.access_token,
            userId: data.user_id,
        }
    }
    throw new ApiError(400, "Không thể đăng nhập bằng tài khoản Instagram");
};

exports.getLongLiveAccessToken = async (shortLivedToken) => {
    const params = new URLSearchParams();
    params.append("grant_type", "ig_exchange_token");
    params.append("client_secret", process.env.IG_CLIENT_SECRET);
    params.append("access_token", shortLivedToken);

    const response = await fetch(`${process.env.IG_GRAPH_URL}/access_token?${params.toString()}`, {
        method: "GET",
    });
    const data = await response.json();
    if (data.access_token) {
        return {
            accessToken: data.access_token,
            expiresIn: data.expires_in,
        };
    }
    throw new ApiError(400, "Không thể đăng nhập bằng tài khoản Instagram");
};

exports.getUserInfoFromInstagram = async (accessToken) => {
    const params = new URLSearchParams();
    params.append("fields", "username,profile_picture_url");
    params.append("access_token", accessToken);
    const response = await fetch(`${process.env.IG_GRAPH_URL}/me?${params.toString()}`, {
        method: "GET",
    });
    const data = await response.json();
    if (data.username) {
        return data;
    }
    throw new ApiError(400, "Không thể đăng nhập bằng tài khoản Instagram");
}

exports.signUp = async (data) => {
    // data: userId, email, fullname, gender, phone, username, avatar, pasword
    const AccountRepository = new accountRepository();
    const UserRepository = new userRepository();
    const user = await UserRepository.createUser(data);
    const newAccount = await AccountRepository.createAccount(
        data.username,
        data.avatar,
        user.userId,
        data.password,
        data.accessToken,
    );
    const payload = {
        UserName: data.username,
        Role: "User",
        UserId: user.userId,
        avatar: data.avatar,
    };
    const JWTtoken = jwt.sign(payload, process.env.SECRET_CODE);
    return JWTtoken;
};

exports.checkUsername = async (username) => {
    const AccountRepository = new accountRepository();
    const account = await AccountRepository.getAccountByUsername(username);
    return account === undefined;
};

exports.getDetailUser = async (userId, ownUser) => {
    const UserRepository = new userRepository();
    const AccountRepository = new accountRepository();
    const FollowRepository = new followRepository();
    const LinkRepository = new linkRepository();

    let result = {};
    const account = await AccountRepository.getAccountByUserId(userId);
    const user = await UserRepository.getUserById(account.userId);
    const isFollowing = await FollowRepository.isFollowing(
        ownUser.UserId,
        account.userId
    );
    const listFollowers = await FollowRepository.getFollowers(account.userId);
    const listFollowing = await FollowRepository.getFollowing(account.userId);
    const listLinks = await LinkRepository.getListLinks(account.userId);
    listLinks.username = account.username;
    result = {
        id: account.userId,
        username: account.username,
        accessToken: account.accessToken,
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
        following: listFollowing.length,
    };
    // const userDetails = await UserRepository.getUserByUsername(username);

    return result;
};

exports.updateUser = async (data, file, username) => {
    const AccountRepository = new accountRepository();
    const UserRepository = new userRepository();
    const CloudinaryRepsitory = new cloudinaryRepsitory();
    const LinkRepository = new linkRepository();
    let result;
    if (file) {
        if (data.publicId !== "null" && data.publicId !== "") {
            result = await CloudinaryRepsitory.updateImage(file, data.publicId);
        } else {
            result = await CloudinaryRepsitory.uploadImagePath(file);
        }

        data.avatar = result.url;
        data.publicId = result.publicId;
    }
    const updateAccount = await AccountRepository.updateAccount(data);
    const updateUser = await UserRepository.updateUser(data);

    let listLinks = await LinkRepository.getListLinks(data.userId);

    if (data.listLinks !== undefined) {
        listLinks = JSON.parse(data.listLinks);
        for (const link of listLinks) {
            if (!link.link_id) {
                await LinkRepository.createLink(link, data.userId);
            } else {
                await LinkRepository.updateLink(link);
            }
        }
        listLinks = await LinkRepository.getListLinks(data.username);
    }
    const payload = {
        UserName: updateAccount.username,
        Role: "User",
        UserId: updateUser.userId,
        avatar: updateAccount.avatar,
    };
    const JWTtoken = jwt.sign(payload, process.env.SECRET_CODE);
    const authData = {
        token: JWTtoken,
        UserName: updateAccount.username,
        UserId: updateUser.userId,
    };
    return authData;
};

exports.updatePrivateMode = async (username, privateMode) => {
    const AccountRepository = new accountRepository();
    const res = await AccountRepository.updateAccount({
        privateMode: privateMode,
        username: username,
    });
    return res;
};

exports.updateOnlineStatus = async (username, onlineStatus) => {
    const AccountRepository = new accountRepository();
    const res = await AccountRepository.updateAccount({
        onlineMode: onlineStatus,
        username: username,
    });
    return res;
};

exports.getListUserBlock = async (userId) => {
    const BlockRepository = new blockRepository();
    const res = await BlockRepository.getListUserBlock(userId);
    return res;
};

exports.getListUserLimit = async (userId) => {
    const LimitRepository = new limitRepository();
    const res = await LimitRepository.getListUserLimit(userId);
    return res;
};

exports.removeLimitedUser = async (limitedUsername, ownerUsername) => {
    const LimitRepository = new limitRepository();
    const AccountRepository = new accountRepository();
    const limitedUserId = await AccountRepository.getUserIdFromUsername(limitedUsername);
    const ownerUserId = await AccountRepository.getUserIdFromUsername(ownerUsername);
    await LimitRepository.removeLimitedUser(limitedUserId, ownerUserId);
    const res = await LimitRepository.getListUserLimit(ownerUserId);
    return res;
};

exports.removeBlockedUser = async (blockedUsername, ownerUsername) => {
    const AccountRepository = new accountRepository();
    const BlockRepository = new blockRepository();
    const blockedUserId = await AccountRepository.getUserIdFromUsername(blockedUsername);
    const ownerUserId = await AccountRepository.getUserIdFromUsername(ownerUsername);
    await BlockRepository.removeBlockedUser(blockedUserId, ownerUserId);
    const res = await BlockRepository.getListUserBlock(ownerUserId);
    return res;
};

exports.deactivateAccount = async (username) => {
    const AccountRepository = new accountRepository();
    const res = await AccountRepository.deactivateAccount(username);
    if (res == 1) {
        return true;
    }
    return false;
};

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

    await LinkRepository.deleteLinksByUserId(data.userId);
    await FollowRepository.deleteFollowsByUserId(data.userId);
    await BlockRepository.deleteBlocksByOwnerUserId(data.userId);
    await LimitRepository.deleteLimitsByOwnerUserId(data.userId);
    const result = await AccountRepository.deleteAccount(AuthUsername);

    if (!result) {
        throw new ApiError(500, "Xóa tài khoản thất bại");
    } else {
        const res = await UserRepository.deleteUser(data.id);
        return res;
    }
};

exports.followUser = async (username, mode, user) => {
    const FollowRepository = new followRepository();
    const AccountRepository = new accountRepository();
    const userId = await AccountRepository.getUserIdFromUsername(username);
    let res;
    if (mode) {
        res = await FollowRepository.followUser(userId, user);
    } else {
        res = await FollowRepository.unfollowUser(userId, user);
    }
    return res;
};