import './add-feedback-page.scss';
import { Link, useNavigate } from 'react-router-dom';
import BackBtn from '../back-btn/BackBtn';
import Select from '../select/Select';
import { categoryOptions } from '../../store/options';
import { addNewFeedback } from '../../firebase/services';

const AddFeedBackPage = () => {
    const navigate = useNavigate();

    const handleAddFeedbackFormSubmit = async (e) => {
        e.preventDefault();
        const {title, description, category} = e.target;
        
        const newFeedback = {
            title: title.value,
            description: description.value,
            category: category.value,
            upvotes: 0,
            status: 'suggestion',
            comments: 0,
            upvotedby: []
        }

        addNewFeedback(newFeedback).then(() => navigate('/'));
    }

    return(
        <div className="page">
            <BackBtn/>
            <div className="page__body">
                <img className='page__icon' src="/icons/add-feedback-icon.png" alt="shiny icon" />
                <h1 className="page__title">Create New Feedback</h1>
                <form className="form" onSubmit={handleAddFeedbackFormSubmit}>
                    <div className="form__element">
                        <label className="form__element-title" htmlFor="title">Feedback title</label>
                        <span className="form__element-description">Add a short, descriptive headline</span>
                        <input className="form__input" type="text" name='title' id='title' maxLength={40} required/>
                    </div>
                    <div className="form__element">
                        <span className="form__element-title">Category</span>
                        <span className="form__element-description">Choose a category for your feedback</span>
                        <Select 
                            options={categoryOptions}
                            currentValue={categoryOptions[0]}
                            name='category'/>
                    </div>
                    <div className="form__element">
                        <label className="form__element-title" htmlFor="description">Feedback Detail</label>
                        <span className="form__element-description">Include any specific comments on what should be improved, added, etc.</span>
                        <textarea className="form__input" type="text" name='description' id='description' maxLength={75} required/>
                    </div>

                    <div className='form__buttons'>
                        <button type='submit' className='form__btn form__btn_accept'>Add Feedback</button>
                        <Link className='form__btn' to='/'>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFeedBackPage;