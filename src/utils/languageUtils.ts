
export type Language = {
  code: string;
  name: string;
  flag: string;
};

export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
];

export const getLanguageName = (code: string): string => {
  return supportedLanguages.find(lang => lang.code === code)?.name || 'English';
};
