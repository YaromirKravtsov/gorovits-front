import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
import { IUser } from "../../../models/IUser";
import { IRacket } from "../models/IRacket";

export interface GetRackets{
    data: IRacket[],
    totalCount: number
}
export class AdminSettingPageService{
    static getAdminInfo():Promise<AxiosResponse<IUser>>{
        return $api.get<IUser>(`/users/admin`);
    }

    static getRackets(page: number, pageSize: number,searchQuery: string):Promise<AxiosResponse<GetRackets>>{
        return $api.get<GetRackets>(`/racket/find`,{
            params:{
                page,
                pageSize,
                searchQuery
            }
        });
    }
}