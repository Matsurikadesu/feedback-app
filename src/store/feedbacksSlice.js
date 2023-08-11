import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feedbacksLoadingStatus: 'loading',
    commentsLoadingStatus: 'idle',
    user: {id: '2', avatar: 'https://media.tenor.com/gIKfNZd5YkQAAAAd/pudge-dance.gif', name: 'Ящер', tag: 'Ящер'},
    feedbacks: [],
    comments: [],
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
    commentAdded,
    userFetched,
    filterSelected,
    sortingSelected,
    feedbacksLoaded,
    feedbacksEmpty
} = actions;