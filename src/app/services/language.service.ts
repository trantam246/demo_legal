import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzI18nService, ar_EG, en_US } from 'ng-zorro-antd/i18n';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Language {
  code: string;
  name: string;
  nzLocale: any;
  direction: 'ltr' | 'rtl';
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

  private translationsSubject = new BehaviorSubject<{ [key: string]: any }>({});
  public translations$ = this.translationsSubject.asObservable();

  private translations: { [key: string]: any } = {};

  constructor(private http: HttpClient, private nzI18n: NzI18nService) {
    this.loadAllLanguages().subscribe(() => {
      const savedLang = localStorage.getItem('language') || 'en';
      this.setLanguage(savedLang);
    });
  }

  private loadAllLanguages(): Observable<any> {
    const requests = this.languages.map((lang) =>
      this.loadLanguageFile(lang.code)
    );

    return forkJoin(requests);
  }

  private loadLanguageFile(langCode: string): Observable<any> {
    return this.http.get(`/assets/locales/${langCode}.json`).pipe(
      map((translations: any) => {
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

  translate(key: string): string {
    const currentLang = this.getCurrentLanguage().code;
    const translations = this.translations[currentLang];

    if (!translations) {
      return key;
    }

    return this.getNestedTranslation(translations, key) || key;
  }

  private getNestedTranslation(obj: any, path: string): string {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
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
  reloadLanguages(): Observable<any> {
    return this.loadAllLanguages();
  }

  // Method để thêm translations runtime (nếu cần)
  addTranslations(langCode: string, translations: any): void {
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
}
