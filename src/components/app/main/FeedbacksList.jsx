import FeedbackItem from './FeedbackItem';
import EmptyFeedbacks from '../../placeholders/EmptyFeedbacks';
import './FeedbacksList.scss';
import { useSelector } from 'react-redux';
import FeedbacksLoading from '../../placeholders/FeedbacksLoading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useFeedbacks } from '../../../firebase/services';
import { useEffect, useState } from 'react';

const FeedbackList = () => {
    const [hasMore, setHasMore] = useState(true);
    const { 
        feedbacksLoadingStatus,
        filter,
        sortingMethod,
        feedbacks,
        amount
    } = useSelector(state => ({...state}));

    const {fetchAdditionalFeedbacks} = useFeedbacks(filter, sortingMethod);

    const elements = amount
        ? feedbacks.map(item => (
            <FeedbackItem 
                {...item}
                initialUpvotes={item.upvotes}
                key={item.id}
                />
        ))
        : <EmptyFeedbacks/>

    useEffect(() => {
        amount > feedbacks.length 
            ? setHasMore(true)
            : setHasMore(false);
        console.log(feedbacks);
    }, [amount, feedbacks]);

    return(
        feedbacksLoadingStatus === 'loading' && amount
            ?   <FeedbacksLoading/>
            :   <InfiniteScroll
                    className='feedback__container'
                    dataLength={feedbacks.length}
                    next={fetchAdditionalFeedbacks}
                    hasMore={hasMore}>
                    {elements}
                </InfiniteScroll>
    )
}

export default FeedbackList;