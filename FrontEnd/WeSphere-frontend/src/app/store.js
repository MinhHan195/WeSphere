import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlide';
import createReducer from '../redux/createSLide';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        create: createReducer,
    },
}); 