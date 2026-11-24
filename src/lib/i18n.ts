export type Locale = "en" | "es";

export const getLang = (currentLocale?: string): Locale =>
  currentLocale === "es" ? "es" : "en";
