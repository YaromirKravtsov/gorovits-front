import React, { FC, useEffect, useState, useSyncExternalStore } from 'react'
import MyInput from '../../../../components/MyInput/MyInput';
import style from './TopMenu.module.css'
import MyButton from '../../../../UI/MyButton/MyButton';
interface Props{
    onSearch:(string:string)=>void
}
const TopMenu:FC<Props> = (props) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const handelChange = (value:string) =>{
      setSearchInput(value)
  } 
  const handelSeach = ()=>{
    if(searchInput == ''){
      setIsError(true)
 
      return;
    }
    props.onSearch(searchInput);

  }
  useEffect(()=>{
    setIsError(false)
  },[searchInput])
  return (
    <div className={style.topMenu}>
        <MyInput onChange={handelChange} placeholder='Benutzerinformationen eingeben' value={searchInput}
        className={`${style.input} ${isError && style.error}`}
        />
        <MyButton mode='black' className={style.button}
          onClick={handelSeach}
        >Suchen</MyButton>
    </div>
  )
}

export default TopMenu
