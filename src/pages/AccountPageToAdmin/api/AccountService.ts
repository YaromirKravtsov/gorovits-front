import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
import { IUser } from "../../../models/IUser";
export interface RacketsResponse {
    code: string;
    currentPllingId: number;
    currentTuningId: number | null;
    id: number;
    number: number;
    pulling: {
        crossString: string | null;
        feedback: string | null;
        longString: string;
        recordId: number | null;
        string: string | null;
        stringHardness: string;
        stringId: number;
        userRacketId: number;
    }
    racketModel: {
        imgLink: string;
        name: string,
        manufacturer: {
            id: number,
            name: string
        }
    };
    racketModelId: number;
    tuning: {
        balancePoint: string;
        id: number;
        recordId: number | null;
        swingWeight: string;
        totalWeight: string;
        userRacketId: number;
    } | null;
    userId: number;
}
export class AccountService {
    static getUserInfo(userId: number): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`/users/info/${userId}`);
    }

    static getUserRackets(userId: number): Promise<AxiosResponse<RacketsResponse[]>> {
        return $api.get<RacketsResponse[]>(`/user-rackets/${userId}`);
    }

    static deleteUser(userId: number): Promise<AxiosResponse<{ id: number }>> {
        return $api.delete<{ id: number }>(`/users/${userId}`);
    }

}