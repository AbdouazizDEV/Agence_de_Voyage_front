import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import frTranslations from './locales/fr.json'
import enTranslations from './locales/en.json'

/**
 * Configuration i18next pour l'internationalisation
 */
i18n
  // Détection automatique de la langue du navigateur
  .use(LanguageDetector)
  // Passe i18n à react-i18next
  .use(initReactI18next)
  // Initialise i18next
  .init({
    // Langues supportées
    supportedLngs: ['fr', 'en'],
    // Langue par défaut
    fallbackLng: 'fr',
    // Namespace par défaut
    defaultNS: 'common',
    // Namespaces utilisés
    ns: ['common', 'nav', 'hero', 'sections', 'pages'],
    // Ressources de traduction
    resources: {
      fr: {
        common: frTranslations.common,
        nav: frTranslations.nav,
        hero: frTranslations.hero,
        sections: frTranslations.sections,
        pages: frTranslations.pages,
      },
      en: {
        common: enTranslations.common,
        nav: enTranslations.nav,
        hero: enTranslations.hero,
        sections: enTranslations.sections,
        pages: enTranslations.pages,
      },
    },
    // Options de détection
    detection: {
      // Ordre de détection
      order: ['localStorage', 'navigator'],
      // Clé de stockage
      lookupLocalStorage: 'i18nextLng',
      // Mettre en cache la langue détectée
      caches: ['localStorage'],
    },
    // Options de réact
    react: {
      useSuspense: false,
    },
    // Options de débogage (désactivé en production)
    debug: import.meta.env.DEV,
    // Interpolation
    interpolation: {
      escapeValue: false, // React échappe déjà les valeurs
    },
  })

export default i18n

