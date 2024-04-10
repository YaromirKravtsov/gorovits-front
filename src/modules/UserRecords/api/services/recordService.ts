import { AxiosResponse } from "axios";
import { IPullingRecord, IRecord } from "../../../../models/IRecord";
import $api from "../../../../app/api/http";

export class RecordService {
  static async getUserRecords(userId: number): Promise<AxiosResponse<IPullingRecord[]>> {
    return $api.get<IPullingRecord[]>('records/userId', {
      params: {
        userId: userId,
        state: 'current',
      },
    });
  }

  static async getRecordByStatusAndString(status: number,string:string): Promise<AxiosResponse<IRecord[]>> {
    return $api.get<IRecord[]>(`records/by-state`, {
      params: {
        state: status,
        string: string,
      },
    });
  }
  static async getRecords(userId: number, state: number, string: string): Promise<AxiosResponse<IRecord[]>> {
    return await $api<IRecord[]>('/records/user-state-string', {
        params: {
            userId,
            state,
            string
        }
    })
}
  
}