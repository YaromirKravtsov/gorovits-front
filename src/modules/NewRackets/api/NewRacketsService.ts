import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
import { INewRacket } from "../../../models/INewRackets";
/*  interface DeleteRacketWithPT {
   userRacketId:number,
   pullingId:number,
   tunningId:number,
} */
interface DeleteReponse{
    id:number
}

export class NewRacketsService {
    static async deleteRacket(id:number): Promise<AxiosResponse<DeleteReponse>> {
        return await $api.delete(`user-rackets/${id}`);
    }

    static async createNewRacket(userId: number, rackets:INewRacket[]): Promise<AxiosResponse<DeleteReponse>> {
        return await $api.post(`user-rackets/`,{userId, rackets});
    }

    static async editNewRacket( racket:INewRacket): Promise<AxiosResponse<DeleteReponse>> {
        return await $api.put(`user-rackets/`,racket);
    }
}