import { AxiosResponse } from "axios";

import { AuthResponse } from "../../models/AuthResponse";
import  $api  from "../http";


export default class AuthService{
    static async login(email:string, password:string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('users/login',{email,password})
    }

    static async logout(): Promise<AxiosResponse<AuthResponse>>{
        return $api.post('users/logout');
    }
}

