import './feedback.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { feedbackOpened} from '../feedbacks-list/feedbacksSlice';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useState } from 'react';

const FeedbackItem = ({title, description, initialUpvotes, category, id, status, comments}) => {
    const dispatch = useDispatch();
    const [upvotes, setUpvotes] = useState(initialUpvotes)

    const onAddUpvote = async (e) => {
        e.preventDefault();
        e.target.closest('.card__upvote').classList.toggle('card__upvote_active');
        if(upvotes === initialUpvotes){
            setUpvotes(initialUpvotes + 1)
            await updateDoc(doc(db, `feedback/${id}`), {
                upvotes: upvotes + 1
            });
        }else{
            setUpvotes(initialUpvotes)
            await updateDoc(doc(db, `feedback/${id}`), {
                upvotes: upvotes - 1
            });
        }
    }

    const onOpenFeedback = () => {
        dispatch(feedbackOpened({
            id,
            feedback: {
                title,
                description,
                upvotes,
                category,
                status,
                comments
            }
        }));
    }

    return(
        <Link className="feedback__card" onClick={onOpenFeedback} to={`${id}`}>
            <div className='card__info'>
                <h3 className="card__title">{title}</h3>
                <p className="card__description">{description}</p>
                <div className="aside__tags-item">{category}</div>
            </div>
            <div className="card__controls">
                <div className="card__upvote card__btn" onClick={onAddUpvote}>
                    <svg className='card__upvote-btn' width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 6L4 2L8 6" stroke="#4661E6" strokeWidth="2"/>
                    </svg>
                    <span className="card__text">{upvotes}</span>
                </div>
                <button className="card__comment card__btn">
                    <img src="comment.svg" alt="comment"/>
                    <span className="card__text">{comments ? comments : 0}</span>
                </button>
            </div>
        </Link>
    )
}

export default FeedbackItem;