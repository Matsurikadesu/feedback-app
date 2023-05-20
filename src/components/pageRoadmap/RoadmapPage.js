import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { feedbacksFetched } from "../feedbacks-list/feedbacksSlice";
import BackBtn from "../backBtn/BackBtn";
import RoadmapColumn from "../roadmap-column/RoadmapColumn";
import './roadmap-page.scss';
import '../feedback-item/feedback.scss';

const RoadmapPage = () => {
    const dispatch = useDispatch();
    const feedbacks = useSelector(state => state.feedbacks);
    let roadmap = false;

    if(feedbacks) {
        roadmap = [
        {
            name: 'planned', 
            amount: feedbacks.filter(item => item.status === 'planned').length
        }, 
        {
            name: 'in-progress',
            amount: feedbacks.filter(item => item.status === 'in-progress').length
        }, 
        {
            name: 'live',
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
                <button className="roadmap__switch-item title">Planned</button>
                <button className="roadmap__switch-item roadmap__switch-item_active title">In-Progress</button>
                <button className="roadmap__switch-item title">Live</button>
            </div>
            <div className="roadmap__content">
                {feedbacks ? roadmap.map((item, index) => (
                    <RoadmapColumn
                        key={index}
                        title={item.name}/>
                )) : null}
            </div>
        </div>
    )
}

export default RoadmapPage;