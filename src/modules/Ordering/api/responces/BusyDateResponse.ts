export interface Record{
    dateTime: string
}
export interface BusyDateResponse{
    records: Record[],
    date: string
}