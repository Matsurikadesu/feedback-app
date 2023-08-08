import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BackBtn from '../back-btn/BackBtn';
import '../add/add-feedback-page.scss';
import { db } from '../../firebase/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import ErrorPage from '../errors/ErrorPage';

const EditFeedbackPage = () => {
    const navigate = useNavigate();
    const {feedbackId} = useParams();
    const feedback = useLoaderData();
    const optionsCategory = useSelector(state => state.tags);

    const optionsStatus = ['planned', 'in-progress', 'live'];
    const {title, category, description, status} = feedback;

    const onSubmitChanges = async (e) => {
        e.preventDefault();
        const {title, category, status, description} = e.target;
        await updateDoc(doc(db, `feedback/${feedbackId}`), {
            title: title.value,
            category: category.value,
            status: status.value,
            description: description.value
        }).then(() => navigate(`/feedbacks/${feedbackId}`));
    }

    const handleDeleteFeedbackClick = async () => {
        await deleteDoc(doc(db, `feedback/${feedbackId}`)).then(() => navigate('/'));
    }

    const selectOptions = (arr) => arr.map((item, index) => (<option key={index}>{item}</option>));

    return(
        feedback 
            ? <div className="page">
                <BackBtn feedbackId={feedbackId}/>
                <div className="page__body">
                    <img className='page__icon' src="/edit-feedback-icon.png" alt="shiny icon" />
                    <h1 className="page__title">Editing ‘{title}’</h1> 
                    <form className="form" onSubmit={onSubmitChanges}>
                        <div className="form__element">
                            <label className="form__element-title" htmlFor="title">Feedback title</label>
                            <span className="form__element-description">Add a short, descriptive headline</span>
                            <input className="form__input" type="text" name='title' id='title' defaultValue={title} required/>
                        </div>
                        <div className="form__element">
                            <label className="form__element-title" htmlFor="category">Category</label>
                            <span className="form__element-description">Choose a category for your feedback</span>
                            <select className="form__input form__select" name='category' id="category" defaultValue={category}>
                                {selectOptions(optionsCategory)}
                            </select>
                        </div>
                        <div className="form__element">
                            <label className="form__element-title" htmlFor="status">Update status</label>
                            <span className="form__element-description">Change feature state</span>
                            <select className="form__input form__select" name='status' id="status" defaultValue={status}>
                                {selectOptions(optionsStatus)}
                            </select>
                        </div>
                        <div className="form__element">
                            <label className="form__element-title" htmlFor="description">Feedback Detail</label>
                            <span className="form__element-description">Include any specific comments on what should be improved, added, etc.</span>
                            <textarea className="form__input" type="text" name='description' id='description' rows={5} defaultValue={description} required/>
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