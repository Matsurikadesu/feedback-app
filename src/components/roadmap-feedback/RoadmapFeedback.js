import { Link } from "react-router-dom";
import { feedbackOpened } from "../feedbacks-list/feedbacksSlice";
import { useDispatch } from "react-redux";


const RoadmapFeedback = ({title, description, upvotes, category, status, id, comments}) => {
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
        <Link className="feedback__card feedback__card_roadmap" onClick={onOpenFeedback} to={`/${id}`}>
            <div className="card__header-dec"></div>
            <h3 className="card__header-status text">{status}</h3>
            <div className='card__info'>
                <h3 className="card__title title-lg">{title}</h3>
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

export default RoadmapFeedback;