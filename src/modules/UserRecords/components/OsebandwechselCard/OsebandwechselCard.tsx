import  { FC } from 'react';
import { IOsebandwechselRecord, IRecord } from '../../../../models/IRecord';
import OsenGriffMenu from '../OsenGriffMenu/OsenGriffMenu';

interface Props{
    record: IRecord
}
const OsebandwechselCard :FC<Props> = ({record}) => {

    return (
    <>
    <OsenGriffMenu record={record} 
    recordName='Ösebandwechsel'
    leftBottomText={` Schläger Nr. ${(record as IOsebandwechselRecord).userRacket.number} </br> ${(record as IOsebandwechselRecord).userRacket.code} `}/>
    </>
  )
}

export default OsebandwechselCard
