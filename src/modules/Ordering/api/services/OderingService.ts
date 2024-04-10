import { AxiosResponse } from "axios";
import { ModelAndManufactureres, UserRackets } from "../../models/OrderModel";
import $api from "../../../../app/api/http";
import { IString } from "../../../../models/IString";


export  class OrderServise{
    static async getRackets(userId:number):Promise<AxiosResponse<UserRackets[]>>{
        return await $api.get<UserRackets[]>(`user-rackets/short/${userId}`)
    } 

    static async getStrins():Promise<AxiosResponse<IString[]>>{
        return await $api.get<IString[]>(`strings`) 
    } 

  
}