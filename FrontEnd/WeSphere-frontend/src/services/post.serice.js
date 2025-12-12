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

    getListFeeds: async (startIndex) => {
        return await axiosClient.get(_url + '/ListFeeds?index=' + startIndex);
    },

    getListFeedsByUserId: async (userId) => {
        return await axiosClient.get(_url + `/ListFeeds/${userId}`);
    },

    getListMediasByUserId: async (username) => {
        return await axiosClient.get(_url + `/ListMedias/${username}`);
    },

    getListRePostsByUserId: async (userId) => {
        return await axiosClient.get(_url + `/ListRePosts/${userId}`);
    },

    getListFavoritePost: async () => {
        return await axiosClient.get(_url + '/ListFavoritePost');
    },

    getListSavedPost: async () => {
        return await axiosClient.get(_url + '/ListSavedPost');
    },

    saveFeed: async (feedId) => {
        return await axiosClient.get(_url + `/SaveFeed/${feedId}`)
    },

    unSaveFeed: async (feedId) => {
        return await axiosClient.get(_url + `/UnSaveFeed/${feedId}`)
    },

    deleteFeed: async (feedId) => {
        return await axiosClient.get(_url + `/DeleteFeed/${feedId}`)
    }


}

export default postService;