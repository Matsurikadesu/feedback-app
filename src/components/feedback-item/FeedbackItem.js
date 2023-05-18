import './feedback.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { feedbackOpened} from '../feedbacks-list/feedbacksSlice';

const FeedbackItem = ({title, description, upvotes, category, id, status, comments}) => {
    const dispatch = useDispatch();

    const onOpenFeedback = (e) => {
        if(e.target.classList.contains('card__btn')) e.preventDefault();
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
                <div className="card__upvote card__btn">
                    <img className="card__upvote-btn" src="upvote.svg" alt="123"/>
                    <span className="card__text">{upvotes}</span>
                </div>
                <button className="card__comment card__btn">
                    <img src="comment.svg" alt="comment"/>
                    <span className="card__text">{comments}</span>
                </button>
            </div>
        </Link>
    )
}

export default FeedbackItem;