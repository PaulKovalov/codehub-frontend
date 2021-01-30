import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {
  private currentTheme: string;

  constructor(private cookieService: CookieService) {
    const currentTheme = this.cookieService.get('theme');
    if (currentTheme && currentTheme === 'dark') {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  public get darkModeEnabled() {
    return this.currentTheme === 'dark';
  }

  public setTheme(theme: string): void {
    this.currentTheme = theme;
    let linkEl = document.querySelector(`link[rel=stylesheet].theme-picker`);
    if (!linkEl) {
      linkEl = this.createLinkElement();
    }
    linkEl.setAttribute('href', this.urlForTheme(theme));
    this.cookieService.set('theme', theme, {expires: 365, path: '/'});
  }

  public toggleTheme(): void {
    if (this.currentTheme && this.currentTheme === 'dark') {
      this.setTheme('light');
    } else {
      this.setTheme('dark');
    }
  }

  private urlForTheme(theme: string) {
    return `assets/${theme}.css`;
  }

  private createLinkElement(): Element {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add('theme-picker');
    document.head.appendChild(linkEl);
    return linkEl;
  }
}
