import './aside.scss';

const Aside = () => {
    return(
        <div className="aside">
            <div className="aside__info">
                <h1 className="title">Frontend Mentor</h1>
                <p className="subtitle">Feedback Board</p>
            </div>
            <button className="aside__btn-container">
                <div className="aside__btn"></div>
            </button>
            <div className="aside__container">
                <div className="aside__element">
                    <ul className="aside__tags">
                        <li className="aside__tags-item aside__tags-item_active ">All</li>
                        <li className="aside__tags-item">UI</li>
                        <li className="aside__tags-item">UX</li>
                        <li className="aside__tags-item">Enhancement</li>
                        <li className="aside__tags-item">Bug</li>
                        <li className="aside__tags-item">Feature</li>
                    </ul>
                </div>
                <div className="aside__element">
                    <div className="roadmap__header">
                        <h2 className="title">Roadmap</h2>
                        <a className="roadmap__btn" href="https:/google.com">View</a>
                    </div>
                    <ul className="roadmap__list">
                        <li className="roadmap__item">Planned <span>2</span></li>
                        <li className="roadmap__item">In-Progress <span>3</span></li>
                        <li className="roadmap__item">Live <span>1</span></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Aside;