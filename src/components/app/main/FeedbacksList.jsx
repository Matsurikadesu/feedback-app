import FeedbackItem from './FeedbackItem';
import EmptyFeedbacks from '../../placeholders/EmptyFeedbacks';
import './FeedbacksList.scss';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useFeedbacks } from '../../../firebase/services';
import { useEffect, useState } from 'react';
import LoadingComponent from '../../placeholders/LoadingComponent';

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
    }, [amount, feedbacks]);

    return(
        <InfiniteScroll
            className='feedback__container'
            dataLength={feedbacks.length}
            next={fetchAdditionalFeedbacks}
            hasMore={hasMore}>
            {
                feedbacksLoadingStatus === 'loading' && amount 
                    ? [...Array(6)].map((item, index) => <LoadingComponent key={index} type={'feedback'}/>)
                    : elements
            }
        </InfiniteScroll>
    )
}

export default FeedbackList;