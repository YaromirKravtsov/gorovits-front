import { AxiosResponse } from "axios";
import $api from "../../../../app/api/http";
import { IRacket } from "../../../../models/IRacket";

export class RacketService{
    static async getRackets(userId: number): Promise<AxiosResponse<IRacket[]>>{
        return $api.get<IRacket[]>(`user-rackets/${userId}`);
    }
}