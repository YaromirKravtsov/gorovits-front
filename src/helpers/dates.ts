
export default class FormatDate {
    static SqlToDate(inputDate: Date | string): string {
        const date = new Date(inputDate);

        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${day}.${month}.${year}`;
    }

    static SqlToDateTime = (inputDate: Date | string) => {

        const date = new Date(inputDate);

        // Форматируем дату
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2); // Получаем последние две цифры года
        const formattedDate = `${day}.${month}.${year}`;

        // Форматируем время
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        // Возвращаем отформатированную дату и время
        return `${formattedDate} - ${formattedTime}`;
    }
    static dateToSql = (inputDate: Date | string) => {
        const date = new Date(inputDate);
        const formattedDateTime = date.toISOString().slice(0, 19).replace('T', ' ');

        return formattedDateTime;
    }
    static dateToInput = (inputDate: Date | string) => {
        const date = new Date(inputDate);
        const formattedDateTime = date.toISOString().slice(0, 19).replace('T', ' ');

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // добавляем ведущий ноль, если месяц меньше 10
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        // Формируем строку в нужном формате для поля datetime-local
        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
        return formattedDate;
    }
}