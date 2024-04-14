import {AuthActionCreators} from '../../app/state/auth/action-creators'
import {UserActionCreators} from './user/action-creators'
import {AdaptiveActionsCreator} from './adaptive/actions-creator'
import {PullingActionCreators} from '../../modules/PullingStory/store/pulling/action-creators';
import {RacketActionCreators} from '../../modules/Racket/store/action-creators'
import {RecordActionCreators} from '../../modules/UserRecords/state/action-creators'
import {OrderActionCreators} from '../../modules/Ordering/store/order/action-creators'
import {OrderRecordActionCreators} from '../../modules/Ordering/store/orderRecord/action-creators'
import {NewRacketsActionCreators} from '../../modules/NewRackets/store/newRackets/action-creators'
import {AdminRecordGroupActionCreators} from '../../pages/AdminRecordGroup/store/action-creators'
export const allActionsCreators = {
    ...AuthActionCreators,
    ...UserActionCreators,
    ...PullingActionCreators,
    ...RacketActionCreators,
    ...RecordActionCreators,
    ...OrderActionCreators,
    ...OrderRecordActionCreators,
    ...NewRacketsActionCreators,
    ...AdminRecordGroupActionCreators,
    ...AdaptiveActionsCreator
}