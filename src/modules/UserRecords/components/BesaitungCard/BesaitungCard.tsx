import React, { FC, useState } from 'react'
import { IPullingRecord, IRecord } from '../../../../models/IRecord'
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock';
import style from './BesaitungCard.module.css'
import BorderMenu from '../../../../UI/BorderMenu/BorderMenu';
import Row from '../../../../components/Layout/Row/Row';
import Column from '../../../../components/Layout/Column/Column';
import RecordHeler from '../../../../helpers/recordHelper';
import RacketStringPhoto from '../../../../UI/RacketStringPhoto/RacketStringPhoto';
import MyButton from '../../../../UI/MyButton/MyButton';
import { useActions } from '../../../../hooks/useActions';
import DeleteRecordMenu from '../DeleteRecordMenu/DeleteRecordMenu';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
interface Props {
  record: IRecord
}

const BesaitungCard: FC<Props> = ({ record }) => {
  const [stateString, stateColor] = RecordHeler.getStateInfo(record);
  const { deleteUserRecord } = useActions();
  const { windowWidth } = useTypedSelector(state => state.adaptive)
  const [isDelteMenuOpen, setIsDeleteMenuOpen] = useState<boolean>(false);
  const handelRecordDelete = () => {
    deleteUserRecord((record as IPullingRecord).id)
  }
  console.log(record)

  return (
    <>
      <GradientBlackBlock className={style.besaitungCard}>
        <Column className={style.blockColumn}>
          <BorderMenu className={style.topBlock}>
            <div className={style.topLeftBlockTitle}>Schläger Nr. {(record as IPullingRecord).pulling.userRacket.number}</div>
            <div className={style.topLeftBlockSubTitle}>DNA {(record as IPullingRecord).pulling.userRacket.code}</div>
          </BorderMenu>
          <BorderMenu className={style.BottomLeftBlock}>
            <div className={style.stringHardnes}> {RecordHeler.formatStringHardnes((record as IPullingRecord).pulling.stringHardness)}</div>
            <div className={`${style.topLeftBlockTitle} ${style.strings}`}>  {RecordHeler.formatStringsName((record as IPullingRecord).pulling.longString.replace('(Eigene Tennissaite)',''), (record as IPullingRecord).pulling.crossString).replace('(Eigene Tennissaite)','')}</div>
          </BorderMenu>
        </Column>
        {windowWidth >= 990 &&
          <RacketStringPhoto racketSrc={(record as IPullingRecord).pulling.userRacket?.racketModel?.imgLink || ''} stringSrc={(record as IPullingRecord).pulling?.string?.imgLink || ''} />
        }
        <Column className={style.blockColumn}>
          <BorderMenu className={style.stateBlock}>
            <div className={style.topLeftBlockTitle} style={{ color: `${stateColor}` }}>{stateString}</div>
          </BorderMenu>
          <MyButton className={style.button} onClick={() => setIsDeleteMenuOpen(true)}>Stornieren</MyButton>
        </Column>
      </GradientBlackBlock>
      {isDelteMenuOpen &&
        <DeleteRecordMenu onDelete={handelRecordDelete} setIsOpen={(value: boolean) => setIsDeleteMenuOpen(value)} />
      }
    </>



  )
}

export default BesaitungCard
