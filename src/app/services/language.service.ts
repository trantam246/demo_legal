import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  NzI18nInterface,
  NzI18nService,
  ar_EG,
  en_US,
} from 'ng-zorro-antd/i18n';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Language {
  code: string;
  name: string;
  nzLocale: NzI18nInterface;
  direction: 'ltr' | 'rtl';
}

export interface Translations {
  [key: string]: string | Translations;
}

export interface TranslationsMap {
  [languageCode: string]: Translations;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languages: Language[] = [
    {
      code: 'en',
      name: 'English',
      nzLocale: en_US,
      direction: 'ltr',
    },
    {
      code: 'ar',
      name: 'العربية',
      nzLocale: ar_EG,
      direction: 'rtl',
    },
  ];

  private currentLanguageSubject = new BehaviorSubject<Language>(
    this.languages[0]
  );
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translationsSubject = new BehaviorSubject<Translations>({});
  public translations$ = this.translationsSubject.asObservable();

  private translations: TranslationsMap = {};

  constructor(private http: HttpClient, private nzI18n: NzI18nService) {
    this.loadAllLanguages().subscribe(() => {
      const savedLang = localStorage.getItem('language') || 'en';
      this.setLanguage(savedLang);
    });
  }

  private loadAllLanguages(): Observable<Translations[]> {
    const requests = this.languages.map((lang) =>
      this.loadLanguageFile(lang.code)
    );

    return forkJoin(requests);
  }

  private loadLanguageFile(langCode: string): Observable<Translations> {
    return this.http.get<Translations>(`/assets/locales/${langCode}.json`).pipe(
      map((translations: Translations) => {
        this.translations[langCode] = translations;
        return translations;
      }),
      catchError((error) => {
        console.error(`Error loading language file for ${langCode}:`, error);
        this.translations[langCode] = {};
        return of({});
      })
    );
  }

  getLanguages(): Language[] {
    return this.languages;
  }

  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  setLanguage(code: string): void {
    const language = this.languages.find((lang) => lang.code === code);
    if (language) {
      this.currentLanguageSubject.next(language);
      this.nzI18n.setLocale(language.nzLocale);
      this.updateDirection(language.direction);
      this.translationsSubject.next(this.translations[code] || {});
      localStorage.setItem('language', code);
    }
  }

  // ...existing code...

  translate(key: string, params?: { [key: string]: string | number }): string {
    const currentLang = this.getCurrentLanguage().code;
    const translations = this.translations[currentLang];

    if (!translations) {
      return this.interpolate(key, params);
    }

    const translatedText = this.getNestedTranslation(translations, key);
    const result = translatedText || key;

    return this.interpolate(result, params);
  }

  private interpolate(
    text: string,
    params?: { [key: string]: string | number }
  ): string {
    if (!params) return text;

    return text.replace(/\{(\w+)\}/g, (match: string, key: string) => {
      const value = params[key];
      return value !== undefined ? String(value) : match;
    });
  }

  private getNestedTranslation(obj: Translations, path: string): string | null {
    return path
      .split('.')
      .reduce((current: string | Translations | null, key: string) => {
        if (current && typeof current === 'object' && key in current) {
          return current[key];
        }
        return null;
      }, obj) as string | null;
  }

  private updateDirection(direction: 'ltr' | 'rtl'): void {
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute(
      'lang',
      this.getCurrentLanguage().code
    );
    document.body.className = direction === 'rtl' ? 'rtl' : 'ltr';
  }

  // Method để reload language files nếu cần
  reloadLanguages(): Observable<Translations[]> {
    return this.loadAllLanguages();
  }

  // Method để thêm translations runtime (nếu cần)
  addTranslations(langCode: string, translations: Translations): void {
    if (this.translations[langCode]) {
      this.translations[langCode] = {
        ...this.translations[langCode],
        ...translations,
      };
    } else {
      this.translations[langCode] = translations;
    }

    if (this.getCurrentLanguage().code === langCode) {
      this.translationsSubject.next(this.translations[langCode]);
    }
  }

  // Helper method to check if translation key exists
  hasTranslation(key: string, langCode?: string): boolean {
    const lang = langCode || this.getCurrentLanguage().code;
    const translations = this.translations[lang];

    if (!translations) {
      return false;
    }

    return this.getNestedTranslation(translations, key) !== null;
  }

  // Get all translations for current language
  getCurrentTranslations(): Translations {
    const currentLang = this.getCurrentLanguage().code;
    return this.translations[currentLang] || {};
  }

  // Check if current language is RTL
  isRTL(): boolean {
    return this.getCurrentLanguage().direction === 'rtl';
  }

  // Check if current language is LTR
  isLTR(): boolean {
    return this.getCurrentLanguage().direction === 'ltr';
  }
}
