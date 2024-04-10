import { AxiosResponse } from "axios";
import { GetPullungResponse } from "../responses/pullingResponse";
import $api from "../../../../app/api/http";
import { Pulling } from "../../store/pulling/types";


export class PulligService{
    static async getLastPulling(userId:number): Promise<AxiosResponse <Pulling[]> >{
        return $api.get<Pulling[]>(`/records/lastPulling/${userId}`);
      }
}