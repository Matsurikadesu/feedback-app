import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feedbacksLoadingStatus: 'loading',
    commentsLoadingStatus: 'idle',
    user: {id: '3', avatar: '/user/desu.webp', name: 'Desu', tag: 'desu123'},
    statusOptions: ['suggestion', 'planned', 'in-progress', 'live'],
    categoryOptions: ['UI', 'UX', 'Enhancement', 'Bug', 'Feature'],
    feedbacks: [],
    comments: [],
    filter: 'All',
    sortingMethod: 'Most Upvotes',
    amount: true
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
        feedbacksLoaded: (state, action) => {
            state.feedbacks = state.feedbacks.concat(action.payload);
        },
        commentsFetching: state => {state.commentsLoadingStatus = 'loading'},
        commentsFetched: (state, action) => {
            state.commentsLoadingStatus = 'idle';
            state.comments = action.payload;
        },
        commentAdded: (state, action) => {
            state.comments.push(action.payload);
        },
        feedbacksAmount: (state, action) => {
            state.amount = action.payload;
        },
        filterSelected: (state, action) => {
            state.filter = action.payload;
        },
        sortingSelected: (state, action) => {
            state.sortingMethod = action.payload;
        }
    }
});

const {actions} = feedbackSlice;

export default feedbackSlice.reducer;
export const {
    feedbacksFetching,
    feedbacksFetched,
    commentsFetched,
    commentsFetching,
    commentAdded,
    filterSelected,
    sortingSelected,
    feedbacksLoaded,
    feedbacksAmount
} = actions;