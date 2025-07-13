import axios from 'axios';
import { _AUTH } from '../constants/_auth';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5178/api',
    headers: {
        Accept: 'application/json',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem(_AUTH.TOKEN_NAME);
    if (token) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(_AUTH.TOKEN_NAME)}`
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
},
    (error) => {
        if (error.response.data) {
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(error);
        }
    }
);

export default axiosClient;
