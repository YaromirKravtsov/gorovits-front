export interface Record{
    dateTime: string,
    recordType: number
}
export interface BusyDateResponse{
    records: Record[],
    date: string
}