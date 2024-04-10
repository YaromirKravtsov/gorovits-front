import { GroupedRecords } from "../../../models/IRecord";

export interface AdminRecordGroup{
    recordGroup: GroupedRecords,
    isLoading: boolean
}

export enum AdminRecordGroupActionEmun{
    SET_RECORD_GROUP =  "SET_RECORD_GROUP",
    UPDATE_RECORD_STATE =  "UPDATE_RECORD_GROUP",
    UPDATE_GROUP_STATE =  "UPDATE_GROUP_STATE",
    SET_IS_LOADING = "SET_RECORD_FROM_GROUP_IS_LOADING",
    DELETE_RECORD = "DELETE_RECORD_FROM_GROUP",
    UPDATE_PICK_UP_TIME = "UPDATE_PICK_UP_TIME_RECORD",
}

export interface SetRecordGroupAction{
    payload: GroupedRecords, 
    type: AdminRecordGroupActionEmun.SET_RECORD_GROUP
}
export interface UpdateRecordState{
    recordId: number, 
    state:number
}

export interface UpdateRecordStateAction{
    payload: UpdateRecordState, 
    type: AdminRecordGroupActionEmun.UPDATE_RECORD_STATE
}

export interface UpdateGroupStateAction{
    payload: number, 
    type: AdminRecordGroupActionEmun.UPDATE_GROUP_STATE
}

export interface SetIsLoadingAction{
    payload: boolean, 
    type: AdminRecordGroupActionEmun.SET_IS_LOADING
}



export interface DeleteRecodAction{
    payload: number, 
    type: AdminRecordGroupActionEmun.DELETE_RECORD
}
export interface ChangePickUpDto{
    recordId: number;
    time: Date;
}
export interface ChangeRecordPickUpAction{
    payload: ChangePickUpDto, 
    type: AdminRecordGroupActionEmun.UPDATE_PICK_UP_TIME
}


export type AdminRecordGroupActions = SetRecordGroupAction | UpdateRecordStateAction | UpdateGroupStateAction |SetIsLoadingAction |DeleteRecodAction |ChangeRecordPickUpAction;