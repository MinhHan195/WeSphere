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
            fullname: 'Minh Hân',
            email: 'mh.minh_han@example.com',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
        },
        error: '',
    },
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        setAlert: (state, { payload }) => {
            state.alert.message = payload.message || '';
        },
    }
});

export const { setLoading, setAlert } = authSlice.actions;

export default authSlice.reducer;