import { useDispatch } from "react-redux";
import { addNewComment, updateFeedback } from "../../firebase/services";
import { commentAdded } from "../../store/feedbacksSlice";
import { useState } from "react";

const Form = ({feedbackId, count}) => {
    const dispatch = useDispatch();
    const [counter, setCounter] = useState(250);

    /**
     * Добавляет комментарий в бд
     * @param {*} e 
     */
    const handleAddNewCommentFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const comment = {user: 1, text: form.comment.value};
        addNewComment(feedbackId, comment);
        updateFeedback(feedbackId, {comments: count + 1});
        dispatch(commentAdded(comment));
    }

    const onTextareaChange = (e) => {
        const commentLength = e.target.value.length;
        const newCounter = 250 - commentLength;
        setCounter(newCounter)
    }

    return(
        <form className='comment-form' onSubmit={handleAddNewCommentFormSubmit}>
            <label className='title' htmlFor='comment'>Add Comment</label>
            <textarea className='form__input' name="comment" id="comment" rows="5" maxLength={250} minLength={4} placeholder='Type your comment here' required onChange={onTextareaChange}></textarea>
            <div className='form-footer-wrapper'>
                <span className='text-sub'>{counter} Characters left</span>
                <button type='submit' className='form__btn form__btn_accept'>Post Comment</button>
            </div>
        </form>
    )
}

export default Form;