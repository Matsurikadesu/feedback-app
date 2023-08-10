import { useSelector } from "react-redux";
import { addNewComment } from "../../firebase/services";
import { useState } from "react";

const Form = ({feedbackId}) => {
    const [counter, setCounter] = useState(250);
    const user = useSelector(state => state.user);

    const handleAddNewCommentFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const comment = {
            user: user.id,
            text: form.comment.value,
            parentComment: false,
            timestamp: new Date().getTime()
        };

        addNewComment(feedbackId, comment);
    }

    const handleTextareaChange = (e) => {
        const commentLength = e.target.value.length;
        const newCounter = 250 - commentLength;

        setCounter(newCounter)
    }

    return(
        <form className='comment-form' onSubmit={handleAddNewCommentFormSubmit}>
            <label className='title' htmlFor='comment'>Add Comment</label>

            <textarea 
                className='form__input' 
                name="comment" 
                id="comment" 
                rows="5" 
                maxLength={250} 
                minLength={4} 
                placeholder='Type your comment here' 
                required 
                onChange={handleTextareaChange}/>

            <div className='form-footer-wrapper'>
                <span className='text-sub'>{counter} Characters left</span>
                <button type='submit' className='form__btn form__btn_accept'>Post Comment</button>
            </div>
        </form>
    )
}

export default Form;