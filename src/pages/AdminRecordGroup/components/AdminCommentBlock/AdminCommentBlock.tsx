import React, { useEffect, useState } from 'react'
import style from './AdminCommentBlock.module.css'
import MyButton from '../../../../UI/MyButton/MyButton'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { AdminRecordGroupService } from '../../api/AdminRecordGroupService';
const AdminCommentBlock = () => {
    const [comment, setComment] = useState<string>('');
    const { recordGroup  } = useTypedSelector(state => state.recordGroup)
    useEffect(()=>{
        if(recordGroup.adminComment == 'null'){
            return;
        }
        setComment(recordGroup.adminComment)
    },[recordGroup])
    const handelSave = () => {
        recordGroup.records.forEach( async (record)=>{
                await AdminRecordGroupService.setAdminComment(record.id,comment)
        })
    }
  return (
    <div className={style.adminComment}>
            <MyButton className={style.adminCommentButton} mode='black' 
            onClick={handelSave}
            > 
            Speichern  
            </MyButton>
            <textarea name="admin comment" 
            value ={comment}
            onChange={e => setComment(e.target.value)}
            className={style.admintCommentInput}
            placeholder='Kommentar des Administrators eingeben '
            ></textarea>
        </div>
  )
}

export default AdminCommentBlock
