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
    static async getIsNew(id:number): Promise<AxiosResponse<boolean>>{
        return $api.get(`users/is-new`,{
            params:{
                userId: id
        }});
    }
    static async setIsNewUser(id:number): Promise<AxiosResponse<boolean>>{
        return $api.put(`users/is-new`,{
            
                userId: id
        });
    }
}

