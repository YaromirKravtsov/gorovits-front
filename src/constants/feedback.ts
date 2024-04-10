import good from '../assets/images/feedback/good-feedback.png';
import bad from '../assets/images/feedback/bad-feedback.png';


// Определяем тип для объекта feedbackPhotos
interface FeedbackPhotos {
    1: {src:string}; // Фотография для положительного отзыва
    0: {src:string}; // Фотография для отрицательного отзыва
}
type RecordTypes = {
    [key: number]: {src:string};
};
// Объявляем объект feedbackPhotos с типом FeedbackPhotos
export const feedbackPhotos: RecordTypes = {
    1: {src:good},
    0: {src:bad},
};