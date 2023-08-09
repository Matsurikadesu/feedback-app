import './feedback.scss';
import { Link } from 'react-router-dom';
import { useUpvote } from '../../../firebase/services';

const FeedbackItem = ({title, description, initialUpvotes, category, id, comments, upvotedby}) => {
    const {upvotes, handleUpvote, isUpvoted} = useUpvote(initialUpvotes, upvotedby, id);

    return(
        <div className="feedback__card">
            <div className='card__info'>
                <Link className="card__title title-lg" to={`feedbacks/${id}`}>{title}</Link>
                <p className="card__description">{description}</p>
                <div className="aside__tags-item">{category}</div>
            </div>
            <div className="card__controls">
                <button type='button' className={`card__upvote card__btn ${isUpvoted && 'card__upvote_active'}`} onClick={handleUpvote}>
                    <svg className='card__upvote-btn' width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 6L4 2L8 6" stroke="#4661E6" strokeWidth="2"/>
                    </svg>
                    <span className="card__text">{upvotes}</span>
                </button>
                <div  className="card__comment card__btn">
                    <img src="comment.svg" alt="comment"/>
                    <span className="card__text">{comments ? comments : 0}</span>
                </div>
            </div>
        </div>
    )
}

export default FeedbackItem;