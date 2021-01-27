import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { DarkModeService } from './dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private gtmService: GoogleTagManagerService, private darkModeService: DarkModeService) {
    if (gtmService.googleTagManagerId) {
      router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        const gtmTag = {
          event: 'page',
          pageName: event.urlAfterRedirects
        };
        gtmService.pushTag(gtmTag);
      });
    }
  }
}
