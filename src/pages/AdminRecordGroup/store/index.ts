import { GroupedRecords } from "../../../models/IRecord";
import { AdminRecordGroup, AdminRecordGroupActionEmun, AdminRecordGroupActions } from "./type";

const internalState: AdminRecordGroup = {
  recordGroup: {} as GroupedRecords,
  isLoading: true
}
export default function (state = internalState, action: AdminRecordGroupActions) {
  switch (action.type) {
    case AdminRecordGroupActionEmun.SET_RECORD_GROUP:
      return { ...state, recordGroup: action.payload, isLoading: false }
    case AdminRecordGroupActionEmun.UPDATE_RECORD_STATE:
      if (state.recordGroup && state.recordGroup.records) {
        return {
          ...state,
          recordGroup: {
            ...state.recordGroup,
            records: state.recordGroup.records.map(record => {

              if (record.id === action.payload.recordId) {
                return {
                  ...record,
                  state: action.payload.state
                };
              }
              return record; // возвращаем исходный элемент массива, если id не совпадает
            })
          }
        };
      }
      return state; // возвращаем исходное состояние, если recordGroup или records не существует

    case AdminRecordGroupActionEmun.UPDATE_GROUP_STATE:
      return {
        ...state, recordGroup:
          { ...state.recordGroup, state: action.payload }
      }
    case AdminRecordGroupActionEmun.SET_IS_LOADING:
      return { ...state, isLoading: action.payload }

    case AdminRecordGroupActionEmun.DELETE_RECORD:
      return {
        ...state,
        recordGroup: {
          ...state.recordGroup,
          records: state.recordGroup.records.filter(record => record.id !== action.payload)
        }
      };
    case AdminRecordGroupActionEmun.UPDATE_PICK_UP_TIME:
      return {
        ...state,
        recordGroup: {
          ...state.recordGroup,
          records: state.recordGroup.records.map(record => {
            if (record.id === action.payload.recordId) {
              return {
                ...record,
                pickupTime: action.payload.time
              };
            } else {
              return record;
            }
          })
        }
      };

    default:
      return state
  }
}