import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {id: 1, avatar: 'https://media.tenor.com/gIKfNZd5YkQAAAAd/pudge-dance.gif', name: 'Ящер', tag: 'Ящер'},
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userFetched: ((state, action) => {state.user = action.payload})
    }
});

const {actions} = userSlice;

export default userSlice.reducer;
export const {
    userFetched
} = actions;