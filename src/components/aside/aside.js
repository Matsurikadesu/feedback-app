import { Link } from 'react-router-dom';
import './aside.scss';
import { useEffect} from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { roadmapFetched } from '../feedbacks-list/feedbacksSlice';
import Loading from '../loading/Loading';

const Aside = () => {
    const options = ['UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
    const roadmap = useSelector(state => state.roadmap);
    const dispatch = useDispatch();

    const fetchRoadmap = async () => {
        await getDocs(collection(db, "roadmap"))
            .then((querySnapshot) => {              
                const roadmap = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
                dispatch(roadmapFetched(roadmap));
            })
    }
    
    useEffect(() => {
        if(!roadmap) fetchRoadmap();

        //eslint-disable-next-line
    },[])
    
    const optionsList = options
            .map((item, index) => {
                return <li className='aside__tags-item' key={index}>{item}</li>
            })
    
    const roadmapList = roadmap ? roadmap
            .map((item, index) => {
                return <li className="roadmap__item" key={index}>{item.name} <span>{item.feedbacks.length}</span></li>
            }) : null; 

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
                        {optionsList}
                    </ul>
                </div>
                <div className="aside__element">
                    <div className="roadmap__header">
                        <h2 className="title">Roadmap</h2>
                        <Link className="roadmap__btn" to="/roadmap">View</Link>
                    </div>
                    <ul className="roadmap__list">
                        {roadmap ? roadmapList : <Loading/>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Aside;