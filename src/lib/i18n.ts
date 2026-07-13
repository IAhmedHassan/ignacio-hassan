import translations from '../data/translations.json';

type Language = 'es' | 'en';

/**
 * Get translated content by language and key
 */
export function getTranslation(lang: Language, key: string): string {
  const langData = translations[lang as keyof typeof translations];
  if (!langData) return key;
  return (langData as Record<string, string>)[key] || key;
}

/**
 * Detect language from Accept-Language header
 * Returns 'es' or 'en', defaults to 'es'
 */
export function detectLanguage(acceptLanguageHeader?: string): Language {
  if (!acceptLanguageHeader) return 'es';
  
  // Parse Accept-Language header and get preferred language
  const languages = acceptLanguageHeader
    .split(',')
    .map(lang => {
      const [code] = lang.trim().split(';');
      return code.split('-')[0].toLowerCase();
    });

  // Check if Spanish or English is preferred
  for (const lang of languages) {
    if (lang === 'es') return 'es';
    if (lang === 'en') return 'en';
  }

  // Default to Spanish
  return 'es';
}

/**
 * Validate and normalize language code
 */
export function normalizeLanguage(lang: string): Language {
  const normalized = lang.toLowerCase().split('-')[0];
  return (normalized === 'es' || normalized === 'en') ? normalized : 'es';
}
