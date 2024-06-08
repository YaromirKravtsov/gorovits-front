import React, { FC, useEffect, useState } from 'react'
import MyInput from '../../../../components/MyInput/MyInput';
import MyButton from '../../../../UI/MyButton/MyButton';
import style from './TopMenu.module.css'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';
import DropDownInput, { Option } from '../../../../UI/DropDownInput/DropDownInput';

interface Props {
    state: number,
    setState: (vakue: number) => void,
    setSearchQuery: (value: string) => void
}
const TopMenu: FC<Props> = (props) => {
    //TODO доделать логику подгрузки из localStorege изменений 
    const stausOptions: Option[] = [
        {
            value: 1,
            label: 'Auftrag',
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
   /*  const { setRecordsSearchParams } = useActions(); */
    const { recordsSearchParams } = useTypedSelector(state => state.auth)

    const [status, setStatus] = useState<number>(recordsSearchParams.state);

    const [inputString, setInputString] = useState<string>(recordsSearchParams.string);
    const handelSearch = async () => {
        props.setSearchQuery(inputString)
        props.setState(status);
      /*   setRecordsSearchParams({
            state: status,
            string: inputString
        }) */
    }

    useEffect(() => {
        const fetch = async () => {

            if(props.state){
                setStatus(props.state)   
                console.log('props.state')
                console.log(props.state)
            }
            
        }
        fetch()
    }, [])

    return (
        <div className={style.topMenu}>
            <MyInput onChange={setInputString} value={inputString} placeholder='Bestellungen suchen' className={style.input} />
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
