import { createSlice } from "@reduxjs/toolkit";
// нужен рефакторинг
const initialState = {
    feedbacksLoadingStatus: 'loading',
    feedbackPageLoadingStatus: 'loading',
    commentsLoadingStatus: 'loading',
    comments: false,
    user: {id: '1', avatar: 'https://media.tenor.com/gIKfNZd5YkQAAAAd/pudge-dance.gif', name: 'Ящер', tag: 'Ящер'},
    filter: 'All',
    sortingMethod: 'Most Upvotes',
    tags: ['UI', 'UX', 'Enhancement', 'Bug', 'Feature']
};

const feedbackSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        feedbacksFetching: state => {state.feedbacksLoadingStatus = 'loading'},
        feedbacksFetched: state => {state.feedbacksLoadingStatus = 'idle'},
        feedbacksFetchingError: state => {state.feedbacksLoadingStatus = 'error'},
        commentsFetched: (state, action) => {
            state.comments = action.payload;
        },
        userFetched: (state, action) => {
            state.commentsLoadingStatus = 'idle';
            state.user = action.payload;
        },
        commentAdded: (state, action) => {
            state.comments 
                ? state.comments.push(action.payload)
                : state.comments = [action.payload];
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
    feedbacksFetchingError,
    feedbackOpened,
    roadmapFetched,
    commentsFetched,
    userFetched,
    commentAdded,
    filterSelected,
    sortingSelected
} = actions;