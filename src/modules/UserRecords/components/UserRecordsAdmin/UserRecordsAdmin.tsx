import React, { FC, useEffect, useState } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import RecordHeler from '../../../../helpers/recordHelper';
import Loader from '../../../../UI/Loader/Loader';

import style from './UserRecordsAdmin.module.css'
import AdminRecordCard from '../AdminRecordCard/AdminRecordCard';
import { GroupedRecords } from '../../../../models/IRecord';
import { RrcordsSearchParams } from '../../../../app/state/auth/types';
interface Props {
  toUser?: boolean
}
const UserRecordsAdmin: FC<Props> = () => {
  const [currentRecords, setCurrentrecords] = useState<GroupedRecords[]>([])
  const { records, isRecordsLoading } = useTypedSelector(state => state.record)
  
  useEffect(() => {
      const grupRecords = RecordHeler.groupRecords(records)
      setCurrentrecords(grupRecords)

  }, [records])

  return (
    <div className={style.recordRow}>
      {
        isRecordsLoading ?
          <Loader />
          :
          <>
            {
              Array.isArray(currentRecords) &&
              currentRecords.map((record,index) =>
                <AdminRecordCard record={record} toUser key ={index}/>
              )
            }
          </>
      }
    </div>
  )
}

export default UserRecordsAdmin
