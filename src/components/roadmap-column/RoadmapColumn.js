import { useSelector } from "react-redux";
import RoadmapFeedback from "../roadmap-feedback/RoadmapFeedback";

const RoadmapColumn = ({title, description, filter}) => {
    const feedbacks = useSelector(state => state.feedbacks)
    const roadmapTasks = feedbacks.filter(item => item.status === title);

    let filterClass = '';
    if(filter.toLowerCase() !== title.toLowerCase()){
        filterClass = 'roadmap__tasks-container_hidden';
    }
    return(
        <div className={`roadmap__tasks-container ${filterClass}`}>
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

export default RoadmapColumn;