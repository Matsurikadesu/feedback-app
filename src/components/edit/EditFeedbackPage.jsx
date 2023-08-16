import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import BackBtn from '../back-btn/BackBtn';
import '../add/add-feedback-page.scss';
import ErrorPage from '../errors/ErrorPage';
import Select from '../select/Select';
import { deleteFeedback, updateFeedback } from '../../firebase/services';
import { statusOptions, categoryOptions } from '../../store/options';

const EditFeedbackPage = () => {
    const navigate = useNavigate();
    const {feedbackId} = useParams();
    const feedback = useLoaderData();
    const {title, category, description, status} = feedback;

    const onSubmitChanges = async (e) => {
        e.preventDefault();
        const {title, description, category, status} = e.target;

        const updates = {
            title: title.value,
            category: category.value,
            status: status.value,
            description: description.value
        };

        updateFeedback(feedbackId, updates).then(() => navigate(`/feedbacks/${feedbackId}`));
    }

    const handleDeleteFeedbackClick = async () => {
        deleteFeedback(feedbackId).then(() => navigate('/'));
    }

    return(
        feedback 
            ? <div className="page">
                <BackBtn feedbackId={feedbackId}/>
                <div className="page__body">
                    <img className='page__icon' src="/icons/edit-feedback-icon.png" alt="shiny icon" />
                    <h1 className="page__title">Editing ‘{title}’</h1> 
                    <form className="form" onSubmit={onSubmitChanges}>
                        <div className="form__element">
                            <label className="form__element-title" htmlFor="title">Feedback title</label>
                            <span className="form__element-description">Add a short, descriptive headline</span>
                            <input className="form__input" type="text" name='title' id='title' defaultValue={title} maxLength={40} required/>
                        </div>
                        <div className="form__element">
                            <span className="form__element-title">Category</span>
                            <span className="form__element-description">Choose a category for your feedback</span>
                            <Select 
                                options={categoryOptions}
                                currentValue={category}
                                name='category'/>
                        </div>
                        <div className="form__element">
                            <span className="form__element-title">Update status</span>
                            <span className="form__element-description">Change feature state</span>
                            <Select 
                                options={statusOptions}
                                currentValue={status}
                                name='status'/>
                        </div>
                        <div className="form__element">
                            <label className="form__element-title" htmlFor="description">Feedback Detail</label>
                            <span className="form__element-description">Include any specific comments on what should be improved, added, etc.</span>
                            <textarea className="form__input" type="text" name='description' id='description' rows={5} maxLength={75} defaultValue={description} required/>
                        </div>

                        <div className='form__buttons'>
                            <button type='submit' className='form__btn form__btn_accept'>Save Changes</button>
                            <Link className='form__btn' to='/'>Cancel</Link>
                            <button type='button' className='form__btn form__btn_delete' onClick={handleDeleteFeedbackClick}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        : <ErrorPage/>
    )
}

export default EditFeedbackPage;