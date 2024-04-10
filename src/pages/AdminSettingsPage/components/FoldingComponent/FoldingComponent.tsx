import React, { FC, ReactNode, useEffect, useState } from 'react'
import style from './FoldingComponent.module.css';
import MyInput from '../../../../components/MyInput/MyInput';
import MyButton from '../../../../UI/MyButton/MyButton';
import arrowIcon from '../../../../assets/images/arrow.png'
import plusIcon from '../../../../assets/images/plus.png'
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import MyPagination from '../../../../UI/MyPagination/MyPagination';
interface Props {
    onAdd: () => void,
    onSearch: (value: string) => void,
    title: string,
    children: ReactNode,
    isFolded: boolean,
    setIsFolded: (value: boolean) => void,
}

const FoldingComponent: FC<Props> = ({ isFolded, ...props }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const handelSearch = () => {
        props.onSearch(inputValue);
    }

    return (
        <FlutterMenu className={`${style.foldingComponent}`} shadow='small'>
            <div className={style.topMenu}>
                <div className={style.topMenuTitle}>{props.title}</div>
                <form onSubmit={()=> alert(123)} className={style.form}>
            
                <MyInput value={inputValue} onChange={setInputValue} placeholder={`${props.title} suchen`}
                    className={style.searchInput} />
                  
                
                <MyButton mode='black' className={style.searchButton} onClick={handelSearch}>Suchen</MyButton>
                </form>
                <MyButton type = 'submit'mode='black' className={style.folderingButton} onClick={() => console.log(!isFolded)}><img className={style.plusImgage} src={plusIcon} alt="" /></MyButton>
              
                <MyButton mode='black' className={style.folderingButton} onClick={() => props.setIsFolded(!isFolded)}><img className={`${style.folderingImgage} ${isFolded && style.rotate}`} src={arrowIcon} alt="" /></MyButton>

            </div>

            <div className={`${style.mainRow} ${!isFolded ? style.foldedMainRow : ''}`}>
                {props.children}
            </div>


        </FlutterMenu>
    )
}

export default FoldingComponent
