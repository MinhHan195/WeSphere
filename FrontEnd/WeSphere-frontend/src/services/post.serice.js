import axiosClient from '../config/axiosClient';

const _url = '/post';

const postService = {
    create: async (data) => {
        return await axiosClient.post(_url + '/create', data);
    }
}

export default postService;