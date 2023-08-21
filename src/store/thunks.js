import { fetchCommentsWithUserData, getFeedbacksAmountByStatus } from "../firebase/services";
import { commentsFetched, commentsFetching, feedbacksAmount } from "./feedbacksSlice";

export const fetchFeedbacksAmountByStatus = (status, filter) => async dispatch => {
    const result = await getFeedbacksAmountByStatus(status, filter);
    dispatch(feedbacksAmount(result));
}

export const fetchComments = feedbackId => async dispatch => {
    dispatch(commentsFetching());
    const result = await fetchCommentsWithUserData(feedbackId);
    dispatch(commentsFetched(result));
}