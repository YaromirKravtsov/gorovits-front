import { OrderPulling } from "../modules/Ordering/models/OrderModel";

export type IRecord = IPullingRecord |ITuningRecord |IOsebandwechselRecord |IRacketsTestRecord
export interface GroupedRecords {
    state: number;
    recordType: number;
    dateTime: Date;
    user?: { fullName: string };
    adminComment: string;
    records: IRecord[];
    pickupTime: string;
}

interface Record {
    adminComment: string;
    dateTime: Date;
    handleSize: null;
    id: number;
    pickupTime: string;
    recordType: number;
    state: number;
    userComment: string;
    userId: number;
    userRacketId: number;
    user?: {
        fullName:string
    }
}

interface Pulling {
    crossString: string;
    feedback: boolean;
    id: number;
    longString: string;
    recordId: number;
    string: {
        imgLink: string;
    };
    stringHardness: string;
    stringId: number;
    userRacket: {
        code: string;
        number: number;
        racketModel: {
            imgLink: string;
        };
        racketModelId: number;
        userRacketId: number;
    };
}
export interface Tuning{
    swingWeight: string,
    balancePoint: string,
    totalWeight: string
}

export interface IPullingRecord  extends Record{
    pulling: Pulling;
}

export interface ITuningRecord extends Record{
    tuning: Tuning
}

export interface IOsebandwechselRecord extends Record{
    userRacket:{
        code:string,
        number: number
    }
}

export interface IGriffreparaturRecord extends Record{
    userRacket:{
        code:string,
        number: number
    },
    handelSize: number;
}

export interface IRacketsTestRecord extends Record{
    testRackets:{
        racketModel:{
            name:string,
            manufacturer:{
                name:string
            }
        }
    }[]
}

//====== Create
export interface CreateRecordDto{
    recordType: number;
    dateTime:Date;
    state: number;
    userComment:string;
    userId: number;
    handleSize?: number;
    testRackets?: number[];
}

export interface CreatePullingDto extends CreateRecordDto{
    readonly stringHardness: string;
    readonly longString:string;
    readonly crossString?: string;
    readonly stringId?: number | null;
    readonly userRacketId: number;
    readonly recordId?: number;
}

export interface CreateTuningDto extends CreateRecordDto{
    balancePoint?: string;
    totalWeight?:string;
    swingWeight?: string;
    userRacketId: number;
    recordId?: number;
}

export interface CreateOsebandwechselgDto extends CreateRecordDto{
    readonly userRacketId: number;
}


export type CreateRecordType  = CreateTuningDto | CreatePullingDto | CreateOsebandwechselgDto |CreateRecordDto ;