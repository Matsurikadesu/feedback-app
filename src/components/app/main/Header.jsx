import { Link } from 'react-router-dom';
import './header.scss';
import { sortingSelected } from '../../../store/feedbacksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Select from '../../select/Select';
import { useForm } from 'react-hook-form';
import { fetchFeedbacksAmountByStatus } from '../../../store/thunks';

const sortingOptions = ['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments'];

const Header = () => {
    const dispatch = useDispatch();
    const sortingMethod = useSelector(state => state.sortingMethod);
    const filter = useSelector(state => state.filter);
    const amount = useSelector(state => state.amount);
    const methods = useForm();

    const handleSortingSelectClick = (e) => {
        const sorting = e.target.textContent;
        if(sorting !== sortingMethod) dispatch(sortingSelected(sorting));
    }

    useEffect(() => {
        dispatch(fetchFeedbacksAmountByStatus('suggestion', filter));
    }, [filter, dispatch])

    return (
        <div className="header">
            <div className="header__suggestions">
                <img className="header__suggestions-icon" src="/icons/bulb.svg" alt="bulb"/>
                <h3 className="header__suggestions-title">{amount} Suggestions</h3>
            </div>
            <div className="header__label select-label">
                Sort by : 
                <Select 
                    options={sortingOptions}
                    currentValue={sortingMethod}
                    onClick={handleSortingSelectClick}
                    methods={methods}/>
            </div>

            <Link className="header__btn" to={'add'}>
                + Add Feedback
            </Link>
        </div>
    )
}

export default Header;