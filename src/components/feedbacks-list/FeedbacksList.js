import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { feedbacksFetched } from './feedbacksSlice';
import FeedbackItem from '../feedback-item/FeedbackItem';
import EmptyFeedbacks from '../emptyFeedbacks/EmptyFeedbacks';
import './FeedbacksList.scss';

const FeedbackList = () => {
    const dispatch = useDispatch();
    const feedbacks = useSelector(state => state.feedbacks);

    const fetchFeedbacks = async () => {
        await getDocs(collection(db, "feedback"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
                dispatch(feedbacksFetched(newData))
            })
        }
    
    useEffect(() => {
        if (!feedbacks) fetchFeedbacks();
        // eslint-disable-next-line
    }, [])

    const elements = feedbacks 
        ? feedbacks?.map((item, i) => (
            <FeedbackItem 
                {...item}
                key={i}
                />
        ))
        : null


    return(
        <div className="feedback__container">
            {
                feedbacks ? elements : <EmptyFeedbacks/>
            }
        </div>
    )
}

export default FeedbackList;