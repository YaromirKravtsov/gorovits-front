import { Option } from "../../../UI/DropDownInput/DropDownInput";
import RecordHeler from "../../../helpers/recordHelper";
import { OrderRecord, UserRackets } from "../models/OrderModel";
import { OrderPulling } from "../models/OrderModel";

export class OrderHelper{
    static getRacketOptions(userRackets: UserRackets[],windowWidth: number){
        let options: Option[] =[];
        userRackets.forEach(racket=>{
            const label = `Schläger Nr. ${racket.number} Code ${RecordHeler.splitString(racket.code,(windowWidth >=600 ?9 : 15))}`
            
            options.push({
                label,
                value: racket.id
            })
        })
        return options;
    } 
    static getDefaultRacketOptions(userRackets: UserRackets[],windowWidth: number){
        let options: Option[] =[];
        options.push({
            label: 'Wählen Sie einen Schläger',
            value: -1
        })
        userRackets.forEach(racket=>{
            const label = `Schläger Nr. ${racket.number} Code ${RecordHeler.splitString(racket.code,(windowWidth >=600 ?9 : 15))}`
            
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