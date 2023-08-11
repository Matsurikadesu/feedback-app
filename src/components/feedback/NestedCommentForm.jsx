import { useDispatch, useSelector } from "react-redux";
import { addNewComment } from "../../firebase/services";
import { commentAdded } from "../../store/feedbacksSlice";
import { useParams } from "react-router-dom";

const NestedCommentForm = ({id, userInfo, setReply}) => {
    const dispatch = useDispatch();
    const {feedbackId} = useParams();
    const user = useSelector(state => state.user);

    const handleReplySubmit = async (e) => {
        e.preventDefault();

        const comment = {
            parentComment: id, 
            user: user.id, 
            text: `@${userInfo.tag} ${e.target.nestedComment.value}`,
            timestamp: new Date().getTime()
        };

        const commentId = await addNewComment(feedbackId, comment);
        dispatch(commentAdded({...comment, user, id: commentId}));
        setReply(false);
    }

    return(
        <form className="reply-form" onSubmit={handleReplySubmit}>
            <textarea className="reply-form__input form__input" name="nestedComment" id="nestedComment" minLength={4} maxLength={250} required></textarea>
            <button type='submit' className="header__btn">Post Reply</button>
        </form> 
    )
}

export default NestedCommentForm;