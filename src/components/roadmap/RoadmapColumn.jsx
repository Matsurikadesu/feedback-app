import RoadmapFeedback from "./RoadmapFeedback";

const RoadmapColumn = ({title, description, filter, feedbacks, amount}) => {
    const roadmapTasks = feedbacks.filter(item => item.status === title);

    let filterClass = '';

    if(filter.toLowerCase() !== title.toLowerCase()){
        filterClass = 'roadmap__tasks-container_hidden';
    }

    return(
        <div className={`roadmap__tasks-container ${filterClass}`}>
                <div className="roadmap__tasks-header">
                    <h2 className="title-lg">{title} ({amount})</h2>
                    <p className="text">{description}</p>
                </div>
                <div className="roadmap__tasks">
                    {
                        roadmapTasks && 
                            roadmapTasks.map((item, index) => (
                                <RoadmapFeedback
                                    {...item}
                                    key={index}/>
                            ))
                    }
                </div>
        </div>
    )
}   

export default RoadmapColumn;