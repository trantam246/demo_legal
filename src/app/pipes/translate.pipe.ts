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
  private lastValue: string;

  constructor(private languageService: LanguageService) {
    this.subscription = this.languageService.currentLanguage$.subscribe(() => {
      // Reset cache when language changes
      this.lastKey = '';
      this.lastValue = '';
    });
  }

  transform(key: string): string {
    if (!key) return '';

    // Simple caching to improve performance
    if (this.lastKey === key) {
      return this.lastValue;
    }

    this.lastKey = key;
    this.lastValue = this.languageService.translate(key);
    return this.lastValue;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
