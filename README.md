# Astro i18n example

## Before we begun

### Why does this blog exist?

You might rightfully say, that Astro docs provide a recipe about how to implement i18n, but the problem with the official guide is that it doesn’t provide information on how to use the translations in libraries such as React, Preact or Svelte. 

## Why Astro?
Astro may not be as popular as Next or Nuxt, but it offers a unique frontend development experience by allowing you to use your favourite frontend libraries, server-side render them, do client-side routing with animations or ship your website without any client-side javascript. ( keep in mind this means, there won’t be any js bound interactivity! )

### What do you need to know?
Basic knowledge of Astro, Server-side rendering and client-side hydration is needed for a complete understanding of our i18n process.

## Stages

### Stage zero

In the first stage, we need to provide translations for our server-rendered components. Since the Astro recipe includes a how-to for Astro components, we are going to skim through it. We just need to provide the translations for our preferred library. In this guide, I am going to provide the code for the React library and provide you with some hints on how to do it for preact, with some minor adjustments.

### Stage one

In the next stage, we need to provide the selected locale to the rendering library before it starts the hydration. Keep in mind if we delay this part, we will cause a hydration error.

### Stage two - Optional

In case you’re using the awesome Astro view transitions, we need to check the selected locale after each route change. 

## Implementation

### Stage zero

#### Setting up basic i18n system
Firstly we need to add our translation file. In this file, we need to export our translations for each language. A basic example of it is displayed below. 
 
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

#### Setting up i18n routing

We need to update our pages directory to support i18n routing. Firstly we need to create a folder called `[locale]` in our page directory, then move all of your pages inside it. Create an `index.astro` with the following code in the root of your `page` folder to redirect users from `/` to `/en/`.

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

In the end, your `page` route should be resembled as the following:

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

#### Translations for React / Preact

Before we begin we need to add a global store to our application. In this guide, I am going to use signals from the Preact team. Therefore you need to add `@preact/signals-react` to your dependencies - in case you’re using preact you can add `@preact/signals` instead.

```bash
# ---------------------------------------- #
# -- Code Snippet 0-3                   -- #
# -- Adding signals                     -- #
# ---------------------------------------- #

npm i @preact/signals-react
```

Then we need to add a global signal which will provide us with the current locale. Since the React / Preact components will initially be rendered on the server, we have to keep the signal updated while we are server-side rendering. We would also need a function to extract the current locale from the URL. So our updated `i18n.ts` should look something like this.

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

At last, we should add the available locale params, to the pages inside the `[locale]` folder. This means they should have the following function in server rendered portion

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

By now we have completed the first stage, which means our components should have the needed translations for server-side 
rendering.

### Stage one

At this stage, we have to hydrate the `locale` signal which will provide our client components with the needed locale. We have to add the following Astro script to our pages, which hydrates the signal with the current locale, which it finds from the windows location.

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

Now your components will have access to the current locale, the last missing part is to add a hook which returns the `__t` 
function.

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

Finally, your components should have access to the `t` function which allows you to use your key-based translations.

### Stage two

At last, we have to add the `astro:transitions` to our pages which enables client-side navigation. After adding it to our header as displayed below,


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

We need to add a small event listener to our script at `code 1-0`, which updates the locale if we navigate to another locale.

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

        // ... //

	const hydrateLocale = () => {
		const currentLocale = getLocale(window.location);
		if ( currentLocale !== locale.peek() ) locale.value = currentLocale;
	}


	document.addEventListener('astro:after-swap', hydrateLocale)
	hydrateLocale();
</script>
```
