import { addNewComment } from "../../firebase/services";
import { commentAdded } from "../../store/feedbacksSlice";

export const handleReplySubmit = (e, user, userInfo, id, feedbackId, dispatch) => {
    e.preventDefault();

    const comment = {
        parentComment: id, 
        user: user.id, 
        text: `@${userInfo.tag} ${e.target.nestedComment.value}`,
        timestamp: new Date().getTime()
    };

    dispatch(commentAdded({...comment, user}));
    addNewComment(feedbackId, comment);
}