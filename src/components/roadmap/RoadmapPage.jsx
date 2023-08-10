import { Link, useLoaderData } from "react-router-dom";
import {  useState } from "react";
import BackBtn from "../back-btn/BackBtn";
import RoadmapColumn from "./RoadmapColumn";
import './roadmap-page.scss';
import '../app/main/feedback.scss';
import { useFeedbacks } from "../../firebase/services";
import { useSelector } from "react-redux";
import RoadmapPlaceholder from "../placeholders/RoadmapPlaceholder";

const RoadmapPage = () => {
    const [filter, setFilter] = useState('in-progress');
    const feedbacksLoadingStatus = useSelector(state => state.feedbacksLoadingStatus);
    const roadmap = useLoaderData();
    const {feedbacks} = useFeedbacks('All', 'Most Upvotes', true);

    const handleFilterClick = (e, filter) =>{
        const switchBtns = document.querySelectorAll('.roadmap__switch-item');
        switchBtns.forEach(item => item.classList.remove('roadmap__switch-item_active'));
        e.target.classList.add('roadmap__switch-item_active');
        setFilter(filter);
    }

    return(
        <div className="roadmap">
            <div className="header">
                <div>
                    <BackBtn/>
                    <h1 className="page__title_white title-lg">Roadmap</h1>
                </div>
                <Link className="header__btn" to={'/add'}>
                    + Add Feedback
                </Link>
            </div>

            <div className="roadmap__switch">
                <button 
                    type="button" 
                    className="roadmap__switch-item title" 
                    onClick={(e) => handleFilterClick(e, 'planned')}>
                        Planned ({roadmap[0].amount})
                </button>

                <button 
                    type="button" 
                    className="roadmap__switch-item roadmap__switch-item_active title" 
                    onClick={(e) => handleFilterClick(e, 'in-progress')}>
                        In-Progress ({roadmap[1].amount})
                </button>

                <button 
                    type="button" 
                    className="roadmap__switch-item title" 
                    onClick={(e) => handleFilterClick(e, 'live')}>
                        Live ({roadmap[2].amount})
                </button>
            </div>

            <div className="roadmap__content">
                { 
                    feedbacksLoadingStatus === 'idle' 
                        ? roadmap.map((item, index) => (
                            <RoadmapColumn
                                key={index}
                                {...item}
                                feedbacks={feedbacks.filter(feedback => feedback.status === item.name)}
                                filter={filter}/>
                            ))
                        : <RoadmapPlaceholder/>
                }
            </div>
        </div>
    )
}

export default RoadmapPage;