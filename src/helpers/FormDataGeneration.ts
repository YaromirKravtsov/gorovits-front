import { Axios, AxiosError } from "axios";

export const FormDataGeneration = (file: File | null, other: Record<string, any>): FormData => {
    const formData = new FormData();
    
    // Добавляем файл в FormData
    if (file) {
        formData.append('image', file);
    }

    // Добавляем другие свойства
    for (const key in other) {
        if (Object.prototype.hasOwnProperty.call(other, key)) {
            formData.append(key, other[key]);
        }
    }

    return formData;
}

export const getErrorText  = (error: any) =>{
    return error.response?.data.message
}