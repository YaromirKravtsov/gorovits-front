import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import style from './DimOverlay.module.css'

interface Props{
    className: string, 
    children: ReactNode
}
const DimOverlay:FC<Props> = (props) => {


   
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
