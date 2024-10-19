export interface Epicrisis {
    patient: string;
    age: string;
    reason_for_consultation: string;
    duration_of_symptoms: number;
    signs_and_symptoms: any[];
    presumptive_diagnosis: string;
    vital_signs: any[];
    physical_examination: { key: string, value: string }
    complementary_studies: { key: string, value: string }
    evolution: string;
}