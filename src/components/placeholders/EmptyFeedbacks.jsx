import './empty-feedbacks.scss';
import { Link } from 'react-router-dom';

const EmptyFeedbacks = () => {
    return(
        <div className="empty-container">
            <img 
                className='image'
                src="/icons/no-item.svg" 
                alt="spy looking for feedbacks" />

            <h3 
                className="title-lg">
                    There is no feedback yet.
            </h3>

            <p className="text">
                Got a suggestion? Found a bug that needs to be squashed? 
            <br/> 
                We love hearing about new ideas to improve our app.
            </p>

            <Link 
                className="header__btn" 
                to={'/add'}>
                    + Add Feedback
            </Link>
        </div>
    )
}

export default EmptyFeedbacks;