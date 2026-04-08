import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'zh';

interface LanguageState {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'zh', // 默认中文
      toggleLanguage: () => set((state) => ({
        language: state.language === 'en' ? 'zh' : 'en'
      })),
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'aon-language-storage',
    }
  )
);
