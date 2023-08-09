import { Link } from 'react-router-dom';
import './header.scss';
import { sortingSelected } from '../../../store/feedbacksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedbacksAmountByStatus } from '../../../firebase/services';
import { useEffect, useState } from 'react';

const Header = () => {
    const dispatch = useDispatch();
    const sortingMethod = useSelector(state => state.sortingMethod);
    const filter = useSelector(state => state.filter);
    const [amount, setAmount] = useState('0');
    
    const handleSortingSelectClick = (e) => dispatch(sortingSelected(e.target.value));

    useEffect(() => {
        getFeedbacksAmountByStatus('suggestion', filter)
            .then(data => setAmount(data));
    }, [filter])

    return (
        <div className="header">
            <div className="header__suggestions">
                <img className="header__suggestions-icon" src="bulb.svg" alt="bulb"/>
                <h3 className="header__suggestions-title">{amount} Suggestions</h3>
            </div>
            <label className="header__label" htmlFor="select">Sort by :</label>
            <select className="header__select" name="select" id="select" onChange={handleSortingSelectClick} defaultValue={sortingMethod}>
                <option value="Most Upvotes">Most Upvotes</option>
                <option value="Least Upvotes">Least Upvotes</option>
                <option value="Most Comments">Most Comments</option>
                <option value="Least Comments">Least Comments</option>
            </select>
            <Link className="header__btn" to={'add'}>
                + Add Feedback
            </Link>
        </div>
    )
}

export default Header;