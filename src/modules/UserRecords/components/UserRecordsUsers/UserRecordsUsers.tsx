import  React, { FC, useEffect } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';

import style from './UserRecordsUsers.module.css'
import Loader from '../../../../UI/Loader/Loader';
import Record from '../../../../helpers/recordHelper';
const UserRecordsUsers:FC = () => {
    const {userInfo} = useTypedSelector(state=> state.user);
    const {records,isRecordsLoading} = useTypedSelector(state=> state.record);
    const {getUserRecords} = useActions();
    
    useEffect(()=>{
        const fetch = async() =>{
             await getUserRecords(userInfo.userId);
        }
        fetch();
    },[])
  return (
    <div className={style.recordRow}>
      {
        isRecordsLoading?
        <Loader/>
        :
        <>
        {
          Array.isArray(records) && 
          records.map((record) =>
            <React.Fragment key={record.id}>
              {React.createElement(Record.getComponentByRecordType(record.recordType), { record: record })}
              
            </React.Fragment>
          )
      }
        </>
      }
    </div>
  )
}

export default UserRecordsUsers
