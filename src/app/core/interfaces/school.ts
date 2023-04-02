import { IGlobalFields } from "./global-interface";

export interface ISchool extends IGlobalFields {
    key: string;
    name: string;
    ID: string;
    email?: string;
    address?: string;
    country?: any;
    phoneNumber?: string;
    faxNumber?: string;
}



export interface ICampus extends IGlobalFields {
    key: string;
    campusId: string;
    name: string;
    nameEn: string;
    shortName?: string;
    shortNameEn?: string;
    campusNumber: string;
    email?: string;
    address?: string;
    phoneNumber?: string;
    faxNumber?: string;
    schoolKey: string;
}

export interface IBuilding extends IGlobalFields {
    key: string;
    name: string;
    nameEn: string;
    schoolKey: string;
    campusKey: string;
}

export interface IDepartment extends IGlobalFields {
    key: string;
    name: string;
    nameEn: string;
    schoolKey: string;
}

export interface IRoom extends IGlobalFields {
    key: string;
    name: string;
    nameEn: string;
    schoolKey: string;
    campusKey: string;
    buildingKey: string;
    roomType: any;
    floor: any;
    minPerson: number;
    maxPerson: number;
}