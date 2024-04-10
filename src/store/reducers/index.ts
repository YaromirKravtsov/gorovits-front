import auth from '../../app/state/auth';
import user from './user';
import pulling from '../../modules/PullingStory/store/pulling';
import racket from '../../modules/Racket/store';
import record from '../../modules/UserRecords/state'
import order from '../../modules/Ordering/store/order'
import orderRecord from '../../modules/Ordering/store/orderRecord'
import newRackets from '../../modules/NewRackets/store/newRackets/index'
import recordGroup from '../../pages/AdminRecordGroup/store'
export default {
    auth,
    user,
    pulling,
    racket,
    record,
    order,
    orderRecord,
    newRackets,
    recordGroup

}