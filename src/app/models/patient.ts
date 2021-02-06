export interface PatientData {
    name: string;
    address: string;
    birthDate: string
    gender: string;
    id: string;
}

export class PatientSearch {
    name: string;
    dob: string;

    constructor(name?: string, dob?: string) {
        this.name = name || '';
        this.dob = dob || '';
    }
}

export const PatientTableColumns: any = {
    id: "ID",
    name: "Name",
    address: "Address",
    birthDate: "Birth Date",
    gender: "Gender"
}