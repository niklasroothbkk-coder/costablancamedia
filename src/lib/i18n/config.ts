export const locales = ['en', 'sv'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function localePath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path}`;
}
