import React, { FC, useEffect, useState } from 'react'
import MyInput from '../../../../components/MyInput/MyInput';
import MyButton from '../../../../UI/MyButton/MyButton';
import style from './TopMenu.module.css'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';
interface Props {
    userId: number
}
const TopMenu: FC<Props> = ({ userId }) => {
    const { recordsSearchParams } = useTypedSelector(state => state.auth);
    const [string, setString] = useState<string>(recordsSearchParams.string);
    const { getUserRecordsByString } = useActions();
    const handleClick = async () => {
        await getUserRecordsByString(userId, -1, string)
    }

    useEffect(() => {
        const fetch = async () => {
            console.log()
            await getUserRecordsByString(userId, -1, '')
        }
        fetch()
    }, []);

    return (
        <div className={style.topRow}>
            <MyInput value={string} onChange={setString} placeholder='Bestellungen suchen' className={style.input} />
            <MyButton mode='black' onClick={handleClick} className={style.button}>
                Suchen
            </MyButton>
        </div>
    )
}

export default TopMenu
