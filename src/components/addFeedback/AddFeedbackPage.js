import './add-feedback-page.scss';
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddFeedBackPage = () => {
    const options = ['UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
    const selectOptions = options.map((item, index) => {
        return <option key={index}>{item}</option>
    })

    const addFeedback = async (e) => {
            e.preventDefault();
            const form = e.target;

            try {
                const docRef = await addDoc(collection(db, "feedback"), {
                    title: form.title.value,
                    description: form.description.value,
                    category: form.category.value,
                    upvotes: 0    
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }

    return(
        <div className="popup">
            <a className="popup__link" href="/">
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.33447 9L0.334473 5L4.33447 1" stroke="#4661E6" strokeWidth="2"/>
                </svg>
                Go Back</a>
            <div className="popup__body">
                <img className='popup__icon' src="./add-feedback-icon.png" alt="shiny icon" />
                <h1 className="popup__title">Create New Feedback</h1>
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
                        <a className='form__btn' href='/'>Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFeedBackPage;