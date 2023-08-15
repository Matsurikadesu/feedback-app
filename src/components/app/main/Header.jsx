import { Link } from 'react-router-dom';
import './header.scss';
import { feedbacksAmount, sortingSelected } from '../../../store/feedbacksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedbacksAmountByStatus } from '../../../firebase/services';
import { useEffect, useState } from 'react';
import Select from '../../select/Select';

const Header = () => {
    const filterOptions = ['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments'];
    const dispatch = useDispatch();
    const sortingMethod = useSelector(state => state.sortingMethod);
    const filter = useSelector(state => state.filter);
    const [amount, setAmount] = useState('0');
    const [selectVisible, setSelectVisible] = useState(false);

    const handleSortingSelectClick = (e) => {
        const sorting = e.target.textContent;

        if(sorting !== sortingMethod) {
            dispatch(sortingSelected(sorting));
            setSelectVisible(false);
        }
    }

    const handleOpenSelectClick = () => {
        const isVisible = !selectVisible;
        setSelectVisible(isVisible);
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
                <span onClick={handleOpenSelectClick} tabIndex={0}>
                    Sort by : {sortingMethod} <img className={selectVisible ? 'header__select-arrow header__select-arrow_active' : 'header__select-arrow'} src='/select-white-arrow.svg' alt='select arrow'/>
                </span>
                {
                    selectVisible && 
                        <Select
                            options={filterOptions}
                            onClick={handleSortingSelectClick} 
                            currentValue={sortingMethod}
                            setSelectVisible={setSelectVisible}/>
                }
            </div>

            <Link className="header__btn" to={'add'}>
                + Add Feedback
            </Link>
        </div>
    )
}

export default Header;