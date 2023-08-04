import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { feedbacksFetched } from './feedbacksSlice';
import FeedbackItem from '../FeedbackItem/FeedbackItem';
import EmptyFeedbacks from '../EmptyFeedbacks/EmptyFeedbacks';
import FeedbacksLoading from '../LoadingPlaceholders/FeedbacksLoading';
import './FeedbacksList.scss';

const FeedbackList = () => {
    const dispatch = useDispatch();
    const feedbacks = useSelector(state => state.feedbacks);
    const applyingFilter = useSelector(state => state.filter);
    const sorting = useSelector(state => state.sortingMethod);
    const feedbacksLoadingStatus = useSelector(state => state.feedbacksLoadingStatus)

    const fetchFeedbacks = async () => {
        await getDocs(collection(db, "feedback"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
                dispatch(feedbacksFetched(newData))
            })
        }
    
    useEffect(() => {
        fetchFeedbacks();
        // eslint-disable-next-line
    }, [])
    let filteredFeedbacks = null;

    if(feedbacks) {
        const sortedFeedbacks = feedbacks.map(item => item).sort((a, b) => {
            switch(sorting){
                case 'Most Upvotes':
                    return b.upvotes - a.upvotes;
                case 'Least Upvotes':
                    return a.upvotes - b.upvotes;
                case 'Most Comments':
                    return b.comments - a.comments;
                case 'Least Comments':
                    return a.comments - b.comments;
                default:
                    return 0;
            }
        }); 
        filteredFeedbacks = sortedFeedbacks.filter(item => (item.category === applyingFilter || applyingFilter === 'All'));
    }

    const elements = feedbacks 
        ? filteredFeedbacks?.map((item, i) => (
            <FeedbackItem 
                {...item}
                initialUpvotes={item.upvotes}
                key={i}
                />
            ))
        : null

    const Feedbacks = () => {
        if(feedbacksLoadingStatus === 'loading'){
            return(
                <FeedbacksLoading/>
            )
        }else if(feedbacksLoadingStatus === 'idle'){
            if(filteredFeedbacks && filteredFeedbacks.length > 0){
                return elements;
            }else{
                <EmptyFeedbacks/>
            }
        }
    }

    return(
        <div className="feedback__container">
            <Feedbacks/>
        </div>
    )
}

export default FeedbackList;