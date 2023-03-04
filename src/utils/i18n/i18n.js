import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import pt from "./locales/pt/translation.json"

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    resources: {
      en: {translation: en},
      pt: {translation: pt}
    },
    debut: true,
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false, // react already saves from xss
    },
  });

export default i18n;
