import axios from "axios";
import { AuthResponse } from "../../models/AuthResponse";
import ErrorInterceptor from "../../components/ErrorInterceptor/ErrorInterceptor";


export const API_URL = "http://87.106.232.167:5000"
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

$api.interceptors.response.use((config) => {

    return config;
}, async (error) => {
    const originRequest = error.config;

    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originRequest._isRetry = true;
        try {

            const response = await axios.get<AuthResponse>(`http://87.106.232.167:5000/token/refresh`, {
                withCredentials: true, // отправляет куки
                headers: {
                    'Content-Type': 'application/json',
                    // Другие заголовки, если необходимо
                },

            });
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originRequest);
        } catch (e) {
            console.log(e)
        } 
    }


    throw error;
})


export default $api;