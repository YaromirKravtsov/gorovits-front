import React, { FC, useEffect, useRef, useState } from 'react'
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu'
import style from './SelectDateMenu.module.css'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import Loader from '../../../../UI/Loader/Loader'
import DatesHelper from '../../helpers/DatesHelper'
import MyImage from '../../../../UI/MyImage/MyImage';
import arrow from '../../../../assets/images/arrow-line.png';
import Row from '../../../../components/Layout/Row/Row'
import MyButton from '../../../../UI/MyButton/MyButton'
import { weekShortDays } from '../../constants/WeekConstant'
import { useNavigate } from 'react-router-dom'
import RecordHeler from '../../../../helpers/recordHelper'
export type TimeSlot = {
  time: string;
  isBooked: boolean;
};

export type WeekDay = {
  date: Date;
  slots: TimeSlot[];
};

interface Props {
  recordType: number;
  onSelect: (date: Date) => void,
  onSubmit: () => void,
  onClose: () => void,
}
const SelectDateMenu: FC<Props> = (props) => {
  const { getBusyDates, setIsDateBlockOpen, setOrderRecords, setCurrentOrderRecord } = useActions();
  const { isLoading, busyDates } = useTypedSelector(state => state.order);
  const [weeks, setWeeks] = useState<WeekDay[][]>([[]]);
  const [showWeekNumber, setShowWeekNumber] = useState<number>(0);
  const [weekDays, setWeekDays] = useState<string[]>(['', '', '']);
  const [currentWeek, setCurrentWeek] = useState<WeekDay[]>([]);
  const leftWeekButton = useRef<HTMLDivElement>(null);
  const rightWeekButton = useRef<HTMLDivElement>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const { windowWidth } = useTypedSelector(state => state.adaptive)
  const navigate = useNavigate();
  useEffect(() => {

    const effect = async () => {

      await getBusyDates(props.recordType);

    };
    effect();
  }, []);

  useEffect(() => {

    if (!isLoading && Object.keys(busyDates).length !== 0) {
      console.log(busyDates)
      const week = DatesHelper.generateSchedule(String(new Date()), busyDates?.records, props.recordType);
      setWeeks(week);
      setCurrentWeek(week[0]);
      updateWeeksDays(0);
    }
  }, [isLoading, busyDates]);

  useEffect(() => {
    updateWeeksDays(showWeekNumber); // Обновление при изменении недели
  }, [weeks, showWeekNumber]);

  const updateWeeksDays = (weekNumber: number) => {
    const weekLabels = [0, 1, 2].map((offset) => {
      const weekIndex = weekNumber + offset;
      if (weeks[weekIndex]) {
        return `${DatesHelper.getDateMonth(weeks[weekIndex][0]?.date)} - ${DatesHelper.getDateMonth(weeks[weekIndex][5]?.date)}`;
      }
      return '';
    });
    setWeekDays(weekLabels);
    updateButtonClasses(weekNumber);
  };

  const onWeekIncrement = () => {
    const newWeekNumber = showWeekNumber + 1;
    if (newWeekNumber < weeks.length - 2) { // Убедитесь, что не выходим за границы массива
      setShowWeekNumber(newWeekNumber);
      setCurrentWeek(weeks[newWeekNumber]);
    }
  };

  const onWeekDecrement = () => {
    if (showWeekNumber > 0) {
      setShowWeekNumber(showWeekNumber - 1);
      setCurrentWeek(weeks[showWeekNumber - 1]);
    }
  };

  const updateButtonClasses = (weekNumber: number) => {
    if (leftWeekButton.current) {
      if (weekNumber > 0) {
        leftWeekButton.current.classList.remove(style.noActive)
      } else {
        leftWeekButton.current.classList.add(style.noActive)
      }
    }
    if (rightWeekButton.current) {
      if (weekNumber < weeks.length - 3) {
        rightWeekButton.current.classList.remove(style.noActive)
      } else {
        rightWeekButton.current.classList.add(style.noActive)
      }
    }
  };

  const [currentWeeekIndex,setCurrentWeeekIndex] = useState<number>(0)
  const handelWeekSelect = (index: number) => {
    const weekIndex = showWeekNumber + index;
    
    if (weeks[weekIndex]) {
      setCurrentWeeekIndex(showWeekNumber + index)
      setCurrentWeek(weeks[weekIndex]);

    }
    console.log(showWeekNumber + index)
  };

  const handleSlotSelect = (day: WeekDay, slotTime: string) => {
    setSelectedSlot(`${day.date} ${slotTime}`);

    const data = DatesHelper.combineDateAndTime(String(day.date), slotTime);
    console.log(data)
    props.onSelect(data);
  };

  const handelSubmit = () => {
    if (selectedSlot == '') {
      setIsNOSelected(true)
      setTimeout(()=>
        { setIsNOSelected(false)

        },500)
      return;
    };
    setIsDateBlockOpen(false);
    setOrderRecords([]);
    setCurrentOrderRecord(0)
    props.onSubmit();
    if (windowWidth <= 600) {
      navigate('/termine')
    }

  }

  const handelClose = () => {

    setIsDateBlockOpen(false)
    props.onClose();
  }


  const [inNoSelected, setIsNOSelected] = useState<boolean>(false);
  
  const blockRef = useRef<HTMLDivElement>(null);
  const wraperRef = useRef<HTMLDivElement>(null);
  const [blockHeight, setBlockHeight] = useState<number>(0);
  const [wraperHeight, setWraperHeight] = useState<number>(0);

  useEffect(() => {
    console.log(blockRef.current)
    if (blockRef.current) {
      setBlockHeight(blockRef.current.offsetHeight);
      
    }
    if(wraperRef.current){
      setWraperHeight(wraperRef.current.offsetHeight);
    }
    console.log(blockHeight <=wraperHeight)
  }, [blockRef.current,wraperRef.current]);

  return (
    <FlutterMenu shadow={windowWidth >= 600 ? 'all' : 'normal'} className={style.selectDateMenu}>
      <div className={style.blockTitle}>Termin auswählen</div>
      {isLoading ?
        <Loader />
        :
        <>
          <div className={style.weeksBlock}>
            <div className={style.arrowBLock} ref={leftWeekButton}
              onClick={onWeekDecrement}
            >
              <MyImage alt='' src={arrow} className={`${style.arrow}  ${style.rotate}`} />
            </div>
           <>{console.log(weekDays)}</> 
            {weekDays.map((el, index) =>
              <div key ={index} className={`${style.weekBlock} ${currentWeeekIndex == index ? style.weekBlockSelected:'' }`} onClick={() => handelWeekSelect(index)}>
                {el}
              </div>
            )}
            <div className={style.arrowBLock} ref={rightWeekButton}
              onClick={onWeekIncrement}
            >
              <MyImage alt='' src={arrow} className={`${style.arrow}`} />
            </div>
          </div>
          <div className={style.currentWeek}>
            <div className={style.daysBlock} style  = {{paddingRight: blockHeight <=wraperHeight? '5px' : '15px'}}>
              {currentWeek.slice(0, 6).map((day, index) =>
              <>
                <div key ={index} className={`${style.weekDay}`}>{weekShortDays[index]}<br />{DatesHelper.getDateMonth(day.date)} </div>
                </>
              )}
            </div>
            <div className={style.dateTimeBlock} ref = {wraperRef}>
              {currentWeek.slice(0, 6).map((day,dayIndex) =>
                <>
                  <div className={style.dateTimeColumn} key={String(day.date)} ref = {blockRef}>

                    {day.slots.map(slot =>
                      <button
                        key={slot.time}
                        className={`${style.dateTime} ${slot.isBooked ? style.booked : ''} ${selectedSlot === `${day.date} ${slot.time}` ? style.selected : ''} ${inNoSelected && !slot.isBooked? style.dateTimeError: ''}`}
                        onClick={() => handleSlotSelect(day, slot.time)}
                        disabled={slot.isBooked}
                      >
                        {slot.time}
                      </button>
                    )}

                  </div>
                  {(windowWidth <= 600 && dayIndex < currentWeek.slice(0, 6).length -1) &&   <div className={style.line} style = {{height:blockHeight}}></div>}
                </>
              )}
            </div>
          </div>
        </>
      }
      <Row className={style.buttonRow}>
        <MyButton className={style.button} border onClick={handelClose}>Zurück</MyButton>
        <MyButton className={style.button} mode='black' onClick={handelSubmit}>Termin buchen</MyButton>
      </Row>
    </FlutterMenu>
  )
}

export default SelectDateMenu;
