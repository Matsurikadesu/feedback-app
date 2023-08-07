const FeedbackCard = ({feedback}) => {
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

export default FeedbackCard;