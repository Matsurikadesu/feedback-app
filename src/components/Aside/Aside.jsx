import { Link, useLoaderData } from 'react-router-dom';
import './aside.scss';
import { useDispatch, useSelector } from 'react-redux';
import { filterSelected } from '../FeedbacksList/feedbacksSlice';

const Aside = () => {
    const dispatch = useDispatch();
    const options = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
    const filter = useSelector(state => state.filter);
    const roadmap = useLoaderData();

    const onFilterSelect = (item) => {
        dispatch(filterSelected(item))
    }

    const onFilterClick = (e) => {
        if(!e.target.classList.contains('aside__tags-item')) return;
        document.querySelectorAll('.aside__tags-item').forEach(item => item.classList.remove('aside__tags-item_active'));
        e.target.classList.add('aside__tags-item_active');
    }

    const optionsList = options
            .map((item, index) => {
                let clazz = 'aside__tags-item '
                if(item === filter) clazz += 'aside__tags-item_active';
                return <li className={clazz} onClick={() => onFilterSelect(item)} key={index}>{item}</li>
            })
    
    const roadmapList = roadmap
        .map((item, index) => 
            <li className="roadmap__item" key={index}>
                {item.name} <span>{item.amount}</span>
            </li>); 
    

    return(
        <div className="aside">
            <div className="aside__info">
                <h1 className="title">Frontend Mentor</h1>
                <p className="subtitle">Feedback Board</p>
            </div>
            <button className="aside__btn-container" onClick={(e) => e.target.closest('.aside').classList.toggle('aside_active')}>
                <div className="aside__btn"></div>
            </button>
            <div className="aside__container">
                <div className="aside__element">
                    <ul className="aside__tags" onClick={onFilterClick}>
                        {optionsList}
                    </ul>
                </div>
                <div className="aside__element">
                    <div className="roadmap__header">
                        <h2 className="title">Roadmap</h2>
                        <Link className="roadmap__btn" to="/roadmap">View</Link>
                    </div>
                    <ul className="roadmap__list">
                        {roadmapList}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Aside;