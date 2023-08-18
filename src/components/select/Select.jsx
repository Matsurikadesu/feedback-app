import { useEffect, useState } from 'react';
import './select.scss';
import { useFormContext } from 'react-hook-form';

const Select = ({options, currentValue, name, onClick = false}) => {
    const [isVisible, setIsVisible] = useState(false);
    // const [value, setValue] = useState(currentValue);
    const {register, setValue, getValues} = useFormContext();
    const handleOptionClick = (e) => {
        const value = e.target.textContent;
        setValue(name, value);
        // setValue(value);
    }

    const handleSelectLableClick = () => {
        const visible = !isVisible;
        setIsVisible(visible);
    }

    const SelectOption = ({option, currentValue}) => {
        return(
            <button type="button" className='select-menu__button'>
                {option}{option === currentValue && <img src="/icons/arrow-select.svg" alt="selected"/>}
            </button>
        )
    }

    useEffect(() => {
        const handleSelectExit = (e) => {
            const target = e.target;
            if(target.closest('.select-label') || target.classList.contains('select-value')) return;
            setIsVisible(false);
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

    const SelectMenu = () => {
        return(
            isVisible && 
                <div className="select-menu" onClick={onClick ? onClick : handleOptionClick}>
                    {elements}
                </div> 
        )    
    }

    const FormSelect = () => {
        return (
            <div className='form__select select-label' data-testid='select' onClick={handleSelectLableClick}>
                <span className='form__select-value'>{getValues(name) ? getValues(name) : currentValue} <img className={isVisible ? 'select-arrow select-arrow_active' : 'select-arrow'} src="/icons/arrow-select-add.svg" alt="select arrow"/></span>
                <SelectMenu/>
                <input type="text" {...register(name)} defaultValue={currentValue} readOnly hidden/>
            </div>
        )
    }

    const InlineSelect = () => {
        return(
            <>
                <span className='select-value' onClick={handleSelectLableClick} tabIndex={0}>
                    {currentValue} <img className={isVisible ? 'header__select-arrow header__select-arrow_active' : 'header__select-arrow'} src='/icons/select-white-arrow.svg' alt='select arrow'/>
                </span>
                <SelectMenu/>
            </>
        )
    }

    return(
        onClick 
            ? <InlineSelect/>
            : <FormSelect/>
    )
}

export default Select;