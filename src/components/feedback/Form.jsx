import { useDispatch, useSelector } from "react-redux";
import { addNewComment, updateFeedback } from "../../firebase/services";
import { commentAdded } from "../../store/feedbacksSlice";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import './form.scss';

const Form = ({feedbackId}) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments)
    const user = useSelector(state => state.user);
    const methods = useForm();
    const counter = methods.watch("comment", '').length;

    const handleAddNewCommentFormSubmit = async (data) => {
        const comment = {
            user: user.id,
            text: data.comment,
            parentComment: false,
            timestamp: new Date().getTime()
        };

        const commentId = await addNewComment(feedbackId, comment);
        updateFeedback(feedbackId, {comments: comments.length + 1});
        dispatch(commentAdded({...comment, user, id: commentId}));
        methods.reset();
    }

    return(
        <form className='comment-form' onSubmit={methods.handleSubmit(handleAddNewCommentFormSubmit)}>
            <label className='title' htmlFor='comment'>Add Comment</label>

            <textarea 
                className='form__input'
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
                rows={5}
                placeholder='Type your comment here'/>
            <ErrorMessage 
                errors={methods.formState.errors} 
                name='comment' 
                render={({message}) => <span className='error-message'>{message}</span>}/>

            <div className='form-footer-wrapper'>
                <span className='text-sub'>{250 - counter} Characters left</span>
                <button type='submit' className='form__btn form__btn_accept'>Post Comment</button>
            </div>
        </form>
    )
}

export default Form;