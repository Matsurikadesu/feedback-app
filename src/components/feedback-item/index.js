import './feedback.scss';

const FeedbackItem = ({title, description, upvotes, category}) => {
    return(
        <div className="feedback__card">
            <h3 className="card__title">{title}</h3>
            <p className="card__description">{description}</p>
            <div className="aside__tags-item">{category}</div>
            <div className="card__controls">
                <div className="card__upvote">
                    <img className="card__upvote-btn" src="upvote.svg" alt="123"/>
                    <span className="card__text">{upvotes}</span>
                </div>
                <button className="card__comment">
                    <img src="comment.svg" alt="comment"/>
                    <span className="card__text">2</span>
                </button>
            </div>
        </div>
    )
}

export default FeedbackItem;