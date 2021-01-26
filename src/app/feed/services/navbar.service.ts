import { Injectable } from '@angular/core';
import { NavbarElement } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountService } from '../../accounts/account.service';

const nonAuthenticatedNavbarSet: NavbarElement[] = [
  {
    title: 'home',
    routerLink: '/home'
  },
  {
    title: 'articles',
    routerLink: '/articles',
  },
  {
    title: 'tutorials',
    routerLink: '/tutorials',
  },
  {
    title: 'search',
    routerLink: '/search',
  }
];

const authenticatedNavbarSet: NavbarElement[] = [...nonAuthenticatedNavbarSet, ...[
  {
    title: 'profile',
    routerLink: '/profile/my-articles',
  },
]
];

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private navbarItemsSubject: BehaviorSubject<NavbarElement[]>;

  constructor(private accountService: AccountService) {
    this.navbarItemsSubject = new BehaviorSubject<NavbarElement[]>(nonAuthenticatedNavbarSet);
    this.accountService.isLoggedIn$().subscribe((loggedIn) => {
      if (loggedIn) {
        this.navbarItemsSubject.next(authenticatedNavbarSet);
      } else {
        this.navbarItemsSubject.next(nonAuthenticatedNavbarSet);
      }
    });
  }

  public navbarItems$(): Observable<NavbarElement[]> {
    return this.navbarItemsSubject.asObservable();
  }
}
