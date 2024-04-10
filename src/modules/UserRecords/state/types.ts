import { IRecord } from "../../../models/IRecord";

export interface RecordState{
    records: IRecord[];
    error: string;
    isRecordsLoading: boolean;
}

export enum RecordActionEmun{
    SET_RECORDS = 'SET_RECORDS',
    SET_ERROR = 'SET_RECORDS',
    SET_IS_LOADING = 'SET_IS_LOADING',
    DELETE_USER_RECORD = "DELETE_USER_RECORD"
}

export interface SetRecorsdAction{
    type: RecordActionEmun.SET_RECORDS;
    payload: IRecord[];
}

export interface SetErrorAction{
    type: RecordActionEmun.SET_ERROR; 
    payload: string;
}

export interface SetIsLoadingAction{
    type: RecordActionEmun.SET_IS_LOADING; 
    payload: boolean;
}

export interface DeleteUserRecordAction{
    type: RecordActionEmun.DELETE_USER_RECORD; 
    payload: number;
}

export type RecordAction = SetRecorsdAction| 
SetErrorAction| 
SetIsLoadingAction|
DeleteUserRecordAction
;