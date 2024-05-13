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
import * as PDFLib from 'pdf-lib';
import MyButton from '../../../../UI/MyButton/MyButton';
import logoWhite from '../../../../assets/images/logo-white.png'
import fs from 'fs';
import DatesHelper from '../../../../modules/Ordering/helpers/DatesHelper';
import FormatDate from '../../../../helpers/dates';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import InfoFlutter from '../../../../UI/InfoFlutter/InfoFlutter';
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
      console.log(record)
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
          racketModelId = userRacket.racketModelId;
          break;
        case 4:
          userRacket = (record as IGriffreparaturRecord).userRacket;
          const mainSrtring = `Griffgröße: ` + (record as IGriffreparaturRecord).handleSize
          setMainConent([mainSrtring])
          racketModelId = userRacket.racketModelId
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
          console.log(racketModelId)
          const { data } = await AdminRecordGroupService.getNameByModelId(racketModelId)
          setRacketModel(data)
        }
      }
      //====
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

  const [isUserCommentOpen,setIsUserCommentOpen] = useState<boolean>(false);

  const generatePDF = async () => {
    const pdfDoc = await PDFLib.PDFDocument.create();
    const cmToPt = (cm: number) => cm * 28.3465; // Конвертер сантиметров в пункты (1 см = 28.3465 pt)

    // Указываем размер страницы в сантиметрах
    const pageWidthInCm = 14;
    const pageHeightInCm = 7;
    const pageWidthInPt = cmToPt(pageWidthInCm);
    const pageHeightInPt = cmToPt(pageHeightInCm);
    const page = pdfDoc.addPage([pageWidthInPt, pageHeightInPt]);



    const imageBytes = await fetch(logoWhite).then(res => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes)
    page.drawImage(image, {
      x: cmToPt(.6),
      y: page.getSize().height - cmToPt(0.25) - cmToPt(2),
      width: cmToPt(4.5),
      height: cmToPt(2),
    });



    const fontBold = await pdfDoc.embedFont('Helvetica-Bold');
    const font = await pdfDoc.embedFont('Helvetica');
    const centerX = cmToPt(.6) + cmToPt(4.5) / 2; // Центр изображения по X
    const centerY = page.getSize().height - cmToPt(0.25) - cmToPt(2.3);
    page.drawText('Spieler', {
      x: centerX - font.widthOfTextAtSize('Spieler', 11) / 2, // Центрирование по горизонтали
      y: centerY, // Позиция по вертикали
      size: 11,
      font: font,
    });



    page.drawText(String(record.user?.fullName), {
      x: centerX - font.widthOfTextAtSize(String(record.user?.fullName), 11) / 2, // Центрирование по горизонтали
      y: page.getSize().height - cmToPt(0.25) - cmToPt(2.3) - 11, // Позиция по вертикали
      size: 11,
      font: fontBold,
    });


    const racketNumber = racketData.number
    page.drawText(racketNumber, {
      x: centerX - font.widthOfTextAtSize(racketNumber, 11) / 2, // Центрирование по горизонтали
      y: page.getSize().height / 2 - cmToPt(1),
      size: 11,
      font: font,
    });

    const racketCode = `DNA: ${racketData.code}`
    page.drawText(racketCode, {
      x: centerX - font.widthOfTextAtSize(racketCode, 11) / 2, // Центрирование по горизонтали
      y: page.getSize().height / 2 - cmToPt(1) - 11,
      size: 11,
      font: font,
    });

    const pickUpText = `Abholung am `
    page.drawText(pickUpText, {
      x: centerX - font.widthOfTextAtSize(pickUpText, 11) / 2, // Центрирование по горизонтали
      y: 11 + 5 * 2,
      size: 11,
      font: font,
    });

    const pickUpTime = (record.pickupTime) ? FormatDate.SqlToDateTime(record.pickupTime) : 'Nicht zugewiesen '
    page.drawText(pickUpTime, {
      x: centerX - font.widthOfTextAtSize(pickUpTime, 11) / 2, // Центрирование по горизонтали
      y: 10,
      size: 11,
      font: font,
    });

    /* ======================== */
    const borderBlockWidth = cmToPt(7);
    const borderBlockHeight = cmToPt(4);

    // Определяем координаты и размеры прямоугольника
    const borderBlockX = page.getSize().width - cmToPt(.6) - borderBlockWidth;
    const borderBlockY = page.getSize().height - cmToPt(0.25) - borderBlockHeight;


    // Рисуем черные грани прямоугольника
    page.drawRectangle({
      x: borderBlockX,
      y: borderBlockY,
      width: borderBlockWidth,
      height: borderBlockHeight,
      color: PDFLib.rgb(0, 0, 0), // Черный цвет
      borderColor: PDFLib.rgb(0, 0, 0), // Цвет границы
      borderWidth: 0.01, // Ширина границы
    });

    // Заполняем прямоугольник белым цветом
    page.drawRectangle({
      x: borderBlockX + 0.5, // Учитываем толщину границы
      y: borderBlockY + 0.5, // Учитываем толщину границы
      width: borderBlockWidth - 1, // Учитываем толщину границы
      height: borderBlockHeight - 1, // Учитываем толщину границы
      color: PDFLib.rgb(1, 1, 1), // Белый цвет
      borderColor: PDFLib.rgb(0, 0, 0), // Прозрачная граница
    });


    const fontSize = 11;

    // Определяем координаты для текста (учитываем толщину границы)
    const borderTextX = borderBlockX + 5; // Отступ слева
    const textY = borderBlockY + borderBlockHeight - 13; // Отступ сверху (учитываем толщину границы)
    const stringHardnes = RecordHeler.formatStringHardnes((record as IPullingRecord).pulling.stringHardness)
    // Рисуем текст внутри прямоугольника
    page.drawText(stringHardnes, {
      x: borderTextX,
      y: textY,
      size: fontSize,
      color: PDFLib.rgb(0, 0, 0), // Черный цвет
      font: font, // Жирный шрифт
    });

    function wrapText(text: string, maxWidth: number) {
      const words = text.split(' ');
      let lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = font.widthOfTextAtSize(currentLine + ' ' + word, fontSize);

        if (width < maxWidth) {
          currentLine += ' ' + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);

      return lines.join('\n');
    }
    let isEigene = false;
    function removeSubstring(text: string): string {
      if (text.includes('(Eigene Tennissaite)')) {
        isEigene = true;
      }
      return text.replace('(Eigene Tennissaite)', '').trim();
    }

    const longString = removeSubstring((record as IPullingRecord).pulling.longString)
    const crossString = removeSubstring((record as IPullingRecord).pulling.crossString)
    page.drawText(longString, {
      x: borderTextX,
      y: borderBlockY + borderBlockHeight - 40,
      size: fontSize,
      color: PDFLib.rgb(0, 0, 0),
      font: fontBold,
    });

    page.drawText(wrapText(crossString, borderBlockWidth), {
      x: borderTextX,
      y: borderBlockY + borderBlockHeight - 60,
      size: fontSize,
      color: PDFLib.rgb(0, 0, 0),
      font: fontBold,
    });


    page.drawText(isEigene ? '(eigene Rolle)' : '', {
      x: borderTextX,
      y: borderBlockY + borderBlockHeight - 70,
      size: fontSize,
      color: PDFLib.rgb(0, 0, 0),
      font: fontBold,
    });
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Создаем ссылку для скачивания PDF
    const link = document.createElement('a');
    link.href = url;
    link.download = RecordHeler.getNameByRecordType(record.recordType) + '_' + record.user?.fullName;
    link.click();
  };
  const { recordGroup } = useTypedSelector(state => state.recordGroup)
  return (
    <>
    {isUserCommentOpen}
      {isStringEditOpen &&
        <ChangeStringsFlutter handelEdit={handelStringsEdit} setIsOpen={setIsStringEditOpen} strings={strings} record={(record as IPullingRecord)} />
      }

      <GradientBlackBlock className={style.recordBlock}>
        <div className={style.mainRow}>
          {racketNeed &&
            <>
              <div className={style.section}>
                <div className={style.fragment}>{racketData.number} <br />DNA {racketData.code}</div>
                <div className={style.line}></div>
                <div className={style.fragment}>{racketModel}</div>
              </div>
              <div className={style.verticalLine}></div>
            </>
          }
          {mainConent !== null &&
            <>
              <div className={`${style.section} ${style.mainSection}`} onClick={handelStringsEditOpen}>
                {mainConent.map(string =>
                  <div>
                    {string}
                  </div>
                )}

              </div>
              <div className={style.verticalLine}></div>
            </>
          }
          <div className={`${style.section} ${style.mainSection}`} style={{ color: stateColor }}>{stateString}</div>
          <div className={style.verticalLine}></div>
          <div className={style.section}>
            <div className={style.fragment}>User Comment</div>
            <div className={style.line}></div>
            <div className={`${style.fragment} ${style.comment}`}
            onClick={() => setIsUserCommentOpen(!(record.userComment == ''))}
            >{ record.userComment == '' ? <> Kein Kommentar</> : RecordHeler.splitString(record.userComment,20)}</div>
          </div>
          
        </div>

        <div className={style.buttonRow}>

          {record.recordType == 1 || record.recordType == 0 &&
            <MyButton mode='white' className={style.pdfAction} onClick={generatePDF}>
              <svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.7509 0H3.24963V30H26.7503V4.99937L21.7509 0Z" fill="#E8E8E8" />
                <path d="M22.7594 14.8359C22.3989 14.1934 21.1534 13.9916 20.5819 13.9008C20.1315 13.8291 19.6717 13.8077 19.2162 13.8081C18.8585 13.8058 18.506 13.8234 18.1581 13.8432C18.0299 13.8518 17.9029 13.8629 17.7761 13.8738C17.646 13.7393 17.5204 13.6002 17.3988 13.4581C16.625 12.5421 16.0002 11.5033 15.4911 10.4239C15.6263 9.90234 15.7345 9.35803 15.7998 8.79273C15.919 7.761 15.96 6.58519 15.5734 5.60154C15.4399 5.26205 15.084 4.84874 14.6733 5.05456C14.2012 5.29124 14.0685 5.96182 14.03 6.43716C13.999 6.82138 14.0207 7.20659 14.0852 7.58437C14.1509 7.96473 14.2567 8.32589 14.3718 8.68656C14.4793 9.01725 14.5977 9.34536 14.7269 9.67041C14.6449 9.92629 14.558 10.1777 14.4666 10.4227C14.2537 10.9811 14.0234 11.5115 13.802 12.0218C13.6852 12.2748 13.5709 12.5225 13.4591 12.7646C13.1053 13.5419 12.7212 14.3049 12.2901 15.0424C11.2844 15.3971 10.382 15.8084 9.6326 16.2916C9.23057 16.5514 8.87545 16.8335 8.57969 17.1429C8.30046 17.435 8.01667 17.8141 7.99184 18.2337C7.97788 18.4706 8.07169 18.7004 8.26573 18.841C8.53259 19.0403 8.88623 19.0271 9.19584 18.9622C10.2101 18.7494 10.9889 17.8776 11.6521 17.1428C12.109 16.6367 12.629 15.994 13.1729 15.2168C13.1741 15.215 13.1753 15.2132 13.1765 15.2114C14.1094 14.9222 15.1247 14.678 16.2023 14.4985C16.6946 14.4169 17.1999 14.3501 17.7153 14.3032C18.0778 14.6427 18.4694 14.9518 18.8967 15.2099C19.2294 15.4147 19.5834 15.5875 19.9538 15.7165C20.3284 15.8389 20.7053 15.9388 21.0945 16.002C21.291 16.0301 21.492 16.0429 21.6973 16.0352C22.1555 16.0179 22.8132 15.8421 22.8564 15.2861C22.8696 15.1159 22.8329 14.9667 22.7594 14.8359ZM11.7891 15.8561C11.5745 16.1885 11.3675 16.4876 11.1724 16.7507C10.6948 17.4006 10.1493 18.1725 9.3595 18.4611C9.2095 18.5159 9.01199 18.5725 8.80381 18.5602C8.61838 18.5494 8.43552 18.4675 8.44393 18.257C8.44809 18.1467 8.50201 18.0061 8.58474 17.868C8.67527 17.7165 8.78738 17.5776 8.90879 17.4498C9.16893 17.1765 9.49783 16.9117 9.87621 16.6664C10.4565 16.2899 11.1494 15.951 11.9217 15.6486C11.8772 15.7188 11.8329 15.7887 11.7891 15.8561ZM14.4827 7.51867C14.4231 7.17097 14.4141 6.81841 14.4507 6.47942C14.4689 6.30992 14.5034 6.14447 14.5534 5.98942C14.5958 5.85782 14.6872 5.53663 14.833 5.49537C15.0735 5.4273 15.1474 5.94351 15.1746 6.08956C15.3296 6.92033 15.193 7.84421 15.0071 8.65915C14.9775 8.78877 14.9446 8.91632 14.9108 9.04337C14.8532 8.88495 14.7983 8.72604 14.7477 8.56634C14.6389 8.21754 14.5394 7.86469 14.4827 7.51867ZM16.1334 14.077C15.23 14.2234 14.3707 14.4153 13.5628 14.6418C13.6601 14.6146 14.1046 13.7722 14.2037 13.5974C14.6709 12.7746 15.053 11.9111 15.3276 11.0052C15.8124 11.9641 16.4009 12.8815 17.1238 13.698C17.1904 13.7721 17.2581 13.8453 17.3269 13.9177C16.9218 13.9613 16.5232 14.0144 16.1334 14.077ZM22.2429 15.2341C22.2098 15.4127 21.8284 15.5148 21.6504 15.5429C21.1244 15.6256 20.5679 15.5594 20.0644 15.3903C19.719 15.2744 19.3859 15.1164 19.0693 14.9265C18.7547 14.7364 18.4603 14.5127 18.1851 14.2662C18.5244 14.2458 18.8679 14.2324 19.213 14.239C19.5581 14.2424 19.9059 14.2598 20.2495 14.3047C20.8937 14.3765 21.6157 14.5976 22.1228 15.0157C22.2226 15.0981 22.2545 15.171 22.2429 15.2341Z" fill="#FB3449" />
                <path d="M22.5246 2.49974H3.24963V0H21.7509L22.5246 2.49974Z" fill="#FB3449" />
                <path d="M12.5506 23.8615C12.5506 24.392 12.3943 24.8016 12.0814 25.0906C11.7685 25.3796 11.3243 25.5241 10.7484 25.5241H10.3879V27.099H9.10535V22.3516H10.7485C11.3481 22.3516 11.7984 22.4826 12.0993 22.7445C12.4002 23.0064 12.5506 23.3787 12.5506 23.8615ZM10.388 24.4785H10.6218C10.8145 24.4785 10.9677 24.4244 11.0813 24.3161C11.195 24.2078 11.2518 24.0584 11.2518 23.8679C11.2518 23.5476 11.0743 23.3874 10.7193 23.3874H10.388V24.4785Z" fill="#A4A9AD" />
                <path d="M17.3371 24.6246C17.3371 25.4169 17.1189 26.0274 16.6828 26.456C16.2466 26.8847 15.6333 27.099 14.8432 27.099H13.3073V22.3516H14.9504C15.7124 22.3516 16.3006 22.5464 16.7152 22.9361C17.1297 23.3257 17.3371 23.8886 17.3371 24.6246ZM16.0058 24.6701C16.0058 24.2349 15.9197 23.9125 15.7476 23.7024C15.5755 23.4924 15.3141 23.3875 14.9634 23.3875H14.59V26.0469H14.8758C15.2655 26.0469 15.5512 25.9338 15.7331 25.7075C15.9148 25.4814 16.0058 25.1356 16.0058 24.6701Z" fill="#A4A9AD" />
                <path d="M19.4512 27.099H18.188V22.3516H20.9937V23.3809H19.4512V24.2869H20.8735V25.3163H19.4512V27.099Z" fill="#A4A9AD" />
                <path d="M21.751 4.99937H26.7504L21.751 0V4.99937Z" fill="#D1D3D3" />
              </svg>
            </MyButton>
          }

          {recordGroup.records.length <= 1 ? '' :
            <ButtonsList record={record} type='single' />
          }
          {isUserCommentOpen &&
          <InfoFlutter text={record.userComment} title  = 'User Comment' onisOpen={setIsUserCommentOpen}/>
          }

        </div>
      </GradientBlackBlock>
    </>
  )
}

export default AdminRecordCard
