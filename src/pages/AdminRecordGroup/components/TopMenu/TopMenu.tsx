import React from 'react';
import style from './TopMenu.module.css';
import MyButton from '../../../../UI/MyButton/MyButton';
import changeTimeIcon from '../../../../assets/images/change-time.png'
import deleteIcon from '../../../../assets/images/delete-racket-icon.png'
import submitIcon from '../../../../assets/images/sumbit-icon.png'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { AdminRecordGroupService } from '../../api/AdminRecordGroupService';
import { useActions } from '../../../../hooks/useActions';
import { GroupedRecords } from '../../../../models/IRecord';
import { useNavigate } from 'react-router-dom';
import ButtonsList from '../ButtonsList/ButtonsList';
const TopMenu = () => {
    const { recordGroup } = useTypedSelector(state => state.recordGroup)
    const { updateGroupRecordState } = useActions()
    const navigate = useNavigate()
    const handelSubmit = () => {
        // почтовый весервис 

        (recordGroup as GroupedRecords).records.forEach(async record => {
            await updateGroupRecordState(record.id, 3);
        })

    }
  
    return (
        <div className={style.topMenu}>
             <ButtonsList record={(recordGroup as GroupedRecords)} type='group'/>
        </div>
    )
}

export default TopMenu
