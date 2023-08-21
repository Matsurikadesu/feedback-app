const RoadmapPlaceholder = () => {
    const roadmap = [
        {
            name: 'planned', 
            description: 'Ideas prioritized for research', 
            amount: 0
        }, 
        {
            name: 'in-progress', 
            description: 'Currently being developed', 
            amount: 0
        }, 
        {
            name: 'live', 
            description: 'Released features', 
            amount: 0,
        }
    ];

    const RoadmapColumnPlaceholder = ({name, description, amount}) => (
        <div className={`roadmap__tasks-container ${name !== 'in-progress' && 'roadmap__tasks-container_hidden'}`}>
                <div className="roadmap__tasks-header">
                    <h2 className="title-lg">{name} ({amount})</h2>
                    <p className="text">{description}</p>
                </div>
                <div className="roadmap__tasks">
                    {[...Array(3)].map((item, index) => <div key={index} className='feedback__card feedback__card_roadmap feedback__card_placeholder'></div>)}
                </div>
        </div>
    )

    return(
        <>
            {
                roadmap.map((item, index) => 
                    <RoadmapColumnPlaceholder 
                        {...item} 
                        key={index}/>)
            }
        </>
    )
}


export default RoadmapPlaceholder;