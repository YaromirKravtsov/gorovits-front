import { StringOption } from "../../../components/SearchStrings/SearchStrings";


export interface UserRackets {
    id: number,
    code:string
    number:string;
}
  
export interface OrderPulling{
    id: number
    racketId: number,
    stringHardnes: string,
    longStrings: StringOption,
    crossStrings: StringOption,
    comment: string
}

export interface OrderTuning{
    id: number
    racketId: number,
    balancePoint:string;
    totalWeight:string;
    swingWeight:string;
    comment: string;
}
export interface OrderOsebandwechsel{
    id: number
    racketId: number,
    comment: string;
}
export interface OrderGriffreparatur{
    id: number
    racketId: number,
    handleSize: number,
    comment: string;
}



export type OrderRecord = OrderPulling | OrderTuning |OrderOsebandwechsel |OrderGriffreparatur
  
export interface ModelAndManufactureres{
    id:number,
    name:string,
    rocketManufacturerId?: number
}

/* export interface RacketModel{
    id:number,
    name:string,
} */