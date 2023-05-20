import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { feedbacksFetched, feedbackOpened } from "../feedbacks-list/feedbacksSlice";
import BackBtn from "../backBtn/BackBtn";
import './roadmap-page.scss';
import '../feedback-item/feedback.scss';

const RoadmapPage = () => {
    const dispatch = useDispatch();
    // const roadmap = useSelector(state => state.roadmap);
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
        if (!feedbacks) fetchFeedbacks();
        // eslint-disable-next-line
    }, [])

    const RoadmapFeedback = ({title, description, upvotes, category, status, id, comments}) => {

        const onOpenFeedback = (e) => {
            if(e.target.classList.contains('card__btn')) e.preventDefault();
            dispatch(feedbackOpened({
                id,
                feedback: {
                    title,
                    description,
                    upvotes,
                    category,
                    status,
                    comments
                }
            }));
        }

        return(
            <Link className="feedback__card feedback__card_roadmap" onClick={onOpenFeedback} to={`/${id}`}>
                <div className="card__header-dec"></div>
                <h3 className="card__header-status text">{status}</h3>
                <div className='card__info'>
                    <h3 className="card__title title-lg">{title}</h3>
                    <p className="card__description">{description}</p>
                    <div className="aside__tags-item">{category}</div>
                </div>
                <div className="card__controls">
                    <div className="card__upvote card__btn">
                        <img className="card__upvote-btn" src="upvote.svg" alt="123"/>
                        <span className="card__text">{upvotes}</span>
                    </div>
                    <button className="card__comment card__btn">
                        <img src="comment.svg" alt="comment"/>
                        <span className="card__text">{comments}</span>
                    </button>
                </div>
            </Link>
        )
    }

    const RoadmapItem = ({title, description}) => {
        const roadmapTasks = feedbacks.filter(item => item.status === title);

        return(
            <div className="roadmap__tasks-container">
                    <div className="roadmap__tasks-header">
                        <h2 className="title-lg">{title} ({roadmapTasks.length})</h2>
                        <p className="text">{description}</p>
                    </div>
                    <div className="roadmap__tasks">
                        {roadmapTasks 
                            ? roadmapTasks.map((item, index) => (
                                <RoadmapFeedback
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    category={item.category}
                                    upvotes={item.upvotes}
                                    status={title}
                                    id={item.id}
                                    comments={item.comments}/>
                            )) 
                            : null}
                    </div>
            </div>
        )
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
                <button className="roadmap__switch-item title">Planned</button>
                <button className="roadmap__switch-item roadmap__switch-item_active title">In-Progress</button>
                <button className="roadmap__switch-item title">Live</button>
            </div>
            <div className="roadmap__content">
                {feedbacks ? roadmap.map((item, index) => (
                    <RoadmapItem
                        key={index}
                        title={item.name}/>
                )) : null}
            </div>
        </div>
    )
}

export default RoadmapPage;