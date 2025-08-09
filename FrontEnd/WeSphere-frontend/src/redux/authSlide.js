import { createSlice } from '@reduxjs/toolkit';
import { _AUTH } from '../constants/_auth.js';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        theme: null,
        loading: false,
        token: null,
        alert: {
            message: '',
        },
        notifycation: {
            show: false,
            message: "",
            isError: false
        },
        user: {
            id: 'jaksdaknfkajlndfkajdsnf',
            username: 'mh.minh_han',
            followers: 1,
            following: 0,
            bio: 'Chào mừng bạn đến với nhật ký của tôi',
            fullname: 'Minh Hân',
            email: 'mh.minh_han@example.com',
            privateMode: true,
            phone: '0123456789',
            onlineStatus: "friends", // "nobody", "friends", "everyone"
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
        listNotifycation: [
            {
                type: "mention",
                data: {
                    username: "user123",
                    avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
                    postId: "post123",
                    timeCreate: "2025-08-07T12:46:20.123Z",
                },
            },
            {
                type: "new_feed",
                data: {
                    username: "user123",
                    avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
                    timeCreate: "2025-08-07T12:46:20.123Z",
                    postId: "hbkjfnklasdlkadskjlfnk"
                }
            },
            {
                type: "request_follow",
                data: {
                    username: "user123",
                    avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
                    timeCreate: "2025-08-07T12:46:20.123Z",
                    id: "alknklads fkasdkjf",
                    NotificationId: "akajjđkạnkádsạdkạdjándj"
                }
            },
            {
                type: "system_notification",
                data: {
                    message: "Thông báo hệ thống",
                    timeCreate: "2025-08-07T12:46:20.123Z",
                    link: "/system-notification"
                }
            }

        ],
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.clear();
        },
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        setAlert: (state, { payload }) => {
            state.alert.message = payload.message || '';
        },

        setNotifycation: (state, { payload }) => {
            state.notifycation = { ...state.notifycation, ...payload };
        },

        updateUser: (state, { payload }) => {
            state.user = { ...state.user, ...payload };
            state.user.listLinks = JSON.parse(payload.listLinks || '[]');
        },

        setTheme: (state, { payload }) => {
            state.theme = payload;
            localStorage.setItem(_AUTH.THEME, payload);
        }
    }
});

export const { setLoading, setAlert, logout, updateUser, setNotifycation, setTheme } = authSlice.actions;

export default authSlice.reducer;