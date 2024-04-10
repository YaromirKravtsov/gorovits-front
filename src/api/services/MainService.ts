import { AxiosResponse } from "axios"
import $api from "../../app/api/http"
import { IString } from "../../models/IString"
import { ModelAndManufactureres } from "../../modules/Ordering/models/OrderModel"

export  class MainServise{


    static async getStrins():Promise<AxiosResponse<IString[]>>{
        return await $api.get<IString[]>(`strings`) 
    } 
    static async getRacketsManufactureres():Promise<AxiosResponse<ModelAndManufactureres[]>>{
        return await $api.get<ModelAndManufactureres[]>(`racket/manufactureres`) 
    } 
    static async getRacketsModels():Promise<AxiosResponse<ModelAndManufactureres[]>>{
        return await $api.get<ModelAndManufactureres[]>(`racket/totest`) 
    } 

}