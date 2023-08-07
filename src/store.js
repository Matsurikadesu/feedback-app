import { configureStore } from "@reduxjs/toolkit";
import feedbacksReducer from "./components/FeedbacksList/feedbacksSlice";
// import userReducer from "./user/userSlice";

const stringMiddleware =() => (next) => (action) => {
    if(typeof action === 'string'){
        return next({
            type: action
        })
    }
    return next(action);
}

const store = configureStore({
    reducer: feedbacksReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;