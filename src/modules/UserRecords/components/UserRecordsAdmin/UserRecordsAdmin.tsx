import React, { FC, useEffect, useState } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import RecordHeler from '../../../../helpers/recordHelper';
import Loader from '../../../../UI/Loader/Loader';

import style from './UserRecordsAdmin.module.css'
import AdminRecordCard from '../AdminRecordCard/AdminRecordCard';
import { GroupedRecords, IRecord } from '../../../../models/IRecord';
import { RrcordsSearchParams } from '../../../../app/state/auth/types';
import { RecordService } from '../../api/services/recordService';
import MyPagination from '../../../../UI/MyPagination/MyPagination';
interface Props {
  state: number,
  searchQuery: string
}
const UserRecordsAdmin: FC<Props> = (props) => {
  const {  isRecordsLoading, } = useTypedSelector(state => state.record)
  const [records,setRecords] = useState<GroupedRecords[]>([])

  useEffect(() => {
    const fetch = async() => {
      const {data} = await RecordService.getRecordByStatusAndString(0,10,props.searchQuery,props.state)
      console.log(data)
    }
    fetch()

  }, [props.searchQuery,props.state])

  return (
    <div className={'style.recordRow'}>
      {
        isRecordsLoading ?
          <Loader />
          :
          <>
            {
             
        
            <MyPagination
            fetchData={(page, itemsPerPage, searchQuery,state) => RecordService.getRecordByStatusAndString(page, itemsPerPage, searchQuery,state)}
            searchQuery={props.searchQuery}
            renderItem={record =>   <AdminRecordCard record={record} toUser />}
            itemsPerPage={30}
            state={props.state}
            className={style.recordRow}
            list={records}
            setList={setRecords}
          />


             
            }
          </>
      }
    </div>
  )
}

export default UserRecordsAdmin
