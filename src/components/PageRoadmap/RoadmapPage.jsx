import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { feedbacksFetched } from "../FeedbacksList/feedbacksSlice";
import BackBtn from "../BackBtn/BackBtn";
import RoadmapColumn from "../RoadmapColumn/RoadmapColumn";
import './roadmap-page.scss';
import '../FeedbackItem/feedback.scss';

const RoadmapPage = () => {
    const dispatch = useDispatch();
    const feedbacks = useSelector(state => state.feedbacks);
    const [filter, setFilter] = useState('in-progress');
    let roadmap = false;

    if(feedbacks) {
        roadmap = [
        {
            name: 'planned', 
            description: 'Ideas prioritized for research',
            amount: feedbacks.filter(item => item.status === 'planned').length
        }, 
        {
            name: 'in-progress',
            description: 'Currently being developed',
            amount: feedbacks.filter(item => item.status === 'in-progress').length
        }, 
        {
            name: 'live',
            description: 'Released features',
            amount: feedbacks.filter(item => item.status === 'live').length
        }
    ];}

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

    const onSelectHandler = (e) =>{
        e.preventDefault();
        const switchBtns = document.querySelectorAll('.roadmap__switch-item');
        switchBtns.forEach(item => item.classList.remove('roadmap__switch-item_active'));
        e.target.classList.add('roadmap__switch-item_active');
        setFilter(e.target.textContent.split(' ')[0]);
    }

    return(
        <div className="roadmap">
            <div className="header">
                <div>
                    <BackBtn/>
                    <h1 className="page__title title-lg">Roadmap</h1>
                </div>
                <Link className="header__btn" to={'/add'}>
                    + Add Feedback
                </Link>
            </div>
            <div className="roadmap__switch">
                <button className="roadmap__switch-item title" onClick={onSelectHandler}>Planned ({roadmap ? roadmap[0].amount : 0})</button>
                <button className="roadmap__switch-item roadmap__switch-item_active title" onClick={onSelectHandler}>In-Progress ({roadmap ? roadmap[1].amount : 0})</button>
                <button className="roadmap__switch-item title" onClick={onSelectHandler}>Live ({roadmap ? roadmap[2].amount : 0})</button>
            </div>
            <div className="roadmap__content">
                {feedbacks ? roadmap.map((item, index) => (
                    <RoadmapColumn
                        key={index}
                        title={item.name}
                        description={item.description}
                        filter={filter}/>
                )) : null}
            </div>
        </div>
    )
}

export default RoadmapPage;