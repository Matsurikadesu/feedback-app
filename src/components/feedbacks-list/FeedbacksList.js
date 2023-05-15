import './FeedbacksList.scss';
import FeedbackItem from '../feedback-item';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { feedbacksFetched } from './feedbackSlice';

const FeedbackList = () => {
    const dispatch = useDispatch();
    const feedbacks = useSelector(state => state.feedbacks);

    const fetchPost = async () => {
        await getDocs(collection(db, "feedback"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
                dispatch(feedbacksFetched(newData))
            })
    }

    useEffect(()=>{
        fetchPost();
        // eslint-disable-next-line
    }, [])

    return(
        <div className="feedback__container">
            {
                feedbacks?.map((item, i)=>(
                        <FeedbackItem 
                            key={i}
                            title={item.title}
                            description={item.description}
                            category={item.category}
                            upvotes={item.upvotes}
                            />
                    ))
            }
        </div>
    )
}
                        // <p key={i}>
                        //     <h1>{todo.name}</h1>
                        //     <img src={todo.avatar}alt="" />
                        // </p>

export default FeedbackList;