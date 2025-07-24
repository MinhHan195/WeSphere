import axiosClient from '../config/axiosClient';

const _url = '/post';

const postService = {
    create: async (data) => {
        return await axiosClient.post(_url + '/create', data);
    },

    like: async (mode) => {
        return await axiosClient.get(_url + `/like/${mode}`);
    },

    getListSaves: async (id) => {
        return await axiosClient.get(_url + `/saves/${id}`)
    },

    rePost: async (feedId) => {
        return await axiosClient.get(_url + `/repost/${feedId}`)
    },

    getFeedDetail: async (feedId) => {
        return await axiosClient.get(_url + `/FeedDetail/${feedId}`)
    },

    getListFeeds: async () => {
        return await axiosClient.get(_url + '/ListFeeds');
    },
}

export default postService;