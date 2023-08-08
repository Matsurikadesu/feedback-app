import './feedback.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { useState } from 'react';

const FeedbackItem = ({title, description, initialUpvotes, category, id, comments, upvotedby}) => {
    const userId = useSelector(state => state.user.id);

    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [upvotedBy, setUpvotedBy] = useState(upvotedby);

    const handleUpvoteBtnClick = (e) => {
        e.preventDefault();

        if(upvotedBy.includes(userId)){
            initialUpvotes--;
            upvotedby = upvotedby.filter(item => item !== userId);
        }else{
            initialUpvotes++;
            upvotedby.push(userId);
        }

        setUpvotedBy(upvotedby);
        setUpvotes(initialUpvotes);
        updateDoc(doc(db, 'feedback', id), {
            upvotes: initialUpvotes,
            upvotedby
        })
    }

    return(
        <Link className="feedback__card" data-testid='feedback' to={`feedbacks/${id}`}>
            <div className='card__info'>
                <h3 className="card__title">{title}</h3>
                <p className="card__description">{description}</p>
                <div className="aside__tags-item">{category}</div>
            </div>
            <div className="card__controls">
                <div className={`card__upvote card__btn ${upvotedBy.includes(userId) ? 'card__upvote_active' : ''}`} onClick={handleUpvoteBtnClick}>
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