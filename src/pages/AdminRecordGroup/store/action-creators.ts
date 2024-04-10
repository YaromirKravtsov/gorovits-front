import { AuthActionCreators } from "../../../app/state/auth/action-creators";
import { getErrorText } from "../../../helpers/FormDataGeneration";
import RecordHeler from "../../../helpers/recordHelper";
import { GroupedRecords } from "../../../models/IRecord";
import { AppDispatch } from "../../../store";
import { AdminRecordGroupService } from "../api/AdminRecordGroupService";
import { AdminRecordGroupActionEmun, ChangePickUpDto, ChangeRecordPickUpAction, DeleteRecodAction, SetIsLoadingAction, SetRecordGroupAction, UpdateGroupStateAction, UpdateRecordState, UpdateRecordStateAction } from "./type";

export const AdminRecordGroupActionCreators = {
    setRecordsGroup: (recordGroup: GroupedRecords): SetRecordGroupAction => ({type: AdminRecordGroupActionEmun.SET_RECORD_GROUP, payload: recordGroup}),
    putRecordState:(payload: UpdateRecordState): UpdateRecordStateAction => ({type: AdminRecordGroupActionEmun.UPDATE_RECORD_STATE, payload: payload}),
    putGroupState:(state: number): UpdateGroupStateAction => ({type: AdminRecordGroupActionEmun.UPDATE_GROUP_STATE, payload: state}),
    setIsRecordGroupLoading:(value: boolean): SetIsLoadingAction => ({type: AdminRecordGroupActionEmun.SET_IS_LOADING, payload: value}),
    destroyRecordFromGroup:(recordId: number): DeleteRecodAction => ({type: AdminRecordGroupActionEmun.DELETE_RECORD, payload: recordId}),
    putPickUpTime:(payload: ChangePickUpDto): ChangeRecordPickUpAction => ({type: AdminRecordGroupActionEmun.UPDATE_PICK_UP_TIME, payload: payload}),
    setGlobalRecordGroup:(recordGroup: GroupedRecords) => async (dispatch: AppDispatch) =>{
        localStorage.setItem('recordGroup', JSON.stringify(recordGroup));
        dispatch(AdminRecordGroupActionCreators.setRecordsGroup(recordGroup))
    },
    getRecordGroup:(recordType: number,dateTime: Date,pickupTime: Date | null) => async (dispatch: AppDispatch) =>{
        dispatch(AdminRecordGroupActionCreators.setIsRecordGroupLoading(true))
        try{
       
         
            const {data} = await AdminRecordGroupService.getRecordsByTypeAndDate(recordType,dateTime,pickupTime);
            const group = RecordHeler.groupRecords(data);
            dispatch(AdminRecordGroupActionCreators.setRecordsGroup(group[0]))
        }catch(e){
       
            console.log(e)
            dispatch(AuthActionCreators.setGlobalError(getErrorText(e)))
          }  
       
    },
    updateGroupRecordState:(recordId:number, state:number) => async (dispatch: AppDispatch) =>{
        await AdminRecordGroupService.setState(recordId, state);
        dispatch(AdminRecordGroupActionCreators.putGroupState(state))
        dispatch(AdminRecordGroupActionCreators.putRecordState({recordId, state}))
    },
    deleteRecordFromGroup:(recordId:number) => async (dispatch: AppDispatch) =>{
        try{
            await AdminRecordGroupService.deleteRecord(recordId);
         
        }catch(e){
            console.log(e)
            dispatch(AuthActionCreators.setGlobalError(getErrorText(e)))
          }  
    },

    changePickUpTime:(recordId:number,time:Date) => async (dispatch: AppDispatch) =>{
        try{
            await AdminRecordGroupService.putPickUpTime(recordId,time);
            dispatch(AdminRecordGroupActionCreators.updateGroupRecordState(recordId, 2))
        
            dispatch(AdminRecordGroupActionCreators.putPickUpTime({recordId,time}))
         
        }catch(e){
            console.log(e)
            dispatch(AuthActionCreators.setGlobalError(getErrorText(e)))
          }  
       
    }
}