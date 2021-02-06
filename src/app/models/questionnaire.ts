export interface Questionnaire {
    linkId: string;
    text: string;
    type: 'boolean' | 'string' | 'date' | 'group';
    item?: Questionnaire[];
}

export interface QuestionnaireResponse {
    identifier: number;
    status: 'in-progress' | 'completed' | 'amended' | 'entered-in-error' | 'stopped';
    item: ResponseItem[];
}

export interface ResponseItem {
    linkId: string;
    text: string;
    answer?: {
        valueBoolean?: boolean;
        valueDate?: string;
        valueString?: string;
    };
    item?: ResponseItem[];
}