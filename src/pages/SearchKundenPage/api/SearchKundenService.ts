import { AxiosResponse } from "axios";
import { IUser } from "../../../models/IUser";
import $api from "../../../app/api/http";


interface Res{
     totalCount: number;
      data: IUser[]; 
}
export default class SearchKundenService{
    static async findUsers(page:number, itemsPerPage:number, searchQuery:string): Promise<AxiosResponse<Res>>{
        console.log(1212)
        return $api.get<Res>(`users/search`,{
            params:{
                page,
                pageSize:itemsPerPage,
                searchQuery
            }
        });
    }
}