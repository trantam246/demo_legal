import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService, Language } from './services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  currentLanguage: Language;
  languages: Language[];
  private subscription: Subscription;

  constructor(private languageService: LanguageService) {
    this.languages = this.languageService.getLanguages();
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  ngOnInit() {
    this.subscription = this.languageService.currentLanguage$.subscribe(
      (language) => {
        this.currentLanguage = language;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  switchLanguage(languageCode: string) {
    this.languageService.setLanguage(languageCode);
  }
}
