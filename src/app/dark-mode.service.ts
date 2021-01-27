import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkModeEnabled = false;

  constructor(private cookieService: CookieService) {
    const dmPreference = this.cookieService.get('dm');
    if (dmPreference && dmPreference === 'true') {
      this.enableDarkMode();
    }
  }

  public get enabled() {
    return this.darkModeEnabled;
  }

  public toggleMode() {
    if (this.darkModeEnabled) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  private enableDarkMode() {
    const appRoot = document.getElementsByTagName('app-root')[0];
    appRoot.classList.add('dark-theme');
    this.darkModeEnabled = true;
    this.cookieService.set('dm', String(this.darkModeEnabled), {sameSite: 'Strict'});
    this.cookieService.set('dm', String(this.darkModeEnabled));
  }

  private disableDarkMode() {
    const appRoot = document.getElementsByTagName('app-root')[0];
    appRoot.classList.remove('dark-theme');
    this.darkModeEnabled = false;
    this.cookieService.set('dm', String(this.darkModeEnabled));
  }
}
