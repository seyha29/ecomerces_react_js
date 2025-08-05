import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import khTranslation from './locales/kh/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      kh: { translation: khTranslation },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React handles XSS escaping
    },
    debug: process.env.NODE_ENV === 'development', // Debug in development
  });

export default i18n;