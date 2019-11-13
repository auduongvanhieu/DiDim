import I18n from 'react-native-i18n'

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

// English language is the main language for fall back:
I18n.translations = {
    en: require('./languages/en.json')
}

let languageCode = I18n.locale.substr(0, 2)

// All other translations for the app goes to the respective language file:
switch (languageCode) {
    case 'ko':
      I18n.translations.ko = require('./languages/ko.json')
      break
    case 'vi':
      I18n.translations.vi = require('./languages/vi.json')
      break
}

const missingTranslationRegex = /^\[missing ".*" translation\]$/

// This function is a wrapper to avoid exception wich leads in a crash
const translateOrFallback = initialMsg => {
  // We tried to translate something else than a string
  // The native I18n function will simply crash instead of rejecting the attempt with an error message
  if (typeof initialMsg !== 'string') {
    __DEV__ && console.log(`I18n: you must give a string to translate instead of "${typeof initialMsg}"`)

    return '' // We don't return any message as we don't know what to send
  }

  let localMsg = I18n.t(initialMsg)

  // The translation does not exist, the default message is not very sexy
  // Instead we return the message we tried to translate
  if (missingTranslationRegex.test(localMsg)) {
    __DEV__ && console.log(`translation "${initialMsg}" does not exists in translations files`)

    return initialMsg
  }

  return localMsg
}

export default {
  ...I18n,
  languageCode,
  t: translateOrFallback
}