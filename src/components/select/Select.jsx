import { useEffect } from 'react';
import './select.scss';

const Select = ({options, currentValue, onClick, setSelectVisible}) => {
    const SelectOption = ({option, currentValue}) => {
        return(
            <button type="button" className='select-menu__button'>
                {option}{option === currentValue && <img src="/arrow-select.svg" alt="selected"/>}
            </button>
        )
    }

    useEffect(() => {
        const handleSelectExit = (e) => {
            const target = e.target;
            if(target.closest('.select-label')) return;
            setSelectVisible(false);
        }

        window.addEventListener('click', handleSelectExit);

        return () => {
            window.removeEventListener('click', handleSelectExit);
        }
        //eslint-disable-next-line
    }, [])


    const elements = options
        .map((option, index) => 
            <SelectOption
                key={index}
                option={option}
                currentValue={currentValue}/>
            )

    return(
        <div className="select-menu" onClick={onClick}>
            {elements}
        </div>
    )
}

export default Select;