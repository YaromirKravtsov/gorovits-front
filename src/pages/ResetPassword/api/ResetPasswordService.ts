import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";

export class ResetPasswordService{
    static async resetLinkCheck(link:string):Promise<AxiosResponse<boolean>>{
        return await  $api.get<boolean>(`/users/reset-password-link-front/${link}`);
    }
    static async changePassword(link:string, newPassword:string):Promise<AxiosResponse<boolean>>{
        return await  $api.put(`/users/change-password-link/`,{
                link, newPassword
        });
    }

}