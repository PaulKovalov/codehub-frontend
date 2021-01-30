import { Component, Injector, OnDestroy } from '@angular/core';
import { NavbarElement } from '../interfaces';
import { NAVBAR_SERVICE_TOKEN, PROFILE_NAVBAR_SERVICE_TOKEN } from '../services/injection-tokens';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnDestroy {

  public navbarItems: NavbarElement[];
  public navbarOpened = false;
  private navbarService;
  private routeChangesSubscription;

  constructor(private injector: Injector, private router: Router) {
    this.routeChangesSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      if (this.router.url.startsWith('/profile')) {
        this.navbarService = this.injector.get(PROFILE_NAVBAR_SERVICE_TOKEN);
      } else {
        this.navbarService = this.injector.get(NAVBAR_SERVICE_TOKEN);
      }
      this.navbarService.navbarItems$().subscribe((items) => {
        this.navbarItems = items;
      });
    });
  }

  public outsideClickHandler() {
    if (this.navbarOpened) {
      this.navbarOpened = !this.navbarOpened;
    }
  }

  ngOnDestroy() {
    this.routeChangesSubscription.unsubscribe();
  }

  get menuIcon() {
    return this.navbarOpened ? 'menu_opened' : 'menu';
  }
}
