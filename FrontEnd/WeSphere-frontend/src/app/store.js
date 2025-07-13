import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlide';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
}); 