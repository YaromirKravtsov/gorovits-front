import { Option } from "../../../UI/DropDownInput/DropDownInput";
import { OrderRecord, UserRackets } from "../models/OrderModel";
import { OrderPulling } from "../models/OrderModel";

export class OrderHelper{
    static getRacketOptions(userRackets: UserRackets[]){
        let options: Option[] =[];
        userRackets.forEach(racket=>{
            const label = `Schläger Nr. ${racket.number} Code ${racket.code}`
            
            options.push({
                label,
                value: racket.id
            })
        })
        return options;
    } 
    static getUserRackets(rackets:UserRackets[], pulling: OrderRecord[]){
        return rackets.filter(item1 => !pulling.some(item2 => item1.id === item2.racketId));

    }
    static checkIfRecordExists = (idToCheck:number, array:OrderRecord[]) => {
        return array.some(item => item.id === idToCheck);
    };

}