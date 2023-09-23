/** Translations */
const translations = {
  en: {
    title: "Astro i18n example",
    counter: "Your number is ",
  },
  fr: {
    title: "Astro i18n example",
    counter: "ton numéro est ",
  },
  de: {
    title: "Astro i18n beispiel",
    counter: "Deine Nummer ist ",
  },
} as const;

/** Available locales */
export const locales = Object.keys(translations);

/** Type of locales */
export type Locale = keyof typeof translations;

export const __t = (
  locale: Locale = "en",
  key: keyof (typeof translations)["en"]
) => translations[locale]?.[key];
