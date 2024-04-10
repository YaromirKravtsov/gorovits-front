import React, { FC, useEffect, useState } from 'react'
import style from './TopMenu.module.css'
import DropDownInput, { Option } from '../../../../UI/DropDownInput/DropDownInput';
import MyInput from '../../../../components/MyInput/MyInput';
import MyButton from '../../../../UI/MyButton/MyButton';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';

interface Props{
    state:number,
    setState: (vakue:number) => void
}
const TopMenu:FC<Props> = (props) => {
    const stausOptions:Option[] = [
            {
                value: 1,
                label: 'Reserviert', 
            },
            {
                value: 2,
                label: 'In Bearbeitung', 
            },
            {
                value: 3,
                label: 'Abholbereit', 
            },
            {
                value: -1,
                label: 'Abgeschlossen', 
            },
        
    ]
    const {setRecordsSearchParams} = useActions();
    const {recordsSearchParams} = useTypedSelector(state=> state.auth)
   
    const [status, setStatus] = useState<number>(recordsSearchParams.state);
    const { getRecordByStatusAndString } = useActions();
    const [inputString, setInputString] = useState<string>(recordsSearchParams.string);
    const handelSearch = async () =>{
        await getRecordByStatusAndString(status, inputString)
        setRecordsSearchParams({
            state:status,
            string:inputString
        })
    }

    useEffect(()=>{
        const fetch = async() =>{
            getRecordByStatusAndString(status, inputString)
        }
        fetch()
    },[])
    
  return (
    <div className ={style.topMenu}>
        <MyInput onChange={setInputString} value={inputString} placeholder='Bestellungen suchen'/>
        <DropDownInput
        className={style.dwopDown}
        onChange={setStatus}
        value={status}
        options={stausOptions}
        defaultValue='Bestellstatus wählen'
        />
       <MyButton mode='black' onClick={handelSearch} className={style.button}>
            Suchen
       </MyButton>
    </div>
  )
}

export default TopMenu
