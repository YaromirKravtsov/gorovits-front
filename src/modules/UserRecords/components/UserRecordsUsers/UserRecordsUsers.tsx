import  React, { FC, useEffect } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';

import style from './UserRecordsUsers.module.css'
import Loader from '../../../../UI/Loader/Loader';
import Record from '../../../../helpers/recordHelper';
interface Props{
  state?: 'all'
}
const UserRecordsUsers:FC<Props> = (props) => {
    const {userInfo} = useTypedSelector(state=> state.user);
    const {records,isRecordsLoading} = useTypedSelector(state=> state.record);
    const {getUserRecords} = useActions();
    
    useEffect(()=>{
        const fetch = async() =>{
          const state = props.state == 'all' ? 'all' : ''
             await getUserRecords(userInfo.userId,state);
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
