import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feedbacksLoadingStatus: 'idle',
    feedbacks: [],
    feedbackIndex: -1,
    currentFeedback: false
};

const feedbackSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        feedbacksFetching: state => {state.feedbacksLoadingStatus = 'loading'},
        feedbacksFetched: (state, action) => {
            state.feedbacksLoadingStatus = 'idle';
            state.feedbacks = action.payload;
        },
        feedbacksFetchingError: state => {state.feedbacksLoadingStatus = 'error'},
        feedbackOpened: (state, action) => {
            state.feedbackIndex = action.payload.id;
            state.currentFeedback = action.payload.feedback;
        }
    }
});

const {actions, reducer} = feedbackSlice;

export default reducer;
export const {
    feedbacksFetching,
    feedbacksFetched,
    feedbacksFetchingError,
    feedbackOpened
} = actions;