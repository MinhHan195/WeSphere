import axiosClient from '../config/axiosClient';

const _url = '/post';

const postService = {
    create: async (data) => {
        return await axiosClient.post(_url + '/create', data);
    },

    like: async (mode, feedId) => {
        return await axiosClient.get(_url + `/like/${mode}/${feedId}`);
    },

    getListSaves: async (username) => {
        return await axiosClient.get(_url + `/saves/${username}`)
    },

    rePost: async (feedId, mode) => {
        return await axiosClient.get(_url + `/repost/${feedId}/${mode}`)
    },

    getFeedDetail: async (feedId) => {
        return await axiosClient.get(_url + `/FeedDetail/${feedId}`)
    },

    getListFeeds: async () => {
        return await axiosClient.get(_url + '/ListFeeds');
    },

    getListFeedsByUserId: async (username) => {
        return await axiosClient.get(_url + `/ListFeeds/${username}`);
    },

    getListMediasByUserId: async (username) => {
        return await axiosClient.get(_url + `/ListMedias/${username}`);
    },

    getListRePostsByUserId: async (username) => {
        return await axiosClient.get(_url + `/ListRePosts/${username}`);
    },

    getListFavoritePost: async () => {
        return await axiosClient.get(_url + '/ListFavoritePost');
    },

    getListSavedPost: async () => {
        return await axiosClient.get(_url + '/ListSavedPost');
    }
}

export default postService;