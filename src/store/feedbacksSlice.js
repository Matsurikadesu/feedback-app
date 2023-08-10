import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feedbacksLoadingStatus: 'loading',
    commentsLoadingStatus: 'loading',
    user: {id: '2', avatar: 'https://media.tenor.com/gIKfNZd5YkQAAAAd/pudge-dance.gif', name: 'Ящер', tag: 'Ящер'},
    filter: 'All',
    sortingMethod: 'Most Upvotes',
    tags: ['UI', 'UX', 'Enhancement', 'Bug', 'Feature'],
    isEmpty: false
};

const feedbackSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        feedbacksFetching: state => {state.feedbacksLoadingStatus = 'loading'},
        feedbacksFetched: state => {state.feedbacksLoadingStatus = 'idle'},
        commentsFetched: state => {state.commentsLoadingStatus = 'idle'},
        commentsFetching: state => {state.commentsLoadingStatus = 'loading'},
        feedbacksEmpty: (state, action) => {
            state.isEmpty = action.payload;
        },
        userFetched: (state, action) => {
            state.commentsLoadingStatus = 'idle';
            state.user = action.payload;
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
    userFetched,
    filterSelected,
    sortingSelected,
    feedbacksEmpty
} = actions;