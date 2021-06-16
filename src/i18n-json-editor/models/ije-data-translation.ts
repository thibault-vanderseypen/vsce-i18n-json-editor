export interface IJEDataTranslation {
  id: number;
  folder: string;
  key: string;
  valid: boolean;
  error: string;
  languages: { [language: string]: string };
}
