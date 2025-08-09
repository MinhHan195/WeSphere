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

    getListFeedsByUserId: async () => {
        return await axiosClient.get(_url + '/ListFeeds/User');
    },

    getListMediasByUserId: async () => {
        return await axiosClient.get(_url + '/ListMedias/User');
    },

    getListRePostsByUserId: async () => {
        return await axiosClient.get(_url + '/ListRePosts/User');
    },

    getListFavoritePost: async () => {
        return await axiosClient.get(_url + '/ListFavoritePost');
    },

    getListSavedPost: async () => {
        return await axiosClient.get(_url + '/ListSavedPost');
    }
}

export default postService;