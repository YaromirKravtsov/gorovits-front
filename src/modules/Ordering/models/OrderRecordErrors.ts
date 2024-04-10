export interface OrderPullingsErrors{
    racketId: boolean,
    stringHardnes: boolean,
    longStrings: boolean,
}

export interface OrderTuningssErrors{
    racketId: boolean,
    balancePoint:boolean,
    totalWeight:boolean,
    swingWeight:boolean,
}

export interface OrderOsebandwechselErrors{
    racketId: boolean,
}

export interface OrderGriffreparaturErrors{
    racketId: boolean,
    handleSize: boolean,
}

export type OrderRecordErrors = OrderPullingsErrors | OrderTuningssErrors |OrderOsebandwechselErrors| OrderGriffreparaturErrors