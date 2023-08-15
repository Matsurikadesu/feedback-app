import { Link } from 'react-router-dom';
import './header.scss';
import { feedbacksAmount, sortingSelected } from '../../../store/feedbacksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedbacksAmountByStatus } from '../../../firebase/services';
import { useEffect, useState } from 'react';
import Select from '../../select/Select';

const Header = () => {
    const sortingOptions = ['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments'];
    const dispatch = useDispatch();
    const sortingMethod = useSelector(state => state.sortingMethod);
    const filter = useSelector(state => state.filter);
    const [amount, setAmount] = useState('0');

    const handleSortingSelectClick = (e) => {
        const sorting = e.target.textContent;
        if(sorting !== sortingMethod) dispatch(sortingSelected(sorting));
    }

    useEffect(() => {
        getFeedbacksAmountByStatus('suggestion', filter)
            .then(data => {
                setAmount(data);
                dispatch(feedbacksAmount(data));
            });
    //eslint-disable-next-line
    }, [filter])

    return (
        <div className="header">
            <div className="header__suggestions">
                <img className="header__suggestions-icon" src="bulb.svg" alt="bulb"/>
                <h3 className="header__suggestions-title">{amount} Suggestions</h3>
            </div>

            <div className="header__label select-label">
                Sort by : 
                <Select 
                    options={sortingOptions}
                    currentValue={sortingMethod}
                    onClick={handleSortingSelectClick}
                    />
            </div>

            <Link className="header__btn" to={'add'}>
                + Add Feedback
            </Link>
        </div>
    )
}

export default Header;