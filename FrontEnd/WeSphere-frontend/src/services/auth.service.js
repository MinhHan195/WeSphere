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
    }
};

export default authService;
