import FeedbackItem from './FeedbackItem';
import EmptyFeedbacks from '../../placeholders/EmptyFeedbacks';
import './FeedbacksList.scss';
import { useSelector } from 'react-redux';
import FeedbacksLoading from '../../placeholders/FeedbacksLoading';

const FeedbackList = ({feedbacks}) => {
    const feedbacksLoadingStatus = useSelector(state => state.feedbacksLoadingStatus);
    const isEmpty = useSelector(state => state.isEmpty);

    const elements = !isEmpty
        ? feedbacks.map(item => (
            <FeedbackItem 
                {...item}
                initialUpvotes={item.upvotes}
                key={item.id}
                />
        ))
        : <EmptyFeedbacks/>

    return(
        <div className="feedback__container">
            {
                feedbacksLoadingStatus === 'loading' && !isEmpty
                    ? <FeedbacksLoading/> 
                    : elements
            }
        </div>
    )
}

export default FeedbackList;