import React, { FC, useEffect, useState } from 'react'
import { IGriffreparaturRecord, IOsebandwechselRecord, IPullingRecord, IRacketsTestRecord, IRecord, ITuningRecord, Tuning } from '../../../../models/IRecord';
import style from './AdminRecordCard.module.css'
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock';
import MyButton from '../../../../UI/MyButton/MyButton';
import MyImage from '../../../../UI/MyImage/MyImage';
import sumbitIcon from '../../../../assets/images/sumbit-icon.png'
import changeTimeIcon from '../../../../assets/images/change-time.png'
import deleteIcon from '../../../../assets/images/delete-racket-icon.png'
import orderCheckoutIcon from '../../../../assets/images/order-release-icon.png'
import { AdminRecordGroupService } from '../../api/AdminRecordGroupService';
import RecordHeler from '../../../../helpers/recordHelper';
import { useActions } from '../../../../hooks/useActions';
import ButtonsList from '../ButtonsList/ButtonsList';
import { Link } from 'react-router-dom';
import { UserRackets } from '../../../../modules/Ordering/models/OrderModel';


interface Props {
  record: IRecord;
}
const AdminRecordCard: FC<Props> = ({ record }) => {
  const [racketModel, setRacketModel] = useState<string>()
  const [racketData, setRacketData] = useState<{
    number: string,
    code: string
  }>({
    number: '',
    code: ''
  })
  const [racketNeed, setRacketNeed] = useState<boolean>(true)
  const [mainConent, setMainConent] = useState<string[] | null>([])

  useEffect(() => {
    const fetch = async () => {
      let userRacket;
      let racketModelId
      switch (record.recordType) {
        case 1:
          if ((record as IPullingRecord).pulling.userRacket)
          userRacket = (record as IPullingRecord).pulling.userRacket;
          const stringHardnes = RecordHeler.formatStringHardnes((record as IPullingRecord).pulling.stringHardness)
          const strings = RecordHeler.formatStringsName((record as IPullingRecord).pulling.longString, (record as IPullingRecord).pulling.crossString);
          if(userRacket)
          racketModelId = (userRacket).racketModelId;
          setMainConent([stringHardnes, strings])
          break;
        case 2:
          userRacket = (record as IPullingRecord).pulling.userRacket;
          setMainConent(RecordHeler.renderTuningData((record as ITuningRecord).tuning))
          racketModelId = userRacket.racketModelId;
          break;
        case 3:
          userRacket = (record as IOsebandwechselRecord).userRacket;
          setMainConent(null)
          racketModelId = (record as IOsebandwechselRecord).userRacketId
          break;
        case 4:
          userRacket = (record as IGriffreparaturRecord).userRacket;
          const mainSrtring = `Griffgröße: ` + (record as IGriffreparaturRecord).handleSize
          setMainConent([mainSrtring])
          racketModelId = (record as IOsebandwechselRecord).userRacketId
          break;
        case 8:

          const reckets = (record as IRacketsTestRecord).testRackets;
          const testModelsName = reckets.map(racket => {
            return racket.racketModel.manufacturer.name + " " + racket.racketModel.name;
          })
          setMainConent(testModelsName)
          setRacketNeed(false)
          break;
        default:
          setMainConent(null);
          setRacketNeed(false)
      }
      if (record.recordType <= 4 && userRacket) {
        setRacketData({
          number: `Schläger Nr. ${userRacket.number}`,
          code: userRacket.code

        })
        if(racketModelId){
        const { data } = await AdminRecordGroupService.getNameByModelId(racketModelId)
        setRacketModel(data)
        }
      }
      //===




      //===

    }
    fetch();

  }, [])

  //@ts-ignore
  const [stateString, stateColor] = RecordHeler.getStateInfo(record as IRecord);
  return (

    <GradientBlackBlock className={style.recordBlock}>
      <div className={style.mainRow}>
        {racketNeed &&
          <div className={style.section}>
            <div className={style.fragment}>{racketData.number} <br /> {racketData.code}</div>
            <div className={style.line}></div>
            <div className={style.fragment}>{racketModel}</div>
          </div>
        }
        {mainConent !== null &&
          <div className={`${style.section} ${style.mainSection}`}>
            {mainConent.map(string =>
              <div>
                {string}
              </div>

            )}

          </div>
        }
        <div className={`${style.section} ${style.mainSection}`} style={{ color: stateColor }}>{stateString}</div>
        <div className={style.section}>
          <div className={style.fragment}>User Comment</div>
          <div className={style.line}></div>
          <div className={`${style.fragment} ${style.comment}`}>{record.userComment == '' ? <> Kein Kommentar</> : record.userComment}</div>
        </div>
      </div>
      <div className={style.buttonRow}>
        <ButtonsList record={record} type='single' />

      </div>
    </GradientBlackBlock>

  )
}

export default AdminRecordCard
