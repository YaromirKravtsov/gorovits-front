import { AxiosResponse } from "axios";
import { IUser } from "../../../models/IUser";
import $api from "../../../app/api/http";



export default class SearchKundenService{
    static async findUsers(inputString: string): Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>(`users/search`,{
            params:{
                string: inputString
            }
        });
    }
}