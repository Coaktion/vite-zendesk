import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import { english, portuguese } from './locales';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'pt',
    resources: {
      pt: {
        translation: portuguese,
      },
      en: {
        translation: english,
      }
    },
  });

export default i18n;
