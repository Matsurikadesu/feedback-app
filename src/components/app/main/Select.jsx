import { useEffect } from 'react';
import './select.scss';

const Select = ({currentSort, onClick, setSelectVisible}) => {
    const filterOptions = ['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments'];

    const SelectOption = ({sortName, currentSort}) => {
        return(
            <button type="button" className='select-menu__button'>
                {sortName}{sortName === currentSort && <img src="/arrow-select.svg" alt="selected"/>}
            </button>
        )
    }

    useEffect(() => {
        const handleSelectExit = (e) => {
            const target = e.target;
            if(target.closest('.header__label')) return;
            setSelectVisible(false);
        }

        window.addEventListener('click', handleSelectExit);

        return () => {
            window.removeEventListener('click', handleSelectExit);
        }
        //eslint-disable-next-line
    }, [])


    const options = filterOptions
        .map((option, index) => 
            <SelectOption
                key={index}
                sortName={option}
                currentSort={currentSort}/>
            )

    return(
        <div className="select-menu" onClick={onClick}>
            {options}
        </div>
    )
}

export default Select;