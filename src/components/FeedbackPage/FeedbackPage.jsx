import { getDoc, doc, addDoc, collection, updateDoc} from 'firebase/firestore';
import { db } from "../../firebase/firebase";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { feedbackOpened, commentAdded } from '../FeedbacksList/feedbacksSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import BackBtn from '../BackBtn/BackBtn';
import CommentsList from '../CommentsList/CommentsList';
import FeedbackLoading from '../LoadingPlaceholders/FeedbackLoading';
import '../AddFeedback/add-feedback-page.scss';
import './feedback-page.scss';

const FeedbackPage = () => {
    const dispatch = useDispatch();
    const feedback = useSelector(state => state.currentFeedback);
    const [counter, setCounter] = useState(250);
    const feedbackId = window.location.href.split('/')[4];

    const addComment = async (e) => {
        e.preventDefault();
        const form = e.target;
        const comment = {user: 1, text: form.comment.value};

        try{
            dispatch(commentAdded(comment))
            await addDoc(collection(db, 'feedback', feedbackId, 'comments'), comment);
            await updateDoc(doc(db, 'feedback', feedbackId), {comments: feedback.comments + 1})
        }
        catch{
            console.log(e);
        }
    }

    const fetchFeedback = async () => {
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
        fetchFeedback();
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
                        <img className="card__upvote-btn" src="../upvote.svg" alt="123"/>
                        <span className="card__text">{feedback.upvotes}</span>
                    </div>
                    <button className="card__comment card__btn">
                        <img src="../comment.svg" alt="comment"/>
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
        <div className="page page_feedback">
            <div className='page__header'>
                <BackBtn/>
                <Link className='form__btn' to={`feedbacks/${feedbackId}/edit`}>
                    Edit Feedback
                </Link>
            </div>
            <div className='page__body body_page'>
                {
                    feedback
                        ? <FeedbackCard/>
                        : <FeedbackLoading/>
                }

                <CommentsList count={feedback.comments}/>

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