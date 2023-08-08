import { Link, useLoaderData, useParams } from 'react-router-dom';
import BackBtn from '../back-btn/BackBtn';
import CommentsList from './CommentsList';
import FeedbackLoading from '../placeholders/FeedbackLoading';
import FeedbackCard from './FeedbackCard';
import '../add/add-feedback-page.scss';
import './feedback-page.scss';
import ErrorPage from '../errors/ErrorPage';
import Form from './Form';

const FeedbackPage = () => {
    const { feedbackId } = useParams();
    const feedback = useLoaderData();

    return(
        feedback ? 
            <div className="page page_feedback">
                <div className='page__header'>
                    <BackBtn/>
                    <Link className='form__btn' to={'edit'}>
                        Edit Feedback
                    </Link>
                </div>
                <div className='page__body body_page'>
                    {
                        feedback
                            ? <FeedbackCard feedback={feedback}/>
                            : <FeedbackLoading/>
                    }

                    <CommentsList 
                        count={feedback.comments} 
                        feedbackId={feedbackId}/>

                    <Form 
                        count={feedback.comments}
                        feedbackId={feedbackId}/>
                </div>
            </div>
        : <ErrorPage/>
    )
}

export default FeedbackPage;