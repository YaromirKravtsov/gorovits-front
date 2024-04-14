import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import style from './DimOverlay.module.css'

interface Props{
    className?: string, 
    children?: ReactNode,
    isDim?: boolean
}
const DimOverlay:FC<Props> = ({isDim = false,...props}) => {
    if(isDim){
        return (
            <>{props.children}</>
        )
    }
    return (
        <>
            <div className={style.dim}></div>
            <div className={`${style.main} ${props.className}`}>
                 {props.children}
            </div>
           
        </>
    )
};

export default DimOverlay;
