import React, { FC, useEffect, useState, useSyncExternalStore } from 'react'
import MyInput from '../../../../components/MyInput/MyInput';
import style from './TopMenu.module.css'
import MyButton from '../../../../UI/MyButton/MyButton';
interface Props{
    onSearch:(string:string)=>void
}
const TopMenu:FC<Props> = (props) => {
  const [searchInput, setSearchInput] = useState<string>('');

  const handelChange = (value:string) =>{
      setSearchInput(value)
  } 
  const handelSeach = ()=>{
    props.onSearch(searchInput);

  }

  return (
    <div className={style.topMenu}>
        <MyInput onChange={handelChange} placeholder='Benutzerinformationen eingeben' value={searchInput}
        className={`${style.input}`}
        />
        <MyButton mode='black' className={style.button}
          onClick={handelSeach}
        >Suchen</MyButton>
    </div>
  )
}

export default TopMenu
