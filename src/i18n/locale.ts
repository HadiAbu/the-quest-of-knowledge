import type { Locale } from "@/types/game";

export const LOCALES: Locale[] = ["en", "he", "ar"];

const RTL_LOCALES: ReadonlySet<Locale> = new Set(["he", "ar"]);

export function directionForLocale(locale: Locale): "ltr" | "rtl" {
  return RTL_LOCALES.has(locale) ? "rtl" : "ltr";
}

export function localeLabel(locale: Locale): string {
  switch (locale) {
    case "en":
      return "English";
    case "he":
      return "עברית";
    case "ar":
      return "العربية";
  }
}
