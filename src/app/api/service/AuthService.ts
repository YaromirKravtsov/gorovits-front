import { AxiosResponse } from "axios";
import $api from "../http";
import { AuthResponse } from "../../models/AuthResponse";


export default class AuthService{
    static async login(email:string, password:string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('users/login',{email,password})
    }

    static async logout(): Promise<AxiosResponse<AuthResponse>>{
        return $api.post('users/logout');
    }

}

