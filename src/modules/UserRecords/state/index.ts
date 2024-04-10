import { IRecord } from "../../../models/IRecord";
import { RecordAction, RecordActionEmun, RecordState } from "./types";

const internalState:RecordState= {
    records: [] as IRecord[],
    error: '',
    isRecordsLoading: false,
/*     testReackets: [] as  */
}
export default function(state = internalState, action: RecordAction){
    switch(action.type){
        case RecordActionEmun.SET_RECORDS:
            return {
                ...state,
                records:action.payload as IRecord[], 
                isRecordsLoading:false
              };
        case RecordActionEmun.DELETE_USER_RECORD:
          return {
              ...state,
              records:state.records.filter(record => record.id !== action.payload),
              isRecordsLoading:false
            };
        case RecordActionEmun.SET_IS_LOADING:
            return {...state, isRecordsLoading: action.payload}
        case RecordActionEmun.SET_ERROR:
            return {...state, error: action.payload,isRecordsLoading:false}
        default:
            return {...state}
    }
}