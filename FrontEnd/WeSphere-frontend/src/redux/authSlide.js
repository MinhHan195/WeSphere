import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        token: null,
        alert: {
            message: '',
        },
        user: {
            id: 'jaksdaknfkajlndfkajdsnf',
            username: 'mh.minh_han',
            followers: 1,
            following: 0,
            bio: 'Chào mừng bạn đến với nhật ký của tôi',
            fullname: 'Minh Hân',
            email: 'mh.minh_han@example.com',
            privateMode: "true",
            phone: '0123456789',
            gender: 'Nam',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
            listLinks: [
                {
                    title: "facebook",
                    url: "https://www.facebook.com/minh.han195/"
                },
                {
                    title: "tiktok",
                    url: "https://www.tiktok.com/@min.hyun195"
                },
                {
                    title: "threads",
                    url: "https://www.threads.com/@mh.minh_han"
                },
                {
                    title: "threads",
                    url: "https://www.threads.com/@mh.minh_han"
                }
            ]
        },
        error: '',
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.clear();
            window.location.href = '/auth';
        },
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        setAlert: (state, { payload }) => {
            state.alert.message = payload.message || '';
        },

        updateUser: (state, { payload }) => {
            state.user = { ...state.user, ...payload };
            state.user.listLinks = JSON.parse(payload.listLinks || '[]');
        },
    }
});

export const { setLoading, setAlert, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;