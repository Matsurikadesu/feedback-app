import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BackBtn from '../BackBtn/BackBtn';
import '../AddFeedback/add-feedback-page.scss';
import { db } from '../../firebase/firebase';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { feedbackOpened } from '../FeedbacksList/feedbacksSlice';

const EditFeedbackPage = () => {
    const navigate = useNavigate();
    const optionsCategory = useSelector(state => state.tags);
    const optionsStatus = ['planned', 'in-progress', 'live'];
    const selectOptions = (arr) => arr.map((item, index) => (<option key={index}>{item}</option>))
    const feedbackId = window.location.href.split('/')[3];
    const feedback = useSelector(state => state.currentFeedback);
    const {title, category, description, status} = feedback;
    const dispatch = useDispatch();

    const onSubmitChanges = async (e) => {
        e.preventDefault();
        const {title, category, status, description} = e.target;
        await updateDoc(doc(db, `feedback/${feedbackId}`), {
            title: title.value,
            category: category.value,
            status: status.value,
            description: description.value
        }).then(() => navigate(`/${feedbackId}`));
    }

    const fetchFeedback = async () => {
        await getDoc(doc(db, 'feedback', feedbackId))
            .then((querySnapshot) => {
                    const feedback = querySnapshot.data();
                    dispatch(feedbackOpened({
                        id: feedbackId,
                        feedback
                    }))
                })
    }

    useEffect(() => {
        if(!feedback) fetchFeedback();
        //eslint-disable-next-line
    }, [])

    const onDelete = async () => {
        await deleteDoc(doc(db, `feedback/${feedbackId}`)).then(() => navigate('/'));
    }
    
    return(
        <div className="page">
            <BackBtn/>
            <div className="page__body">
                <img className='page__icon' src="../edit-feedback-icon.png" alt="shiny icon" />
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
                        <button type='button' className='form__btn form__btn_delete' onClick={onDelete}>Delete</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditFeedbackPage;