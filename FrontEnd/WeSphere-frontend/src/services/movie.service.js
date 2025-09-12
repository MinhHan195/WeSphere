import axiosClient from '../config/axiosClient';

const _url = '/movie';
const movieService = {

    rate: async (data) => {
        return await axiosClient.post(_url + '/rate', data);
    },

    getMovie: async (movie_id) => {
        return await axiosClient.get(_url + '/getMovie/' + movie_id);
    }
}

export default movieService;