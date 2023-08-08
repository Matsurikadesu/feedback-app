import { Link, useLoaderData } from "react-router-dom";
import {  useState } from "react";
import BackBtn from "../back-btn/BackBtn";
import RoadmapColumn from "./RoadmapColumn";
import './roadmap-page.scss';
import '../app/main/feedback.scss';
import { useFeedbacks } from "../../firebase/services";

const RoadmapPage = () => {
    const [filter, setFilter] = useState('in-progress');
    const roadmap = useLoaderData();
    const {feedbacks} = useFeedbacks('All', 'Most Upvotes');

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
                    <h1 className="page__title_white title-lg">Roadmap</h1>
                </div>
                <Link className="header__btn" to={'/add'}>
                    + Add Feedback
                </Link>
            </div>
            <div className="roadmap__switch">
                <button className="roadmap__switch-item title" onClick={onSelectHandler}>Planned ({roadmap[0].amount})</button>
                <button className="roadmap__switch-item roadmap__switch-item_active title" onClick={onSelectHandler}>In-Progress ({roadmap[1].amount})</button>
                <button className="roadmap__switch-item title" onClick={onSelectHandler}>Live ({roadmap[2].amount})</button>
            </div>
            <div className="roadmap__content">
                {feedbacks && roadmap.map((item, index) => (
                    <RoadmapColumn
                        key={index}
                        title={item.name}
                        description={item.description}
                        amount={item.amount}
                        feedbacks={feedbacks}
                        filter={filter}/>
                ))}
            </div>
        </div>
    )
}

export default RoadmapPage;