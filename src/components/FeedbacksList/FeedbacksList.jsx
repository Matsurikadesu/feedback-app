import FeedbackItem from '../FeedbackItem/FeedbackItem';
import EmptyFeedbacks from '../EmptyFeedbacks/EmptyFeedbacks';
import './FeedbacksList.scss';

const FeedbackList = ({feedbacks}) => {
    console.log(feedbacks)
    const elements = feedbacks.map((item, i) => (
            <FeedbackItem 
                {...item}
                initialUpvotes={item.upvotes}
                key={i}
                />
            ))

    // const Feedbacks = () => {
    //     // if(feedbacksLoadingStatus === 'loading'){
    //     //     return(
    //     //         <FeedbacksLoading/>
    //     //     )
    //     // }
    //     if(feedbacks.length > 0){
    //         return elements;
    //     }else{
    //         <EmptyFeedbacks/>
    //     }
    // }

    return(
        <div className="feedback__container">
            {/* <Feedbacks/> */}
            {feedbacks.length > 0 ? elements : <EmptyFeedbacks/> }
        </div>
    )
}

export default FeedbackList;