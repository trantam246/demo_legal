import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import find from 'lodash/find';
import get from 'lodash/get';
import merge from 'lodash/merge';
import set from 'lodash/set';
import {
  ar_EG,
  en_US,
  NzI18nInterface,
  NzI18nService,
} from 'ng-zorro-antd/i18n';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

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

export interface LangChangeEvent {
  lang: string;
  translations: Translations;
}

export interface InterpolationParams {
  [key: string]: string | number | boolean;
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
  private translationsSubject = new BehaviorSubject<Translations>({});
  private onLangChangeSubject = new Subject<LangChangeEvent>();

  public currentLanguage$ = this.currentLanguageSubject.asObservable();
  public translations$ = this.translationsSubject.asObservable();
  public onLangChange$ = this.onLangChangeSubject.asObservable();

  private translations: TranslationsMap = {};
  private translationCache: { [key: string]: Observable<Translations> } = {};
  private defaultLang = 'en';

  constructor(private http: HttpClient, private nzI18n: NzI18nService) {
    this.loadAllLanguages().subscribe(() => {
      const savedLang = localStorage.getItem('language') || this.defaultLang;
      this.use(savedLang);
    });
  }

  // ============ Core Methods ============
  use(lang: string): Observable<Translations> {
    if (this.translations[lang]) {
      this.setCurrentLanguage(lang);
      return of(this.translations[lang]);
    }

    return this.getTranslation(lang).pipe(
      map((translations) => {
        this.setCurrentLanguage(lang);
        return translations;
      })
    );
  }

  instant(key: string, interpolateParams?: InterpolationParams): string {
    const currentLang = this.getCurrentLanguage().code;
    let translation = this.getTranslationValue(key, currentLang);

    // Fallback to default language
    if (!translation && currentLang !== this.defaultLang) {
      translation = this.getTranslationValue(key, this.defaultLang);
    }

    if (!translation) {
      return key;
    }

    return this.interpolate(translation, interpolateParams);
  }

  stream(
    key: string | string[],
    interpolateParams?: InterpolationParams
  ): Observable<string | { [k: string]: string }> {
    return this.translations$.pipe(
      map(() => {
        if (Array.isArray(key)) {
          const results: { [k: string]: string } = {};
          key.forEach((k) => {
            results[k] = this.instant(k, interpolateParams);
          });
          return results;
        }
        return this.instant(key, interpolateParams);
      })
    );
  }

  // ============ Private Methods ============
  private interpolate(text: string, params?: InterpolationParams): string {
    if (!params) return text;

    return text.replace(/\{\s*([^}]+)\s*\}/g, (match: string, key: string) => {
      const value = get(params, key.trim()); // ✅ Lodash get
      return value !== undefined ? String(value) : match;
    });
  }

  private setCurrentLanguage(code: string): void {
    const language = find(this.languages, { code }); // ✅ Lodash find
    if (language) {
      this.currentLanguageSubject.next(language);
      this.nzI18n.setLocale(language.nzLocale);
      this.updateDirection(language.direction);
      this.translationsSubject.next(this.translations[code] || {});
      localStorage.setItem('language', code);

      this.onLangChangeSubject.next({
        lang: code,
        translations: this.translations[code] || {},
      });
    }
  }

  private getTranslationValue(key: string, lang: string): string | null {
    const translations = this.translations[lang];
    if (!translations) return null;

    const value = get(translations, key); // ✅ Lodash get
    return typeof value === 'string' ? value : null;
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
      catchError(() => {
        this.translations[langCode] = {};
        return of({});
      })
    );
  }

  private updateDirection(direction: 'ltr' | 'rtl'): void {
    document.documentElement.setAttribute('dir', direction);
    document.body.className = direction === 'rtl' ? 'rtl' : 'ltr';
  }

  private getTranslation(lang: string): Observable<Translations> {
    if (this.translationCache[lang]) {
      return this.translationCache[lang];
    }

    this.translationCache[lang] = this.loadLanguageFile(lang).pipe(
      shareReplay(1)
    );

    return this.translationCache[lang];
  }

  // ============ Public Methods ============
  setLanguage(code: string): void {
    this.use(code).subscribe();
  }

  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  getLanguages(): Language[] {
    return this.languages;
  }

  isRTL(): boolean {
    return this.getCurrentLanguage().direction === 'rtl';
  }

  translate(key: string, params?: InterpolationParams): string {
    return this.instant(key, params);
  }

  // Runtime translation updates
  set(key: string, value: string | Translations, lang?: string): void {
    const targetLang = lang || this.getCurrentLanguage().code;

    if (!this.translations[targetLang]) {
      this.translations[targetLang] = {};
    }

    set(this.translations[targetLang], key, value); // ✅ Lodash set

    if (targetLang === this.getCurrentLanguage().code) {
      this.translationsSubject.next(this.translations[targetLang]);
    }
  }

  // Merge translations
  addTranslations(langCode: string, translations: Translations): void {
    if (this.translations[langCode]) {
      this.translations[langCode] = merge(
        // ✅ Lodash merge
        this.translations[langCode],
        translations
      );
    } else {
      this.translations[langCode] = translations;
    }

    if (this.getCurrentLanguage().code === langCode) {
      this.translationsSubject.next(this.translations[langCode]);
    }
  }
}
