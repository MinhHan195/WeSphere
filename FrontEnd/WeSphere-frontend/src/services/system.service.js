import axiosClient from '../config/axiosClient';

const _url = '/system';

const systemService = {

    reportError: async (formData) => {
        return await axiosClient.post(_url + "/report_error", formData);
    }
}

export default systemService;