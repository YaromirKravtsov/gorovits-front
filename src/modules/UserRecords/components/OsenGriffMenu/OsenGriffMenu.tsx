import React, { FC, useState } from 'react'
import { IOsebandwechselRecord, IPullingRecord, IRecord, ITuningRecord } from '../../../../models/IRecord'
import style from './OsenGriffMenu.module.css';
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock'

import BorderMenu from '../../../../UI/BorderMenu/BorderMenu'
import FormatDate from '../../../../helpers/dates'
import RacketStringPhoto from '../../../../UI/RacketStringPhoto/RacketStringPhoto'
import Column from '../../../../components/Layout/Column/Column'
import { useActions } from '../../../../hooks/useActions'
import RecordHeler from '../../../../helpers/recordHelper'
import MyButton from '../../../../UI/MyButton/MyButton'
import DeleteRecordMenu from '../DeleteRecordMenu/DeleteRecordMenu'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';

interface Props {
  record: IRecord,
  recordName: string,
  leftBottomText: string;
}

const OsenGriffMenu: FC<Props> = ({ record, leftBottomText, recordName }) => {
  const [stateString, stateColor] = RecordHeler.getStateInfo(record);
  const { deleteUserRecord } = useActions();
  const [isDelteMenuOpen, setIsDeleteMenuOpen] = useState<boolean>(false);
  const handelRecordDelete = () => {
    deleteUserRecord((record as IPullingRecord).id)
  }
  const { windowWidth } = useTypedSelector(state => state.adaptive)
  console.log(leftBottomText.split('</br>'))
  return (
    <>
      <GradientBlackBlock className={style.recordCard}>
        <Column className={style.blockColumn}>
          {windowWidth >= 600 ?
            <BorderMenu className={style.longBlock}>
              <div className={style.topLeftBlockTitle} style={{ color: `${stateColor}` }}>{stateString}</div>
            </BorderMenu>
            :
            <BorderMenu className={style.rightTopBlock}>
              {recordName}
            </BorderMenu>
          }
        
          <BorderMenu className={style.longBlock}>
            {leftBottomText.split('</br>')[0]} 
            {leftBottomText.split('</br>').slice(1).map(el => 
              <>
              {el}
              <br />
              </>
            )}
          </BorderMenu>
        </Column>
        <Column className={style.blockColumn}>
          {windowWidth >= 600 ?
            <BorderMenu className={style.rightTopBlock}>
              {recordName}
            </BorderMenu>
            :
            <BorderMenu className={style.longBlock}>
              <div className={style.topLeftBlockTitle} style={{ color: `${stateColor}` }}>{stateString}</div>
            </BorderMenu>
          }

          <MyButton className={style.button} onClick={() => setIsDeleteMenuOpen(true)}>Stornieren</MyButton>
        </Column>
      </GradientBlackBlock>
      {isDelteMenuOpen &&
        <DeleteRecordMenu onDelete={handelRecordDelete} setIsOpen={(value: boolean) => setIsDeleteMenuOpen(value)} />
      }

    </>
  )
}

export default OsenGriffMenu
