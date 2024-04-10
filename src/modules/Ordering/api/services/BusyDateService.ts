import { AxiosResponse } from "axios";
import { BusyDateResponse } from "../responces/BusyDateResponse";
import $api from "../../../../app/api/http";

export default class BusyDateService{
    static async getBusyDates(recordType: number): Promise<AxiosResponse<BusyDateResponse>>{
        return $api.get<BusyDateResponse>(`records/busy-date/${recordType}`)
    }

}