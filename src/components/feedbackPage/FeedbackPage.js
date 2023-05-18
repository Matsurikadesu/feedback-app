import { getDoc, doc, addDoc, collection} from 'firebase/firestore';
import { db } from "../../firebase";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { feedbackOpened, commentAdded } from '../feedbacks-list/feedbacksSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {push, ref, child, getDatabase} from 'firebase/database';
import BackBtn from '../backBtn/BackBtn';
import Comments from '../comment/Comments';
import '../addFeedback/add-feedback-page.scss';
import './feedback-page.scss';

const FeedbackPage = () => {
    const dispatch = useDispatch();
    const feedback = useSelector(state => state.currentFeedback);
    const [counter, setCounter] = useState(250);

    const addComment = (e) => {
        e.preventDefault();
        const db = getDatabase();
        const feedbackId = window.location.href.split('/')[3];
        const form = e.target;
        const newCommentKey = push(child(ref(db), `users`)).key;
        const comment = {user: 1, isparent: false, text: form.comment.value, id: newCommentKey};
        dispatch(commentAdded({comment, newFeedback: {...feedback, comments: feedback.comments++}}))
        const updates = {};
        updates[`/feedback/${feedbackId}/comments/${newCommentKey}`] = comment;
        updates[`/feedback/${feedbackId}`] = {...feedback, comments: feedback.comments++};
    }

    const fetchFeedback = async () => {
        const feedbackId = window.location.href.split('/')[3];
            await getDoc(doc(db, 'feedback', feedbackId))
                .then((querySnapshot) => {
                        const feedback = querySnapshot.data();
                        dispatch(feedbackOpened({
                            id: feedbackId,
                            feedback
                        }))
                    })
    }

    useEffect(() => {
        if(!feedback) fetchFeedback();
        //eslint-disable-next-line
    },[])

    const FeedbackCard = () => {
        return(
            <div className="feedback__card feedback__card_separate">
                <div className='card__info'>
                    <h3 className="card__title">{feedback.title}</h3>
                    <p className="card__description">{feedback.description}</p>
                    <div className="aside__tags-item">{feedback.category}</div>
                </div>
                <div className="card__controls">
                    <div className="card__upvote card__btn">
                        <img className="card__upvote-btn" src="upvote.svg" alt="123"/>
                        <span className="card__text">{feedback.upvotes}</span>
                    </div>
                    <button className="card__comment card__btn">
                        <img src="comment.svg" alt="comment"/>
                        <span className="card__text">{feedback.comments}</span>
                    </button>
                </div>
            </div>
        )
    }

    const onTextareaChange = (e) => {
        const commentLength = e.target.value.length;
        const newCounter = 250 - commentLength;
        setCounter(newCounter)
    }

    return(
        <div className="popup popup_feedback">
            <div className='page__header'>
                <BackBtn/>
                <Link className='form__btn' to={'/edit'}>
                    Edit Feedback
                </Link>
            </div>
            <div className='popup__body body_page'>
                {
                    feedback 
                        ? <FeedbackCard/>
                        : null
                }

                {
                    feedback.comments 
                        ? <Comments count={feedback.comments}/>
                        : null
                }

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