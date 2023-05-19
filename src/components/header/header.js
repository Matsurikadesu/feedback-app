import { Link } from 'react-router-dom';
import './header.scss';
import { sortingSelected } from '../feedbacks-list/feedbacksSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();
    const onSortSelected = (e) => {
        dispatch(sortingSelected(e.target.value));
    }

    return (
        <div className="header">
            <div className="header__suggestions">
                <img className="header__suggestions-icon" src="bulb.svg" alt="bulb"/>
                <h3 className="header__suggestions-title">6 Suggestions</h3>
            </div>
            <label className="header__label" htmlFor="select">Sort by :</label>
            <select className="header__select" name="select" id="select" onChange={onSortSelected}>
                <option value="mu">Most Upvotes</option>
                <option value="lu">Least Upvotes</option>
                <option value="mc">Most Comments</option>
                <option value="lc">Least Comments</option>
            </select>
            <Link className="header__btn" to={'add'}>
                + Add Feedback
            </Link>
        </div>
    )
}

export default Header;