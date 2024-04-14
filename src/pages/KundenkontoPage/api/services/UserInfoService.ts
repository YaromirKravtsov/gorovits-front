import { AxiosResponse } from "axios";
import $api from "../../../../app/api/http";

import { IUser } from "../../../../models/IUser";
import { GetAktuallenTermineResponse, GetPullungResponse, GetUserInfoResponse, PutPhotoResponse } from "../responses/UserInfoResponse";

export default class UserInfoService{
    static async getAktuallenTermine(userId:number,limit:number): Promise<AxiosResponse <GetAktuallenTermineResponse[]> >{
        return $api.get<GetAktuallenTermineResponse[]>(`records/short-reserved`,{
          params:{
            userId, limit
          }
        });
    }
   
    static async putUserPhoto(userId:number,formData: FormData): Promise<AxiosResponse<PutPhotoResponse>>{
        return $api.put<PutPhotoResponse>(`users/photo/${userId}`,formData, {
            headers: {
              'Content-Type': 'multipart/form-data' // Указываем тип контента как multipart/form-data
            }
          });
    }
    static async getUserInfo(userId: number): Promise<AxiosResponse<GetUserInfoResponse>>{
      return $api.get<GetUserInfoResponse>(`/users/info/${userId}`);
    }

    static async putUserInfo(dto:IUser): Promise<AxiosResponse<GetUserInfoResponse>>{
      return $api.put<GetUserInfoResponse>(`/users/info/`, dto);
    }

    static async getLastPulling(userId:number): Promise<AxiosResponse <GetPullungResponse> >{
      return $api.get<GetPullungResponse>(`/records/lastPulling/${userId}`);
    }

}