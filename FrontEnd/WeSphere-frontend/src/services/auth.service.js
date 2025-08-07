import axiosClient from '../config/axiosClient';

const _url = '/auth';
const authService = {
    login: async (credentials) => {
        return await axiosClient.post(_url + '/login', credentials);
    },
    loginWithFacebook: async (accessToken) => {
        return await axiosClient.post(_url + '/login/facebook', { accessToken });
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

    getUser: async (userName) => {
        return await axiosClient.get(_url + `/GetProfileData/${userName}`);
    },

    updatePrivateMode: async (privateMode, userId) => {
        return await axiosClient.patch(_url + `/updatePrivateMode/${userId}/${privateMode}`);
    },

    sendHeartbeat: async (userId) => {
        return await axiosClient.post(_url + '/isAlive', { userId });
    },

    updateOnlineStatus: async (userId, onlineStatus) => {
        return await axiosClient.patch(_url + `/updateOnlineStatus/${userId}/${onlineStatus}`);
    },

    getListUserBlock: async (userId) => {
        return await axiosClient.get(_url + `/ListUserBlock/${userId}`);
    },

    getListUserLimit: async (userId) => {
        return await axiosClient.get(_url + `/ListUserLimit/${userId}`);
    },

    removeBlockedUser: async (blockedUserId, ownerUserId) => {
        return await axiosClient.patch(_url + `/removeBlockedUser/${blockedUserId}/${ownerUserId}`)
    },

    removeLimitedUser: async (limitedUserId, ownerUserId) => {
        return await axiosClient.patch(_url + `/removeLimitedUser/${limitedUserId}/${ownerUserId}`)
    },

    deleteAccount: async (payload) => {
        return await axiosClient.delete(_url + '/deleteAccount', { data: payload })
    },

    deactivateAccount: async (userId) => {
        return await axiosClient.patch(_url + `/deactivateAccount/${userId}`)
    }
};

export default authService;
