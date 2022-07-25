import { IJEConfiguration } from '../ije-configuration';
import { IJEDataTranslation } from '../models/ije-data-translation';
import { IJEMicrosoftTranslator } from './translations/ije-microsoft-translator';
import { IJETranlsation } from './translations/ije-translation';

export abstract class IJETranslationService {
    public static async translate(translation: IJEDataTranslation, language: string, languages: string[]) {
        const tranlsationService = IJEConfiguration.TRANSLATION_SERVICE;

        if (!tranlsationService || !IJEConfiguration.TRANSLATION_SERVICE_API_KEY) {
            return;
        }
        let service: IJETranlsation;
        if (IJEConfiguration.TRANSLATION_SERVICE === TranslationServiceEnum.MicrosoftTranslator) {
            service = new IJEMicrosoftTranslator();
        }
        if (!service) {
            return;
        }
        const data = await service.translate(translation.languages[language], language, languages);
        languages
            .filter(l => l !== language)
            .forEach(l => {
                if (data[l]) {
                    translation.languages[l] = data[l];
                }
            });
    }
}

export enum TranslationServiceEnum {
    MicrosoftTranslator = 'MicrosoftTranslator'
}
