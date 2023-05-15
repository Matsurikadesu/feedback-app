import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feedbacksLoadingStatus: 'idle',
    feedbacks: []
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        feedbacksFetching: state => {state.feedbacksLoadingStatus = 'loading'},
        feedbacksFetched: (state, action) => {
            state.feedbacksLoadingStatus = 'idle';
            state.feedbacks = action.payload;
        },
        feedbacksFetchingError: state => {state.feedbacksLoadingStatus = 'error'}
    }
});

const {actions, reducer} = feedbackSlice;

export default reducer;
export const {
    feedbacksFetching,
    feedbacksFetched,
    feedbacksFetchingError
} = actions;