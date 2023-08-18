import './add-feedback-page.scss';
import { Link, useNavigate } from 'react-router-dom';
import BackBtn from '../back-btn/BackBtn';
import Select from '../select/Select';
import { categoryOptions } from '../../store/options';
import { addNewFeedback } from '../../firebase/services';
import { useForm, FormProvider } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const AddFeedBackPage = () => {
    const navigate = useNavigate();
    const methods = useForm();

    const handleAddFeedbackFormSubmit = async (data) => {
        const {title, description, category} = data;
        
        const newFeedback = {
            title: title,
            description: description,
            category: category,
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
                <FormProvider {...methods}>
                    <form className="form" onSubmit={methods.handleSubmit(handleAddFeedbackFormSubmit)}>
                        <div className="form__element">
                            <label className="form__element-title" htmlFor="title">Feedback title</label>
                            <span className="form__element-description">Add a short, descriptive headline</span>
                            <input 
                                className="form__input" 
                                type="text" 
                                {...methods.register('title', { 
                                    required: 'Can’t be empty', 
                                    maxLength: {
                                        value: 40, 
                                        message: 'Can’t be longer than 40 symbols'
                                        }
                                    })}/>
                            <ErrorMessage 
                                errors={methods.formState.errors} 
                                name='title' 
                                render={({message}) => <span className='error-message'>{message}</span>}/>
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
                            <textarea 
                                className="form__input" 
                                type="text"
                                rows={5}
                                {...methods.register('description', {
                                    required: 'Can’t be empty',
                                    maxLength: {
                                        value: 75,
                                        message: 'Can’t be longer than 75 symbols'
                                    },
                                    minLength: {
                                        value: 10,
                                        message: 'Description is too short.'
                                    }
                                })}/>
                            <ErrorMessage 
                                errors={methods.formState.errors} 
                                name='description' 
                                render={({message}) => <span className='error-message'>{message}</span>}/>
                        </div>

                        <div className='form__buttons'>
                            <button type='submit' className='form__btn form__btn_accept'>Add Feedback</button>
                            <Link className='form__btn' to='/'>Cancel</Link>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default AddFeedBackPage;