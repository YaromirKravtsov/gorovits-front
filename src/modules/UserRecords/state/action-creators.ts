import $api from "../../../app/api/http";
import { AuthActionCreators } from "../../../app/state/auth/action-creators";
import { getErrorText } from "../../../helpers/FormDataGeneration";
import { CreateRecordDto, CreateRecordType, IRecord } from "../../../models/IRecord";
import { AppDispatch } from "../../../store";
import { OrderRecordActionCreators } from "../../Ordering/store/orderRecord/action-creators";
import { RecordService } from "../api/services/recordService";
import { DeleteUserRecordAction, RecordActionEmun, SetErrorAction, SetIsLoadingAction, SetRecorsdAction } from "./types";

export const  RecordActionCreators = {
    setRecords:(records: IRecord[]):SetRecorsdAction =>({type: RecordActionEmun.SET_RECORDS, payload: records}),
    setError:(error: string):SetErrorAction =>({type: RecordActionEmun.SET_ERROR, payload: error}),
    setIsRecordsLoading:(value: boolean):SetIsLoadingAction =>({type: RecordActionEmun.SET_IS_LOADING, payload: value}),
    getUserRecords: (userId:number) => async (dispatch: AppDispatch) =>{
        try{
            dispatch(RecordActionCreators.setIsRecordsLoading(true));
            const {data} = await RecordService.getUserRecords(userId);
            dispatch(RecordActionCreators.setRecords(data));
        }catch(error){
            dispatch(AuthActionCreators.setGlobalError(getErrorText(error)))
            dispatch(RecordActionCreators.setError((error as Error).message))
            console.log((error as Error).message)
        }
    },
/*     getRecordByStatusAndString: (status: number,string:string) => async( dispatch: AppDispatch) =>{
        try{
            dispatch(RecordActionCreators.setIsRecordsLoading(true));
            const {data} = await RecordService.getRecordByStatusAndString(status,string);
          
            dispatch(RecordActionCreators.setRecords(data));
        }catch(error){
            dispatch(AuthActionCreators.setGlobalError(getErrorText(error)))
            dispatch(RecordActionCreators.setError((error as Error).message))
            console.log((error as Error).message)
        }
    }, */
    getUserRecordsByString: (userId:number,status: number,string:string) => async( dispatch: AppDispatch) =>{
        try{
            dispatch(RecordActionCreators.setIsRecordsLoading(true));
            const {data} = await RecordService.getRecords(userId, status, string);
            dispatch(RecordActionCreators.setRecords(data));
        }catch(error){
            dispatch(AuthActionCreators.setGlobalError(getErrorText(error)))
            dispatch(RecordActionCreators.setError((error as Error).message))
            console.log((error as Error).message)
        }
    },
    deleteUserRecordFromState:(value: number):DeleteUserRecordAction =>({type: RecordActionEmun.DELETE_USER_RECORD, payload: value}),
    deleteUserRecord: (id:number) => async (dispatch: AppDispatch) =>{
        try{
            dispatch(RecordActionCreators.setIsRecordsLoading(true));
            const record = await $api.delete(`/records/${id}`);
            if(record){
                dispatch(RecordActionCreators.deleteUserRecordFromState(id));
            }

        }catch(error){
            dispatch(AuthActionCreators.setGlobalError(getErrorText(error)))
            dispatch(RecordActionCreators.setError((error as Error).message));
        }
    },
    createRecord: (recordData:CreateRecordType[],userId:number) => async (dispatch: AppDispatch) =>{
        try{
            dispatch(OrderRecordActionCreators.setOrderRecords([])); 
             dispatch(RecordActionCreators.setIsRecordsLoading(true)); 
             await $api.post(`/records`,recordData);
            dispatch(RecordActionCreators.getUserRecords(userId));
        }catch(error){
            dispatch(AuthActionCreators.setGlobalError(getErrorText(error)))
            dispatch(RecordActionCreators.setError((error as Error).message));
            console.log(getErrorText(error))
        }
    },

}