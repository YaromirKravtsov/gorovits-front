import React, { FC, useRef, useState, useEffect } from 'react';
import style from './DropDownInput.module.css';
import MyImage from '../MyImage/MyImage';
import arrow from '../../assets/images/black-arrow.png';

export interface Option {
    value: number,
    label: string,
}

interface Props {
    className?: string,
    options: Option[],
    defaultValue: string,
    onChange: (value: number) => void,
    value: number,
    defaultOptions?:  Option[]
}

const DropDownInput: FC<Props> = (props) => {
   
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [label, setLabel] = useState<string>(props.defaultValue);
    const selectRef = useRef<HTMLDivElement>(null);
    const [isPlaceholder, setIsPlaceholder] = useState<boolean>(true)
    useEffect(() => {

        if (props.value !== undefined) {
            const selectedOption = props?.defaultOptions?.find(option => option.value === props.value);
  
            if (selectedOption) {
                setLabel(selectedOption.label);
            }
        }
    }, [props.value, props.options]);

    useEffect(() => {
        // Обновление label при изменении defaultValue
        setLabel(props.defaultValue);
        setIsPlaceholder(true)
    }, [props.defaultValue]);

    const handleSelectClick = () => {
        setIsOpen(prev => !prev);
       
    }
    
    const handleOptionSelect = (option: Option) => {
        props.onChange(option.value);
        setLabel(option.label);
        setIsPlaceholder(false)
        setIsOpen(false);
    }
    return (
        <div>
            <div className={`${props.className} ${style.select}`} onClick={handleSelectClick}>
                <div className={style.defaultValue} ref={selectRef} style={{ color: `${!isPlaceholder ? '#232323' : ''}` }}>{label}</div>
                <MyImage alt='arrow' src={arrow} className={`${style.arrow} ${isOpen && style.grad}`} />
            </div>
            {isOpen &&
                <div className={style.optionList} >
                    <div className={style.vorgeschlagene}>Vorgeschlagene</div>
                    {props.options.map((option) => (
                        <div key={option.value} className={style.option} onClick={() => handleOptionSelect(option)}>{option.label}</div>
                    ))}
                </div>
            }
        </div>
    );
};

export default DropDownInput;
