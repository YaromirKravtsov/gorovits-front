import { AxiosResponse } from "axios";
import { IPullingRecord, IRecord } from "../../../../models/IRecord";
import $api from "../../../../app/api/http";
interface RecordsBuStateRes {
  totalCount: number,
  data: IRecord[]
}
export class RecordService {
  static async getUserRecords(userId: number, state:  'all'|''): Promise<AxiosResponse<IPullingRecord[]>> {
    return $api.get<IPullingRecord[]>('records/userId', {
      params: {
        userId ,
        state
      },
    });
  }

  static async getRecordByStatusAndString(page: number, pageSize: number,searchString: string, recordState: number,userId: 'all'|number): Promise<AxiosResponse<RecordsBuStateRes>> {
    return $api.get<RecordsBuStateRes>(`records/by-state`, {
      params: {
        page, pageSize, recordState, searchString,userId
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