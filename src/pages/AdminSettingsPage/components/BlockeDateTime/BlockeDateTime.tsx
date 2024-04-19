import { FC, useEffect, useRef, useState } from "react"
import style from './BlockeDateTime.module.css'
import FlutterMenu from "../../../../UI/FlutterMenu/FlutterMenu"
import MyButton from "../../../../UI/MyButton/MyButton"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import { useActions } from "../../../../hooks/useActions"
import { WeekDay } from "../../../../modules/Ordering/components/SelectDateMenu/SelectDateMenu"
import DatesHelper from "../../../../modules/Ordering/helpers/DatesHelper"
import Row from "../../../../components/Layout/Row/Row"
import { weekShortDays } from "../../../../modules/Ordering/constants/WeekConstant"
import MyImage from "../../../../UI/MyImage/MyImage"
import Loader from "../../../../UI/Loader/Loader"
import arrow from '../../../../assets/images/arrow-line.png';
import { AdminSettingPageService } from "../../api/AdminSettingPageService"
import { getErrorText } from "../../../../helpers/FormDataGeneration"
interface Props {
    close: () => void
}
const BlockeDateTime: FC<Props> = ({ close }) => {
    const { getBusyDates,setGlobalError } = useActions();
    const { isLoading, busyDates } = useTypedSelector(state => state.order);
    const [weeks, setWeeks] = useState<WeekDay[][]>([[]]);
    const [showWeekNumber, setShowWeekNumber] = useState<number>(0);
    const [weekDays, setWeekDays] = useState<string[]>(['', '', '']);
    const [currentWeek, setCurrentWeek] = useState<WeekDay[]>([]);
    const leftWeekButton = useRef<HTMLDivElement>(null);
    const rightWeekButton = useRef<HTMLDivElement>(null);
    const [selectedSlot, setSelectedSlot] = useState<string>('');
    const { windowWidth } = useTypedSelector(state => state.adaptive)
    const recordType = 1;
    useEffect(() => {
        const effect = async () => {
            await getBusyDates(recordType);
        };
        effect();
    }, []);
    useEffect(() => {
        if (!isLoading) {

            const week = DatesHelper.generateSchedule(String(new Date()), busyDates?.records, recordType);

            setWeeks(week);
            setCurrentWeek(week[0]);
            updateWeeksDays(0);
        }
    }, [isLoading, busyDates]);

    useEffect(() => {
        updateWeeksDays(showWeekNumber); // Обновление при изменении недели
    }, [weeks, showWeekNumber]);

    const updateWeeksArray = (newCurrentWeek: WeekDay[]) => {
        setWeeks(prevWeeks => {
            // Создаем копию массива, чтобы обновить нужный индекс
            const updatedWeeks = [...prevWeeks];
            updatedWeeks[showWeekNumber] = newCurrentWeek;
            return updatedWeeks;
        });
    };


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
            updateWeeksArray(currentWeek); // Сохраняем изменения текущей недели
            setShowWeekNumber(newWeekNumber);
            setCurrentWeek(weeks[newWeekNumber]);
        }
    };

    const onWeekDecrement = () => {
        if (showWeekNumber > 0) {
            updateWeeksArray(currentWeek); // Сохраняем изменения текущей недели
            setShowWeekNumber(showWeekNumber - 1);
            setCurrentWeek(weeks[showWeekNumber - 1]);
        }
    };

    const handleWeekSelect = (index: number) => {
        const weekIndex = showWeekNumber + index;
        if (weeks[weekIndex]) {
            updateWeeksArray(currentWeek); // Сохраняем изменения текущей недели
            setShowWeekNumber(weekIndex);
            setCurrentWeek(weeks[weekIndex]);
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

    const [originalBookings, setOriginalBookings] = useState<Date[]>([]);

    const initializeOriginalBookings = () => {
        const initialBookings = weeks.flatMap(week =>
            week.flatMap(day =>
                day.slots.flatMap(slot =>
                    slot.isBooked ? [DatesHelper.combineDateAndTime(String(day.date), slot.time)] : []
                )
            )
        );
        setOriginalBookings(initialBookings);
    };


    useEffect(() => {
        initializeOriginalBookings();
    }, [currentWeek]);  // Предполагается, что currentWeek обновляется только при смене недели

    const [datesToBlock, setDatesToBlock] = useState<Date[]>([]);
    const [datesToUnBlock, setDatesToUnBlock] = useState<Date[]>([]);

    const addDateToBlock = (date: Date) => {
        // Преобразуем добавляемую дату в строку ISO для сравнения
        const dateStr = date.toISOString();

        // Удаляем дату из списка разблокировок перед добавлением в блокировки
        setDatesToUnBlock(prevUnBlock => prevUnBlock.filter(dateL => dateL.toISOString() !== dateStr));

        // Обновляем список блокировок
        setDatesToBlock(prevBlock => {
            const isInArr = prevBlock.some(dateL => dateL.toISOString() === dateStr);
            if (isInArr) {
                // Если дата уже есть, удаляем её
                return prevBlock.filter(dateL => dateL.toISOString() !== dateStr);
            } else {
                // Если нет, добавляем
                return [...prevBlock, date];
            }
        });
    };

    const addDateToUnBlock = (date: Date) => {
        const dateStr = date.toISOString();

        setDatesToBlock(prevBlock => prevBlock.filter(dateL => dateL.toISOString() !== dateStr));

        setDatesToUnBlock(prevUnBlock => {
            const isInArr = prevUnBlock.some(dateL => dateL.toISOString() === dateStr);
            if (isInArr) {
                // Если дата уже есть, удаляем её
                return prevUnBlock.filter(dateL => dateL.toISOString() !== dateStr);
            } else {
                // Если нет, добавляем
                return [...prevUnBlock, date];
            }
        });
    };



    const handleSlotSelect = (day: WeekDay, slotTime: string) => {
        setSelectedSlot(`${day.date} ${slotTime}`);
        const data = DatesHelper.combineDateAndTime(String(day.date), slotTime);

        const newCurrentWeek = currentWeek.map(dayL => {
            if (day.date === dayL.date) {
                return {
                    ...dayL,
                    slots: dayL.slots.map(slot => {
                        if (slot.time === slotTime) {

                            // Проверяем, был ли слот заблокирован изначально

                            const dataa = DatesHelper.combineDateAndTime(String(dayL.date), slot.time);

                           /*  if (originalBookings.some(date => date.toISOString() === dataa.toISOString())) {
                                return { ...slot };

                            } */

                            if (slot.isBooked) {
                                addDateToBlock(data);
                            } else {
                                addDateToUnBlock(data);
                            }
                            return { ...slot, isBooked: !slot.isBooked };
                        } else {
                            return { ...slot };
                        }
                    })
                };
            }
            return dayL;
        });
        setCurrentWeek(newCurrentWeek);
    };



    const handelSubmit = async () => {
        if (selectedSlot == '') return;
        console.log('date to block', datesToUnBlock)
        const datesSet2 = new Set(originalBookings.map(date => date.toISOString()));

        let filteredDatesArray1 = datesToBlock.filter(date =>
            datesSet2.has(date.toISOString())
        );

        console.log('date to unblock', filteredDatesArray1)
        try{
            await AdminSettingPageService.blockRecordsDates(datesToUnBlock, datesToBlock)
            close()
        }catch(e){
            console.log(e)
            setGlobalError(getErrorText(e));
        }
        
   
    }


    return (
        <FlutterMenu shadow={windowWidth >= 600 ? 'all' : 'normal'} className={style.selectDateMenu}>
            <div className={style.blockTitle}>Terminzeit blockieren</div>
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
                        {weekDays.map((el, index) =>
                            <div className={style.weekBlock} onClick={() => handleWeekSelect(index)}>
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
                        <div className={style.daysBlock}>
                            {currentWeek.slice(0, 6).map((day, index) =>
                                <div className={style.weekDay}>{weekShortDays[index]}<br />{DatesHelper.getDateMonth(day.date)} </div>
                            )}
                        </div>
                        <div className={style.dateTimeBlock}>
                            {currentWeek.slice(0, 6).map((day) =>
                                <div className={style.dateTimeColumn} key={String(day.date)}>
                                    {day.slots.map(slot =>
                                        <button
                                            key={slot.time}
                                            className={`${style.dateTime} ${slot.isBooked ? style.booked : ''} ${selectedSlot === `${day.date} ${slot.time}` ? style.selected : ''}`}
                                            onClick={() => handleSlotSelect(day, slot.time)}
                                        /*  disabled={slot.isBooked} */
                                        >
                                            {slot.time}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            }
            <Row className={style.buttonRow}>
                <MyButton className={style.button} border onClick={close}>Schließen</MyButton>
                <MyButton className={style.button} mode='black' onClick={handelSubmit}>Terminzeit blockieren</MyButton>
            </Row>
        </FlutterMenu>
    )
}

export default BlockeDateTime;
