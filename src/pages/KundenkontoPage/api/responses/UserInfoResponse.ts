export interface GetAktuallenTermineResponse{
    dateTime:Date;
    recordType:number;
}
export interface PutPhotoResponse{
    photoLink:string;
}
export interface GetUserInfoResponse{
    id:number;
    email:string;
    fullName:string;
    photoLink:string;
    phoneNumber:string;
    isNew: boolean
}


export interface GetPullungResponse{
    crossString: string;
    feedback: boolean;
    id: number;
    longString: string;
    recordId: number;
    string: { imgLink: string };
    stringHardness: string;
    stringId: number;
    userRacket: {
        racketModelId: number;
        racketModel: {
            imgLink: string;
        }
    };
    record: {
        dateTime:Date;
    }
    userRacketId: number;
}