import React, { FC, useState } from 'react'
import style from './CheckBox.module.css';
interface Props{
    setIsChecked: (value: boolean) => void,
    text: string,
    className?:string
}
const CheckBox:FC<Props> = (props) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        props.setIsChecked(event.target.checked)
    };

    return (
        <div className={`${props.className} ${style.isToTestRow}`}>
            <div className={style.checkboxContainer}>
                <input type='checkbox' className={style.testCheckBox} checked={isChecked} onChange={handleCheckboxChange} />
                <span className={style.checkmark}></span>
            </div>
            <div className={style.isToTestText}>{props.text}</div>
        </div>
    )
}

export default CheckBox
