import { Link } from 'react-router-dom';
import './header.scss';
import { sortingSelected } from '../FeedbacksList/feedbacksSlice';
import { useDispatch, useSelector } from 'react-redux';

const Header = ({amount}) => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.sortingMethod);

    const onSortSelected = (e) => dispatch(sortingSelected(e.target.value));

    return (
        <div className="header">
            <div className="header__suggestions">
                <img className="header__suggestions-icon" src="bulb.svg" alt="bulb"/>
                <h3 className="header__suggestions-title">{amount} Suggestions</h3>
            </div>
            <label className="header__label" htmlFor="select">Sort by :</label>
            <select className="header__select" name="select" id="select" onChange={onSortSelected} defaultValue={filter}>
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