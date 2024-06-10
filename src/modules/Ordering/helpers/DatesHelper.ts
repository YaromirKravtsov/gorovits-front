import { TimeSlot, WeekDay } from "../components/SelectDateMenu/SelectDateMenu";
import moment from 'moment';
import 'moment-timezone'; 
export default class DatesHelper{

    static generateSchedule(currentDateString: string, bookedDates: { dateTime: string; recordType: number }[], recordType: number): WeekDay[][] {
        console.log(`Input currentDateString: ${currentDateString}`);
        console.log(`Booked Dates: `, bookedDates);
    
        const currentDate = moment.tz(currentDateString, 'Europe/Berlin');
        
        let startDay = currentDate.day() === 0 ? -6 : 1;
        let monday = currentDate.clone().startOf('week').add(startDay, 'days');
    
        const generateTimeSlots = (date: moment.Moment): TimeSlot[] => {
          let slots: TimeSlot[] = [];
          const timeArr: string[] = (recordType === 1 || recordType === 0) ? ['00', '30'] : ['00'];
          
          for (let hour = 12; hour <= 18; hour++) {
            timeArr.forEach(minute => {
              let timeString = `${hour.toString().padStart(2, '0')}:${minute}`;
              let slotDateTime = date.clone().hour(hour).minute(parseInt(minute)).second(0).millisecond(0);
    
              const isBooked = bookedDates.some(bookedDate => {
                const bookedMoment = moment.tz(bookedDate.dateTime, 'Europe/Berlin');
                return bookedMoment.isSame(slotDateTime);
              }) || slotDateTime.isBefore(currentDate);
    
              if (isBooked) {
                console.log(`Slot ${timeString} is booked or in the past`);
              }
    
              slots.push({ time: timeString, isBooked });
            });
          }
    
          return slots;
        };
    
        const isWeekFullyBooked = (weekDays: WeekDay[]): boolean => {
          return weekDays.every(day => day.slots.every(slot => slot.isBooked));
        };
    
        let weeks: WeekDay[][] = [];
        let weekCount = 0;
        while (weeks.length < 9 && weekCount < 52) { // Добавляем условие на случай, если слишком много полностью занятых недель
          let weekDays: WeekDay[] = [];
          for (let day = 0; day <= 6; day++) { // Понедельник - Воскресенье
            let date = monday.clone().add(day + (weekCount * 7), 'days').startOf('day');
            weekDays.push({
              date: date.toDate(),
              slots: generateTimeSlots(date)
            });
          }
    
          if (!isWeekFullyBooked(weekDays)) {
            weeks.push(weekDays);
          }
    
          weekCount++;
        }
    
        console.log(`Generated weeks: `, weeks);
        return weeks;
      }
    
    

static getDateMonth(newDate: Date) {
    const date = new Date(newDate);
    const day = date.getDate();
    let monthIndex = date.getMonth() + 1;
    let month: string = String(monthIndex);
    let dayFinal: string = String(day);
    if (monthIndex <= 9) {
        month = String('0' + monthIndex)
    }
    if (day <= 9) {
        dayFinal = String('0' + day)
    }
    return `${dayFinal}.${month}`;
}

    static combineDateAndTime(dateString:string, timeString:string) {
        const date = new Date(dateString);
        const timeParts = timeString.split(':');
        date.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]), 0, 0);
        return date;
      }
      
}