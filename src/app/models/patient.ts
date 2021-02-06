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

export interface RawPatientData {
    entry: Array<{
        resource: {
            birthDate: string;
            id: string;
            gender: string;
            name: Array<{
                family: string;
                given: string[];
                [key: string]: any;
            }>;
            address: Array<{
                city: string;
                postalCode: string;
                line: string[];
                state: string;
                [key: string]: any;
            }>;
        };
        [key: string]: any;
    }>;
    [key: string]: any;
}