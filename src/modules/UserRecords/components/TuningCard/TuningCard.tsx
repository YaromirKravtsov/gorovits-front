import React, { FC, useState } from 'react'
import { IPullingRecord, IRecord, ITuningRecord } from '../../../../models/IRecord'
import style from './TuningCard.module.css'
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock'

import BorderMenu from '../../../../UI/BorderMenu/BorderMenu'
import FormatDate from '../../../../helpers/dates'
import RacketStringPhoto from '../../../../UI/RacketStringPhoto/RacketStringPhoto'
import Column from '../../../../components/Layout/Column/Column'
import { useActions } from '../../../../hooks/useActions'
import RecordHeler from '../../../../helpers/recordHelper'
import MyButton from '../../../../UI/MyButton/MyButton'
import DeleteRecordMenu from '../DeleteRecordMenu/DeleteRecordMenu'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
interface Props {
  record: IRecord
}
const TuningCard: FC<Props> = ({ record }) => {
  const [stateString, stateColor] = RecordHeler.getStateInfo(record);
  const { deleteUserRecord } = useActions();
  const [isDelteMenuOpen, setIsDeleteMenuOpen] = useState<boolean>(false);
  const handelRecordDelete = () => {
    deleteUserRecord((record as IPullingRecord).id)
  }
  const { windowWidth } = useTypedSelector(state => state.adaptive)

  return (
    <>
      <GradientBlackBlock className={style.besaitungCard}>
        <Column className={style.blockColumn}>
          <BorderMenu className={style.topBlock}>
            <div className={style.topLeftBlockTitle}>Schläger Nr. {(record as IPullingRecord).pulling.userRacket.number}</div>
            <div className={style.topLeftBlockSubTitle}>{(record as IPullingRecord).pulling.userRacket.code}</div>
          </BorderMenu>
          <BorderMenu className={style.BottomLeftBlock}>
            <div className={style.TuningParametrs}>
              {
                RecordHeler.renderTuningData((record as ITuningRecord).tuning).map(el =>
                  <>{el} <br /></>
                )
              }

            </div>
          </BorderMenu>
        </Column>
        {windowWidth >= 600 &&
          <RacketStringPhoto /* mode */ racketSrc={(record as IPullingRecord).pulling.userRacket?.racketModel?.imgLink || ''} stringSrc={(record as IPullingRecord).pulling?.string?.imgLink || ''} />
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

export default TuningCard
