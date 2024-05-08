import  { FC } from 'react'
import OsenGriffMenu from '../OsenGriffMenu/OsenGriffMenu'
import { IGriffreparaturRecord, IRecord } from '../../../../models/IRecord'

interface Props{
    record: IRecord
}
const GriffreparaturCard:FC<Props> = ({record}) => {
  const  leftBottomText=` Schläger Nr. ${(record as IGriffreparaturRecord).userRacket.number}  </br> DNA: ${(record as IGriffreparaturRecord).userRacket.code}</br>
  Griffgröße: ${record.handleSize}
  `
  return (
    <>
    <OsenGriffMenu record={record} 
    recordName='Griffreparatur'
    leftBottomText={leftBottomText}/>
    </>
  )
}

export default GriffreparaturCard
