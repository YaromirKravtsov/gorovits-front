import React, { FC, useEffect, useState } from 'react'
import CheckBox from '../../UI/CheckBox/CheckBox'
import MyInput from '../MyInput/MyInput';
import style from './StringingHardnessInput.module.css'
interface Props {
    onChange: (value: string) => void,
    error: boolean,
    setError: (value: boolean) => void,
    value: string,
    className: string

}
const StringingHardnessInput: FC<Props> = (props) => {
    const [isChecked, setIsChecked] = useState<boolean>();
    useEffect(() => {
        props.value.trim() !=='' &&setIsChecked(props.value.includes('.'))
    }, [props.value])

    const toggleFormat = (str: string): string => {
        const decimalRegex = /^\d+\.\d+×\d+\.\d+$/;
        const integerRegex = /^\d+×\d+$/;

        if (decimalRegex.test(str)) {
            const [firstPart, secondPart] = str.split('×');
            return `${Math.floor(parseFloat(firstPart))}×${Math.floor(parseFloat(secondPart))}`;
        } else if (integerRegex.test(str)) {
            const [firstPart, secondPart] = str.split('×');
            return `${firstPart}.1×${secondPart}.1`;
        } else {
            return str;
        }
    };



    const handleCheckboxChange = (value: boolean) => {
        props.onChange(toggleFormat(props.value))
        setIsChecked(value)
    }
    return (
        <>
            <MyInput
                onChange={props.onChange}
                mask={isChecked? '99.9×99.9': "99×99"}
                placeholder={isChecked ? '__._×__._' : '__×__'}
                error={props.error}
                setError={props.setError}
                value={props.value}
                className={`${style.input} ${props.className}`}
                
            />
            <CheckBox text='Nachkommastellen anzeigen' isChecked={isChecked} setIsChecked={handleCheckboxChange} className={`${props.error ?style.checkBoxError: ''}`}/>
        </>
    )
}

export default StringingHardnessInput
