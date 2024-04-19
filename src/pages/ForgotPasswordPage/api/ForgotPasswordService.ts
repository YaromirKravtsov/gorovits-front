import { AxiosResponse } from "axios";
import  $api  from "../../../app/api/http";


export class ForgotPasswrd{
    static async ResetPassword(email:string):Promise<AxiosResponse<string>>{
        return $api.put<string>('users/reset-password',{
            email
        })
    }
}