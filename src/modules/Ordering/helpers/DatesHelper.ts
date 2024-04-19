import { TimeSlot, WeekDay } from "../components/SelectDateMenu/SelectDateMenu";

export default class DatesHelper{

    static generateSchedule(currentDateString: string, bookedDates: { dateTime: string ,recordType: number}[], recordType: number): WeekDay[][] {
      console.log(bookedDates)
        const currentDate = new Date(currentDateString);
        let startDay = currentDate.getDay() === 0 ? -6 : 1; 
       
        let monday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + startDay));
        const generateTimeSlots = (date: Date): TimeSlot[] => {
          let slots: TimeSlot[] = [];
          const timeArr: string[]  = (recordType == 1 || recordType ==0) ?['00', '30'] : ['00']
          for (let hour = 12; hour <= 18; hour++) {
            timeArr.forEach(minute => {
              let timeString = `${hour.toString().padStart(2, '0')}:${minute}`;
              let slotDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, parseInt(minute));
              
              const isBooked = bookedDates.some(bookedDate =>
                new Date(bookedDate.dateTime).getTime() === slotDateTime.getTime()
             ) || slotDateTime.getTime() < new Date(currentDateString).getTime();
             
              
              slots.push({ time: timeString, isBooked });
            });
          }
          return slots;
        };
        let weeks: WeekDay[][] = [];
        for (let week = 0; week < 9; week++) {
          let weekDays: WeekDay[] = [];
          for (let day = 0; day <= 6; day++) { // Понедельник - Суббота
            let date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + day + (week * 7));
            weekDays.push({
              date: date,
              slots: generateTimeSlots(date)
            });
          }
          weeks.push(weekDays);
      
        
        }
        
        return weeks;
    }
    static getDateMonth(newDate:Date) 
    {
        const date = new Date(newDate);
        const day = date.getDate();
        let monthIndex = date.getMonth() + 1; 
        let month:string = String(monthIndex);
        let dayFinal:string = String(day);
        if(monthIndex <=9) {
            month = String('0'+monthIndex)
        
        }
        if(day <=9) {
            dayFinal = String('0'+day)
         
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