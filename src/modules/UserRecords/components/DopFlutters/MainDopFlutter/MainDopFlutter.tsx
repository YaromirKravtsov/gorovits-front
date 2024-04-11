import React, { FC, useState } from 'react'
import { GroupedRecords, IRecord } from '../../../../../models/IRecord'
import GradientBlackBlock from '../../../../../UI/GradientBlackBlock/GradientBlackBlock';
import style from './MainDrop.module.css'
import BorderMenu from '../../../../../UI/BorderMenu/BorderMenu';
import RecordHeler from '../../../../../helpers/recordHelper';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../../../../hooks/useActions';
import { Link } from 'react-router-dom';
interface Props {
  record: GroupedRecords,
  toUser?: boolean
}
const MainDopFlutter: FC<Props> = ({ record, toUser }) => {

  const { setGlobalRecordGroup } = useActions()
  const queryParams = {
    recordType: record.recordType,
    dateTime: record.dateTime,
    pickupTime: record.pickupTime
  };
  //@ts-ignore
  const queryString = new URLSearchParams(queryParams).toString();
  //@ts-ignore
  const [stateString, stateColor] = RecordHeler.getStateInfo(record as IRecord);
  return (
    <>
      <Link to={`/bestellung/?${queryString}`}>
        <div className={style.clickedBlock} >
          <GradientBlackBlock className={style.gradient}>
            <BorderMenu className={style.stateBlock}>
              <div className={style.topLeftBlockTitle} style={{ color: `${stateColor}` }}>{stateString}</div>
            </BorderMenu>

            <BorderMenu className={style.recordType}>
              <div className={style.topLeftBlockTitle}>{RecordHeler.insertSpaceIfNeeded(RecordHeler.getNameByRecordType(record.recordType),10)}</div>
            </BorderMenu>
            {toUser ?
              <></>
              :
              <BorderMenu className={style.fullName}>
                <div className={style.topLeftBlockTitle}>{record.user?.fullName}</div>
              </BorderMenu>
            }
          </GradientBlackBlock>
        </div>
      </Link>
    </>
  )
}

export default MainDopFlutter
