import { addNewComment } from "../../firebase/services";

export const handleReplySubmit = (e, user, userInfo, id, feedbackId) => {
    e.preventDefault();

    const comment = {
        parentComment: id, 
        user: user.id, 
        text: `@${userInfo.tag} ${e.target.nestedComment.value}`,
        timestamp: new Date().getTime()
    };

    addNewComment(feedbackId, comment);
}