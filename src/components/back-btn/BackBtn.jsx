import { Link } from "react-router-dom";
import './back-btn.scss';

const BackBtn = ({feedbackId = false}) => {
    return (
        <Link className="back-btn" to={feedbackId ? `/feedbacks/${feedbackId}`: '/'}>
                <svg className="back-btn__image" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.33447 9L0.334473 5L4.33447 1" stroke="#4661E6" strokeWidth="2"/>
                </svg>

                <span className="back-btn__text"> 
                    Go Back
                </span>
        </Link>
    )
}

export default BackBtn;