import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        token: null,
        alert: {
            message: '',
        },
        user: {},
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