import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
import { IUser } from "../../../models/IUser";
import { IRacket } from "../models/IRacket";
import { useActions } from "../../../hooks/useActions";

export interface GetRackets {
    data: IRacket[],
    totalCount: number
}
export interface RacketsManufactureres{
    id: number, 
    name: string
}
export class AdminSettingPageService {
    static async getAdminInfo(): Promise<AxiosResponse<IUser>> {
        return await $api.get<IUser>(`/users/admin`);
    }

    static async getRackets(page: number, pageSize: number, searchQuery: string): Promise<AxiosResponse<GetRackets>> {
        return await $api.get<GetRackets>(`/racket/find`, {
            params: {
                page,
                pageSize,
                searchQuery
            }
        });
    }

    static async getStrings(page: number, pageSize: number, searchQuery: string): Promise<AxiosResponse<GetRackets>> {
        return await $api.get<GetRackets>(`/strings/find`, {
            params: {
                page,
                pageSize,
                searchQuery
            }
        });
    }
    static async getRacketsManufactureres(): Promise<AxiosResponse<RacketsManufactureres[]>> {
        return await $api.get<RacketsManufactureres[]>(`/racket/manufactureres`);
    }

    static async createracketModel(formData: FormData): Promise<AxiosResponse> {
        return await $api.post(`/racket/model`,formData);
    }
    static async createString(formData: FormData): Promise<AxiosResponse> {
        return await $api.post(`/strings`,formData);
    }

    static async updateString(formData: FormData): Promise<AxiosResponse> {
        return await $api.put(`/strings`,formData);
    }
    static async updateRacketModel(formData: FormData): Promise<AxiosResponse> {
        return await $api.put(`/racket/model`,formData);
    }
    static async deleteModel(id:number): Promise<AxiosResponse> {
        return await $api.delete(`/racket/${id}`,);
    }
    static async deleteString(id:number): Promise<AxiosResponse> {
        return await $api.delete(`/strings/${id}`,);
    }
    static async blockRecordsDates(datesToBlock: Date[], datesToUnblock: Date[]) : Promise<AxiosResponse> {
        return await $api.post(`/records/block-dates`,{
            datesToBlock,datesToUnblock
        });
    }
}