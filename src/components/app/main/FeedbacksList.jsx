import FeedbackItem from './FeedbackItem';
import EmptyFeedbacks from '../../placeholders/EmptyFeedbacks';
import './FeedbacksList.scss';

const FeedbackList = ({feedbacks}) => {
    const elements = feedbacks.map((item, i) => (
            <FeedbackItem 
                {...item}
                initialUpvotes={item.upvotes}
                key={item.id}
                />
            ))

    return(
        <div className="feedback__container">
            {feedbacks.length > 0 ? elements : <EmptyFeedbacks/> }
        </div>
    )
}

export default FeedbackList;