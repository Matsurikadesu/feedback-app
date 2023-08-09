import RoadmapFeedback from "./RoadmapFeedback";

const RoadmapColumn = ({name, description, filter, feedbacks, amount}) => {
    let filterClass = '';
    if(filter !== name) filterClass = 'roadmap__tasks-container_hidden';

    return(
        <div className={`roadmap__tasks-container ${filterClass}`}>
                <div className="roadmap__tasks-header">
                    <h2 className="title-lg">{name} ({amount})</h2>
                    <p className="text">{description}</p>
                </div>
                <div className="roadmap__tasks">
                    {
                        feedbacks && 
                            feedbacks.map((item, index) => (
                                <RoadmapFeedback
                                    {...item}
                                    initialUpvotes={item.upvotes}
                                    key={index}/>
                            ))
                    }
                </div>
        </div>
    )
}   

export default RoadmapColumn;