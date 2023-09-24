import { signal as preactSignal } from "@preact/signals";
import { signal as reactSignal } from "@preact/signals-react";

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

/** Locale signal */
export const preactLocale = preactSignal<Locale>("en");
export const reactLocale = reactSignal<Locale>("en");

/** Extracts the locale from the url */
export const getLocale = (url: URL | Location): Locale => {
  // Since Github pages adds an extra part to the URL, we have to extract the locale from the
  // third index of the array, otherwise it would be the second index!
  const locale = url.pathname.split("/")[2];
  if (locales.includes(locale as Locale)) return locale as Locale;
  return "en" as Locale;
};
