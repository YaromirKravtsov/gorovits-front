import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
import { IRecord } from "../../../models/IRecord";
import { EditPullingDto } from "../models/EditPullingDto";

export class AdminRecordGroupService {
    static async setState(recordId: number, state:number) {
        return await $api.put('records/state', {
            recordId,
            state
        })
    }

    static async getRecordsByTypeAndDate(recordType: number, dateTime: Date,pickupTime: Date | null): Promise<AxiosResponse<IRecord[]>> {
        return await $api.get<IRecord[]>(`records/by-type-and-time`,{params: {
            recordType: recordType,
            dateTime: dateTime,
            pickupTime: pickupTime
        }});
    }

    static async setAdminComment(recordId: number, comment: string): Promise<AxiosResponse> {
        return await $api.put(`/records/admin-comment`, {
            recordId,
            comment
        });
    }

    static async getNameByModelId(modelId:number): Promise<AxiosResponse<string>> {
        return await $api.get<string>(`/racket/model-name/${modelId}`);
    }

    static async deleteRecord(reordId: number): Promise<AxiosResponse> {
        return $api.delete(`records/to-admin/${reordId}`);

    }

    static async putPickUpTime(recordId: number, time: Date): Promise<AxiosResponse> {
        return $api.put(`records/pick-up-time`,{
            recordId,time
        });
    }


    static async putStrings(dto:EditPullingDto ): Promise<AxiosResponse> {
        return $api.put(`/pullings/strings`,dto);
    }
}