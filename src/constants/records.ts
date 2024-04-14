import React,{ FC, ReactNode } from "react";
import BesaitungCard from "../modules/UserRecords/components/BesaitungCard/BesaitungCard";
import { IPullingRecord, IRecord } from "../models/IRecord";
import PullingOrdering from "../modules/Ordering/components/PullingOrdering/PullingOrdering";
import TunningOrdering from "../modules/Ordering/components/TunningOrdering/TunningOrdering";
import TuningCard from "../modules/UserRecords/components/TuningCard/TuningCard";
import OsebandwechselOrdering from "../modules/Ordering/components/OsebandwechselOrdering/OsebandwechselOrdering";
import OsebandwechselCard from "../modules/UserRecords/components/OsebandwechselCard/OsebandwechselCard";
import GriffreparaturOrdering from "../modules/Ordering/components/GriffreparaturOrdering/GriffreparaturOrdering";
import GriffreparaturCard from "../modules/UserRecords/components/GriffreparaturCard/GriffreparaturCard";
import AdditionalRecordsMenu from "../modules/Ordering/components/AdditionalRecordsMenu/AdditionalRecordsMenu";
import AdditionalRecordsCard from "../modules/UserRecords/components/AdditionalRecordsCard/AdditionalRecordsCard";
import OnCourtRacketTesting from "../modules/Ordering/components/OnCourtRacketTesting/OnCourtRacketTesting";
import OnCourtRacketTestingСard from "../modules/UserRecords/components/OnCourtRacketTestingСard/OnCourtRacketTestingСard";

interface RecordType {
    name: string;
    component: FC<{ record: IRecord }>;
    ordering: FC<{type: number}>;
    orderingLink: string;
    type: number;

}


export const RecordTypes: RecordType[] = [

    {
        type: 1,
        name: "Besaitung",
        component: BesaitungCard,
        ordering: PullingOrdering,
        orderingLink:''
    },
     {
        name: "Tuning",
        type: 2,
        component: TuningCard,
        ordering: TunningOrdering,     
        orderingLink:''   
    },
     {
        type: 3,
        name: "Ösebandwechsel",
        component: OsebandwechselCard,
        ordering: OsebandwechselOrdering, 
        orderingLink:''
    },
     {
        type: 4,
        name: "Griffreparatur",
        component: GriffreparaturCard,
        ordering: GriffreparaturOrdering,   
        orderingLink:''   
    },
    {
        type: 5,
        name: "Sonstiges",
        component: AdditionalRecordsCard,
        ordering: AdditionalRecordsMenu, 
        orderingLink:''    
    },
    {
        type: 7,
        name: "Tennisschläger - Beratung",
        component: AdditionalRecordsCard,
        ordering: AdditionalRecordsMenu,  
        orderingLink:''    
    },
    {
        type: 8,
        name: "On Court Tennisschläger - Test",
        component: OnCourtRacketTestingСard,
        ordering: OnCourtRacketTesting,    
        orderingLink:''  
    },
     {
        type: 9,
        name: "On Court Tuning",
        component: AdditionalRecordsCard,
        ordering: AdditionalRecordsMenu, 
        orderingLink:''  
    },
    {
        type: 10,
        name: "Manschaftskletypeung - Beratung",
        component: AdditionalRecordsCard,
        ordering: AdditionalRecordsMenu,   
        orderingLink:''
    },
    {
        type: 11,
        name: "Sonstiges",
        component: AdditionalRecordsCard,
        ordering: AdditionalRecordsMenu,   
        orderingLink:'' 
    }
]