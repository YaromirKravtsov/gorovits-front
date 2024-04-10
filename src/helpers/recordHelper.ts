import { FC } from "react";
import { RecordTypes } from "../constants/records";
import { GroupedRecords, IPullingRecord, IRecord, Tuning } from "../models/IRecord";


import FormatDate from "./dates";

export default class RecordHeler {
    static formatStringHardnes(stringHardnes: string) {
        const [num1, num2] = stringHardnes.split('×');
        const result = `${num1} × ${num2}`;
        return result;
    }
    static formatStringsName(longString: string, crossString: string) {
        if (crossString) {
            return longString + ' & ' + crossString;
        }
        return longString;
    }
    static isTuning(tuning: any) {
        if (!tuning || (!tuning?.swingWeight && !tuning?.balancePoint && !tuning?.totalWeight)) {
            return false;

        }
        return true
    }

    static getStateInfo(record: IRecord) {
        let color = '';
        let string = ''
        switch (record.state) {
            case 1:
                color = '#2D92CC';
                string = "Eingang " + FormatDate.SqlToDateTime(record.dateTime);
                return [string, color];
            case 2:
                color = '#FFBA00';
                string = "In Arbeit. Termin: " + FormatDate.SqlToDateTime(record.pickupTime);
                return [string, color];
            case 3:
                color = '#13B257';
                string = "Abholbereit Termin: " + FormatDate.SqlToDateTime(record.pickupTime);;
                return [string, color];
            case -1:
                color = '#13B257';
                const stringPlus = (record.pickupTime ==  'null' || record.pickupTime == null)? '':FormatDate.SqlToDateTime(record.pickupTime);
                string = "Verarbeitet " +stringPlus
            
                return [string, color];
            default:
                return [string, color];

        }
    }
    static getComponentByRecordType(recordType: number): FC<{ record: IRecord }> {
        const foundRecord = RecordTypes.find((record) => recordType === record.type);
        if (foundRecord) {
            return foundRecord.component;
        }
        return RecordTypes[0].component;
    }


    static getNameByRecordType(recordType: number): string {
        const foundRecord = RecordTypes.find(record => record.type === recordType);
        if (foundRecord) {
            return foundRecord.name;
        } else {
            return '';
        }

    }
    static getBelonging(): any[][] {
        let werkstatt: {}[] = [];
        let beratung: {}[] = [];
        RecordTypes.forEach((record) => {
            if (record.type >= 1 && record.type <= 5) {
                werkstatt.push({
                    text: record.name,
                    value: record.type
                });
            } if (record.type >= 6) {
                beratung.push({
                    text: record.name,
                    value: record.type
                });
            }
        });
        return [werkstatt, beratung];
    }
    static getOrderingByType(recordType: number): FC<{ type: number }> | undefined {
        const record = RecordTypes.find((record) => recordType === record.type);
        if (record) {
            return record.ordering;
        }
        return undefined; // Если запись не найдена, вернуть undefined
    }

    static renderTuningData = (tuning: Tuning): string[] => {
        const tuningElements: string[] = [];

        if (tuning.swingWeight) {
            tuningElements.push(`SW ${tuning.swingWeight}`);
        }

        if (tuning.balancePoint) {
            tuningElements.push(`B ${tuning.balancePoint}`);
        }

        if (tuning.totalWeight) {
            tuningElements.push(`W ${tuning.totalWeight}`);
        }

        return tuningElements;
    };

    static insertSpaceIfNeeded(sentence: string): string {
        const words = sentence.split(' ');
        const processedWords = words.map(word => {
            if (word.length > 10) {
                return word.slice(0, 10) + '.';
            }
            return word;
        });
        return processedWords.join(' ');
    }


    static groupRecords(records: IRecord[]): GroupedRecords[] {
        const groupedRecords: { [key: string]: IRecord[] } = {};
    
        records.forEach(record => {
            const { state, recordType, dateTime,  pickupTime, user ,adminComment} = record;
        
            const key = `${recordType}---${adminComment}---${dateTime}---${pickupTime}---${user?.fullName || ''}`;
    
            if (!groupedRecords[key]) {
                groupedRecords[key] = [];
            }
    
            groupedRecords[key].push(record);
        });
    
        // Преобразование сгруппированных записей в массив объектов GroupedRecords
        return Object.entries(groupedRecords).map(([key, groupedRecords]) => {
            const [ recordType, adminComment, dateTime, pickupTime, fullName] = key.split('---');
    
            return {
                state: (records[0].state),
                recordType: parseInt(recordType),
                dateTime: new Date(dateTime) ,
                user: fullName ? { fullName } : undefined,
                records: groupedRecords,
                adminComment:  adminComment,
                pickupTime:  pickupTime
            };
        });
    }
    
}