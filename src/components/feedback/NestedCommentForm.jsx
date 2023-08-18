import { useDispatch, useSelector } from "react-redux";
import { addNewComment, updateFeedback } from "../../firebase/services";
import { commentAdded } from "../../store/feedbacksSlice";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const NestedCommentForm = ({id, userInfo, setReply}) => {
    const dispatch = useDispatch();
    const {feedbackId} = useParams();
    const comments = useSelector(state => state.comments);
    const user = useSelector(state => state.user);
    const methods = useForm();

    const handleReplySubmit = async (data) => {
        const comment = {
            parentComment: id, 
            user: user.id, 
            text: `@${userInfo.tag} ${data.comment}`,
            timestamp: new Date().getTime()
        };

        const commentId = await addNewComment(feedbackId, comment);
        updateFeedback(feedbackId, {comments: comments.length + 1});
        dispatch(commentAdded({...comment, user, id: commentId}));
        setReply(false);
    }

    return(
        <form className="reply-form" onSubmit={methods.handleSubmit(handleReplySubmit)}>
            <textarea 
                className='reply-form__input form__input'
                {...methods.register('comment', {
                    required: 'Can’t be empty',
                    minLength: {
                        value: 4,
                        message: 'Can’t be shorter than 4 symbols'
                    },
                    maxLength: {
                        value: 250,
                        message: 'Comment is too long'
                    }
                })}
                placeholder='Type your comment here'/>
            <ErrorMessage 
                errors={methods.formState.errors} 
                name='comment' 
                render={({message}) => <span className='error-message'>{message}</span>}/>
            <button type='submit' className="header__btn">Post Reply</button>
        </form> 
    )
}

export default NestedCommentForm;