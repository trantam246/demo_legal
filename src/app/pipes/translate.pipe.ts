import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';
import isEqual from 'lodash/isEqual';
import { Subscription } from 'rxjs';
import {
  InterpolationParams,
  LangChangeEvent,
  LanguageService,
} from '../services/language.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private subscription: Subscription;
  private lastKey: string;
  private lastParams: InterpolationParams | undefined;
  private lastValue: string;

  constructor(
    private languageService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {
    this.subscription = this.languageService.onLangChange$.subscribe(
      (event: LangChangeEvent) => {
        // Reset cache when language changes
        this.lastKey = '';
        this.lastParams = undefined;
        this.lastValue = '';
        this.cdr.markForCheck();
      }
    );
  }

  transform(key: string, interpolateParams?: InterpolationParams): string {
    if (!key) return '';

    // Simple caching to improve performance
    if (
      this.lastKey === key &&
      isEqual(this.lastParams, interpolateParams) // ✅ Lodash isEqual
    ) {
      return this.lastValue;
    }

    this.lastKey = key;
    this.lastParams = interpolateParams;
    this.lastValue = this.languageService.instant(key, interpolateParams);
    return this.lastValue;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
