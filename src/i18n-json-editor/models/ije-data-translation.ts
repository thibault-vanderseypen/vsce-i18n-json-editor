export interface IJEDataTranslation {
    id: number;
    key: string,
    valid: boolean,
    error: string,
    languages: { [language: string]: string; }
}
