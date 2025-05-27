import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private subscription: Subscription;
  private lastKey: string;
  private lastParams: { [key: string]: string | number } | undefined;
  private lastValue: string;

  constructor(private languageService: LanguageService) {
    this.subscription = this.languageService.currentLanguage$.subscribe(() => {
      // Reset cache when language changes
      this.lastKey = '';
      this.lastParams = undefined;
      this.lastValue = '';
    });
  }

  transform(key: string, params?: { [key: string]: string | number }): string {
    if (!key) return '';

    // Simple caching to improve performance
    if (this.lastKey === key && this.areParamsEqual(this.lastParams, params)) {
      return this.lastValue;
    }

    this.lastKey = key;
    this.lastParams = params;
    this.lastValue = this.languageService.translate(key, params);
    return this.lastValue;
  }

  private areParamsEqual(
    params1: { [key: string]: string | number } | undefined,
    params2: { [key: string]: string | number } | undefined
  ): boolean {
    if (params1 === params2) return true;
    if (!params1 || !params2) return false;

    const keys1 = Object.keys(params1);
    const keys2 = Object.keys(params2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => params1[key] === params2[key]);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
