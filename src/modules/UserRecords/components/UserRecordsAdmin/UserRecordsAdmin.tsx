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
import { userInfo } from 'os';
import { useLocation, useParams } from 'react-router-dom';
interface Props {
  state: number,
  searchQuery: string,
  isToSpecificUser?: boolean
}
const UserRecordsAdmin: FC<Props> = (props) => {
  const {  isRecordsLoading, } = useTypedSelector(state => state.record)
  const [records,setRecords] = useState<GroupedRecords[]>([])
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

  console.log(userId)
  return (
    <div className={'style.recordRow'}>
      {
        isRecordsLoading ?
          <Loader />
          :
          <>
            {
              <MyPagination
              fetchData={(page, itemsPerPage, searchQuery,state,userId) => RecordService.getRecordByStatusAndString(page, itemsPerPage, searchQuery,state,userId)}
              searchQuery={props.searchQuery}
              renderItem={record =>   <AdminRecordCard record={record} toUser = {!props.isToSpecificUser} />}
              itemsPerPage={10}
              state={props.state}
              className={style.recordRow}
              list={records}
              setList={setRecords}
              userId={props.isToSpecificUser ? Number(userId) : 'all'}
            />
            }
          </>
      }
    </div>
  )
}

export default UserRecordsAdmin
