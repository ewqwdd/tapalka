import i18n from 'i18next'
import I18NextHttpBackend from 'i18next-http-backend'
import ChainedBackend from 'i18next-chained-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'

import { initReactI18next } from 'react-i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'

const backend = {
  backends: [I18NextHttpBackend],
  backendOptions: [{ supportedLngs: ['en', 'ru', 'tu'], loadPath: '/locales/{{lng}}/{{ns}}.json' }],
}
if (!__IS_DEV__) {
  // @ts-expect-error to fix
  backend.backends.push(LocalStorageBackend)
  backend.backendOptions.push({
    //@ts-ignore
    expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
}

i18n
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .use(ChainedBackend)
  .init({
    fallbackLng: 'ru',
    supportedLngs: ['en', 'ru', 'tu'],
    debug: true,
    backend: backend,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
