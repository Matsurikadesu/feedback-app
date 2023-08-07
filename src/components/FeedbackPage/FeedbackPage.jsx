import { Link, useLoaderData, useParams } from 'react-router-dom';
import { commentAdded } from '../FeedbacksList/feedbacksSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import BackBtn from '../BackBtn/BackBtn';
import CommentsList from '../CommentsList/CommentsList';
import FeedbackLoading from '../LoadingPlaceholders/FeedbackLoading';
import FeedbackCard from './FeedbackCard';
import { addNewComment, updateFeedback } from '../../firebase/services';
import '../AddFeedback/add-feedback-page.scss';
import './feedback-page.scss';

const FeedbackPage = () => {
    const dispatch = useDispatch();
    const { feedbackId } = useParams();
    const [counter, setCounter] = useState(250);
    const feedback = useLoaderData();

    const addComment = async (e) => {
        e.preventDefault();
        const form = e.target;
        const comment = {user: 1, text: form.comment.value};
        addNewComment(feedbackId, comment);
        updateFeedback(feedbackId, {comments: feedback.comments + 1});
        dispatch(commentAdded(comment));
    }

    const onTextareaChange = (e) => {
        const commentLength = e.target.value.length;
        const newCounter = 250 - commentLength;
        setCounter(newCounter)
    }

    return(
        <div className="page page_feedback">
            <div className='page__header'>
                <BackBtn/>
                <Link className='form__btn' to={'edit'}>
                    Edit Feedback
                </Link>
            </div>
            <div className='page__body body_page'>
                {
                    feedback
                        ? <FeedbackCard feedback={feedback}/>
                        : <FeedbackLoading/>
                }

                <CommentsList count={feedback.comments} feedbackId={feedbackId}/>

                <form className='comment-form' onSubmit={addComment}>
                    <label className='title' htmlFor='comment'>Add Comment</label>
                    <textarea className='form__input' name="comment" id="comment" rows="5" maxLength={250} minLength={4} placeholder='Type your comment here' required onChange={onTextareaChange}></textarea>
                    <div className='form-footer-wrapper'>
                        <span className='text-sub'>{counter} Characters left</span>
                        <button type='submit' className='form__btn form__btn_accept'>Post Comment</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FeedbackPage;