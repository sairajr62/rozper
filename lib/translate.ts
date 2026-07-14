import { LOCALE_CODES, type LocaleCode } from "./locale"

export interface LanguageInfo {
  code: LocaleCode
  name: string
  /** Native-script name shown in the language switcher, e.g. "Español". */
  nativeName: string
  /** ISO 3166-1 alpha-2 country code used for the flagcdn.com flag image. */
  flagCountry: string
  rtl?: boolean
}

export const LANGUAGES: LanguageInfo[] = [
  { code: "es", name: "Spanish", nativeName: "Español", flagCountry: "es" },
  { code: "fr", name: "French", nativeName: "Français", flagCountry: "fr" },
  { code: "de", name: "German", nativeName: "Deutsch", flagCountry: "de" },
  { code: "it", name: "Italian", nativeName: "Italiano", flagCountry: "it" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flagCountry: "pt" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flagCountry: "nl" },
  { code: "pl", name: "Polish", nativeName: "Polski", flagCountry: "pl" },
  { code: "ru", name: "Russian", nativeName: "Русский", flagCountry: "ru" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flagCountry: "tr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flagCountry: "sa", rtl: true },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flagCountry: "in" },
  { code: "zh", name: "Chinese", nativeName: "中文", flagCountry: "cn" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flagCountry: "jp" },
  { code: "ko", name: "Korean", nativeName: "한국어", flagCountry: "kr" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flagCountry: "vn" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flagCountry: "id" },
  { code: "th", name: "Thai", nativeName: "ไทย", flagCountry: "th" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", flagCountry: "se" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", flagCountry: "ua" },
]

export const ENGLISH: LanguageInfo = {
  code: "en" as LocaleCode,
  name: "English",
  nativeName: "English",
  flagCountry: "us",
}

if (LANGUAGES.length !== LOCALE_CODES.length) {
  throw new Error("LANGUAGES must have exactly one entry per LOCALE_CODES entry")
}

export function isRTL(locale: string): boolean {
  return LANGUAGES.find((l) => l.code === locale)?.rtl === true
}

export function getLanguageInfo(locale: string): LanguageInfo | undefined {
  return LANGUAGES.find((l) => l.code === locale)
}
