import { createSlice } from '@reduxjs/toolkit';

const createSlide = createSlice({
    name: 'create',
    initialState: {
        show: false,
        dragMoved: false
    },
    reducers: {
        setModal: (state, { payload }) => {
            state.show = payload;
        },
    },
});

export const { setModal } = createSlide.actions;

export default createSlide.reducer;