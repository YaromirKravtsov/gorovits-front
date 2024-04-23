import { FC, useEffect, useState } from 'react'
import { IGriffreparaturRecord, IOsebandwechselRecord, IPullingRecord, IRacketsTestRecord, IRecord, ITuningRecord, Tuning } from '../../../../models/IRecord';
import style from './AdminRecordCard.module.css'
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock';
import { AdminRecordGroupService } from '../../api/AdminRecordGroupService';
import RecordHeler from '../../../../helpers/recordHelper';
import ButtonsList from '../ButtonsList/ButtonsList';
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import SearchStrings, { StringOption } from '../../../../components/SearchStrings/SearchStrings';
import { IString } from '../../../../models/IString';
import ChangeStringsFlutter from '../ChangeStringsFlutter/ChangeStringsFlutter';
import { MainServise } from '../../../../api/services/MainService';
import { EditPullingDto } from '../../models/EditPullingDto';
import { useActions } from '../../../../hooks/useActions';
import { getErrorText } from '../../../../helpers/FormDataGeneration';


interface Props {
  record: IRecord;
}

const AdminRecordCard: FC<Props> = (props) => {
  const [record, setRecord] = useState<IRecord>(props.record)
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
    setRecord(props.record)
    const fetch = async () => {
      let userRacket;
      let racketModelId

      switch (record.recordType) {
        case 0:
        case 1:
          if ((record as IPullingRecord).pulling.userRacket)
            userRacket = (record as IPullingRecord).pulling.userRacket;
          const stringHardnes = RecordHeler.formatStringHardnes((record as IPullingRecord).pulling.stringHardness)
          const strings = RecordHeler.formatStringsName((record as IPullingRecord).pulling.longString, (record as IPullingRecord).pulling.crossString);
          if (userRacket)
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
            return racket.racketModel ? racket?.racketModel?.manufacturer.name + " " + racket.racketModel.name : 'Schläger wurde nicht gefunden';
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
        if (racketModelId) {
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


  const [isStringEditOpen, setIsStringEditOpen] = useState<boolean>(false);
  const [strings, setStrings] = useState<IString[]>([])
  const handelStringsEditOpen = async () => {
    if ((record.recordType == 1 || record.recordType == 0) && (record as IPullingRecord).pulling.stringId) {
      const { data } = await MainServise.getStrins()
      setIsStringEditOpen(true)
      setStrings(data);
    }
  }
  const { setGlobalError } = useActions()
  const handelStringsEdit = async (dto: EditPullingDto) => {
    try {
      await AdminRecordGroupService.putStrings(dto);

      setIsStringEditOpen(false);

      setRecord(prevRecord => ({
        ...prevRecord,
        pulling: {
          ...(prevRecord as IPullingRecord).pulling,
          crossString: dto.crossString,
          longString: dto.longString,
          stringId: dto.stringId
        }
      }));
    } catch (e) {
      setGlobalError(getErrorText(e));
    }
  }
  useEffect(() => {
    if ((record as IPullingRecord).pulling) {
      const stringHardnes = RecordHeler.formatStringHardnes((record as IPullingRecord).pulling.stringHardness)
      const strings = RecordHeler.formatStringsName((record as IPullingRecord).pulling.longString, (record as IPullingRecord).pulling.crossString);
      setMainConent([stringHardnes, strings])
    }
  }, [record])

  return (
    <>
      {isStringEditOpen &&
        <ChangeStringsFlutter handelEdit={handelStringsEdit} setIsOpen={setIsStringEditOpen} strings={strings} record={(record as IPullingRecord)} />
      }

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
            <div className={`${style.section} ${style.mainSection}`} onClick={handelStringsEditOpen}>
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
    </>
  )
}

export default AdminRecordCard
