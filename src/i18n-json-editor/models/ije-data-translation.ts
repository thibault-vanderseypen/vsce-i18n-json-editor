export interface IJEDataTranslation {
    id: number;
    folder: string;
    key: string;
    valid: boolean;
    error: string;
    languages: { [language: string]: string };
}

export enum IJEDataTranslationError {
    INVALID_KEY = 'The key is invalid.',
    KEY_NOT_EMPTY = 'The Key must be filled.',
    DUPLICATE_PATH = 'The key path is already defined.'
}
