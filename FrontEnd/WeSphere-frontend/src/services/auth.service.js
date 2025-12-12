import axiosClient from '../config/axiosClient';

const _url = '/auth';
const authService = {
    login: async (credentials) => {
        return await axiosClient.post(_url + '/login', credentials);
    },

    loginWithInstagram: async (code) => {
        return await axiosClient.post(_url + '/login/instagram', { code });
    },

    logout: async () => {
        return await axiosClient.post(_url + '/logout');
    },
    register: async (userData) => {
        return await axiosClient.post(_url + '/register', userData);
    },

    updateUser: async (userData) => {
        return await axiosClient.put(_url + '/update', userData);
    },

    getUser: async (userId) => {
        return await axiosClient.get(_url + `/GetProfileData/${userId}`);
    },

    updatePrivateMode: async (privateMode, username) => {
        return await axiosClient.patch(_url + `/updatePrivateMode/${username}/${privateMode}`);
    },

    sendHeartbeat: async (userId) => {
        return await axiosClient.post(_url + '/isAlive', { userId });
    },

    updateOnlineStatus: async (username, onlineStatus) => {
        return await axiosClient.patch(_url + `/updateOnlineStatus/${username}/${onlineStatus}`);
    },

    getListUserBlock: async () => {
        return await axiosClient.get(_url + `/ListUserBlock`);
    },

    getListUserLimit: async () => {
        return await axiosClient.get(_url + `/ListUserLimit`);
    },

    removeBlockedUser: async (blockedUserId) => {
        return await axiosClient.patch(_url + `/removeBlockedUser/${blockedUserId}`)
    },

    removeLimitedUser: async (limitedUserId) => {
        return await axiosClient.patch(_url + `/removeLimitedUser/${limitedUserId}`)
    },

    deleteAccount: async (payload) => {
        return await axiosClient.delete(_url + '/deleteAccount', { data: payload })
    },

    deactivateAccount: async (userId) => {
        return await axiosClient.patch(_url + `/deactivateAccount/${userId}`)
    },

    signUp: async (userData) => {
        return await axiosClient.post(_url + '/register', userData);
    },

    checkUsername: async (username) => {
        return await axiosClient.get(_url + `/checkUsername/${username}`);
    },

    followUser: async (username, mode) => {
        return await axiosClient.post(_url + `/followUser/${username}/${mode}`);
    },

    blockUser: async (userId) => {
        return await axiosClient.get(_url + `/block/${userId}`)
    },

    restricUser: async (userId) => {
        return await axiosClient.get(_url + `/restric/${userId}`)
    },
};

export default authService;
