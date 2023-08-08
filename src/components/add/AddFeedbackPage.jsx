import './add-feedback-page.scss';
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import BackBtn from '../back-btn/BackBtn';
import { useSelector } from 'react-redux';

const AddFeedBackPage = () => {
    const navigate = useNavigate();
    const options = useSelector(state => state.tags);

    const selectOptions = options.map((item, index) => {
        return <option key={index}>{item}</option>
    })

    const addFeedback = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        try {
            await addDoc(collection(db, "feedback"), {
                title: form.title.value,
                description: form.description.value,
                category: form.category.value,
                upvotes: 0,
                status: 'planned',
                comments: 0,
                upvotedby: []
            }).then(() => navigate('/'));
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return(
        <div className="page">
            <BackBtn/>
            <div className="page__body">
                <img className='page__icon' src="/add-feedback-icon.png" alt="shiny icon" />
                <h1 className="page__title">Create New Feedback</h1>
                <form className="form" onSubmit={addFeedback}>
                    <div className="form__element">
                        <label className="form__element-title" htmlFor="title">Feedback title</label>
                        <span className="form__element-description">Add a short, descriptive headline</span>
                        <input className="form__input" type="text" name='title' id='title' required/>
                    </div>
                    <div className="form__element">
                        <label className="form__element-title" htmlFor="category">Category</label>
                        <span className="form__element-description">Choose a category for your feedback</span>
                        <select className="form__input form__select" name='category' id="category" defaultValue={options[0]}>
                            {selectOptions}
                        </select>
                        
                    </div>
                    <div className="form__element">
                        <label className="form__element-title" htmlFor="description">Feedback Detail</label>
                        <span className="form__element-description">Include any specific comments on what should be improved, added, etc.</span>
                        <textarea className="form__input" type="text" name='description' id='description' required/>
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