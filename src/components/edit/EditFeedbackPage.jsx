import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import BackBtn from '../back-btn/BackBtn';
import '../add/add-feedback-page.scss';
import ErrorPage from '../errors/ErrorPage';
import Select from '../select/Select';
import { deleteFeedback, updateFeedback } from '../../firebase/services';
import { statusOptions, categoryOptions } from '../../store/options';
import { useForm, FormProvider } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const EditFeedbackPage = () => {
    const navigate = useNavigate();
    const {feedbackId} = useParams();
    const feedback = useLoaderData();
    const {title, category, description, status} = feedback;
    const methods = useForm();

    const onSubmitChanges = async (data) => {
        console.log(data);
        const {title, description, category, status} = data;

        const updates = {
            title: title,
            category: category,
            status: status,
            description: description
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
                    <FormProvider {...methods}>
                        <form className="form" onSubmit={methods.handleSubmit(onSubmitChanges)}>
                            <div className="form__element">
                                <label className="form__element-title" htmlFor="title">Feedback title</label>
                                <span className="form__element-description">Add a short, descriptive headline</span>
                                <input 
                                    className="form__input" 
                                    type="text"
                                    defaultValue={title}
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
                                <textarea 
                                    className="form__input" 
                                    type="text"
                                    rows={5}
                                    defaultValue={description}
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
                                <button type='submit' className='form__btn form__btn_accept'>Save Changes</button>
                                <Link className='form__btn' to='/'>Cancel</Link>
                                <button type='button' className='form__btn form__btn_delete' onClick={handleDeleteFeedbackClick}>Delete</button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        : <ErrorPage/>
    )
}

export default EditFeedbackPage;