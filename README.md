# astro-i18n-example

A basic example of i18n with Astro

```typescript
// ---------------------------------------- //
// -- Code Snippet 0-0                   -- //
// -- [src]/[lib]/i18n.ts                -- //
// ---------------------------------------- //

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
```

```astro
---
// ---------------------------------------- //
// -- Code Snippet 0-1                   -- //
// -- [src]/[pages]/index.astro          -- //
// ---------------------------------------- //
---
<!-- Redirecting users to the /en/ page -->
<meta http-equiv="refresh" content="0;url=/en/" />
```

```bash
# ---------------------------------------- #
# -- Code Snippet 0-2                   -- #
# -- Routing overview                   -- #
# ---------------------------------------- #

|-[pages]
  |
  |-[locale]
      |
      |- index.astro
      |
      |- [...]
```

```bash
# ---------------------------------------- #
# -- Code Snippet 0-3                   -- #
# -- Adding signals                     -- #
# ---------------------------------------- #

npm i @preact/signals-react
```

```typescript
// ---------------------------------------- //
// -- Code Snippet 0-4                   -- //
// -- [src][lib]/i18n.ts                 -- //
// ---------------------------------------- //

import { signal } from "@preact/signals";

// ... //

/** Locale signal */
export const locale = signal<Locale>("en");

/** Extracts the locale from the url */
export const getLocale = (url: URL | Location): Locale => {
  const [, locale = ""] = url.pathname.split("/");
  if (locales.includes(locale as Locale)) return locale as Locale;
  return "en" as Locale;
};
```

```astro
---
// ---------------------------------------- //
// -- Code Snippet 0-5                   -- //
// -- [src]/[pages][locale]/index.astro  -- //
// ---------------------------------------- //

//! you might need to update the following import route
import { type Locale, locales, locale as localeSignal } from "../../lib/i18n";

export const getStaticPaths = () => locales.map((locale) => ({ params: { locale } }));

const { locale = 'en' } = Astro.params;
localeSignal.value = locale as Locale;
---

<html lang={ locale }>
  <!-- ... -->
</html>
```

```astro
---
// ---------------------------------------- //
// -- Code Snippet 1-0                   -- //
// -- [src]/[pages][locale]/index.astro  -- //
// ---------------------------------------- //

// ... //
---

<!-- ... -->

<script>
  //! you might need to update the following import route
	import { getLocale, locale  } from "../../lib/i18n";

	const hydrateLocale = () => {
		const currentLocale = getLocale(window.location);
		if ( currentLocale !== locale.peek() ) locale.value = currentLocale;
	}

	hydrateLocale();
</script>
```

```tsx
// ---------------------------------------- //
// -- Code Snippet 1-1                   -- //
// -- [src]/[hooks]/useTranslation.tsx   -- //
// ---------------------------------------- //

import { useMemo } from "react";

//! you might need to update the following import route
import { __t, locale } from "../../lib/i18n";

const useTranslations = () => {
  const t = useMemo(() => __t.bind(null, locale.value), [locale.value]);

  return {
    t,
    locale,
  };
};

export default useTranslations;
```

```astro
---
// ---------------------------------------- //
// -- Code Snippet 2-0                   -- //
// -- [src]/[pages][locale]/index.astro  -- //
// ---------------------------------------- //

import { ViewTransitions } from 'astro:transitions';

// ... //
---

<html>
	<head>
		<ViewTransitions />
    <!-- ... -->
	</head>
  <!-- ... -->
</html>

```

```astro
---
// ---------------------------------------- //
// -- Code Snippet 2-1                   -- //
// -- [src]/[pages][locale]/index.astro  -- //
// ---------------------------------------- //

// ... //
---

<!-- ... -->

<script>
  //! you might need to update the following import route
	import { getLocale, locale } from "../../lib/i18n";

	const hydrateLocale = () => {
		const currentLocale = getLocale(window.location);
		if ( currentLocale !== locale.peek() ) locale.value = currentLocale;
	}


	document.addEventListener('astro:after-swap', hydrateLocale)
	hydrateLocale();
</script>
```
