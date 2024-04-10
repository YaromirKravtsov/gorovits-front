import { StringOption } from "../components/SearchStrings/SearchStrings";

export interface INewRacket{
    id: number,
    racketModelId:number;
    number:string;
    code:string;
    racketModelName: string,
    balancePoint: string;
    totalWeight:string;
    swingWeight: string;
    longString:StringOption,
    crossString:StringOption,
    stringHardness: string;
    stringId: number;

    pullingId?:number;
    tunningId?:number;
}