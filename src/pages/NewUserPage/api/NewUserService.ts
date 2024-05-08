import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";

import { ISUser, IUser } from "../../../models/IUser";
import { INewRacket } from "../../../models/INewRackets";
import { SelectedImage } from "../../../components/PhotoSelection/PhotoSelection";

interface Response {
  password: string;
  userId: number;
}

export class NewUserService {
  static async createUser(
    rackets: INewRacket[],
    userInfo: ISUser,
    image: SelectedImage,
  ): Promise<AxiosResponse<Response>> {
    const formData = new FormData();
    
    // Рекурсивная функция для добавления данных в FormData
    const appendFormData = (data: any, prefix: string = '') => {
      if (typeof data === 'object' && data !== null) {
        // Если data является объектом, итерируемся по его свойствам
        for (const [key, value] of Object.entries(data)) {
          const newPrefix = prefix ? `${prefix}[${key}]` : key;
          appendFormData(value, newPrefix); // Рекурсивный вызов для обработки вложенных объектов
        }
      } else {
        // Если data не является объектом, добавляем его в FormData
        formData.append(prefix, data.toString());
      }
    };

    // Добавление данных рекетов
    rackets.forEach((racket, index) => {
      appendFormData(racket, `rackets[${index}]`);
    });

    // Добавление данных пользователя
    appendFormData(userInfo, 'userInfo');

    // Добавление изображения
    if (image.focusImage.name === 'custom' && image.uploadedFile) {
      formData.append('image', image.uploadedFile);
    }
    
    formData.append('photoType', image.focusImage.name);
    
    // Отправка запроса
    return $api.post<Response>('users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Указываем тип контента как multipart/form-data
      }
    });
  }
}
