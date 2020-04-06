import { Injectable } from '@angular/core';
import { NavbarElement } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountService } from '../../accounts/account.service';

const nonAuthenticatedNavbarSet: NavbarElement[] = [
  {
    title: 'articles',
    asset: null,
    routerLink: '/articles',
  },
  {
    title: 'tutorials',
    asset: null,
    routerLink: '',
  },
  {
    title: 'search',
    asset: 'assets/img/search.png',
    routerLink: '',
  }
];

const authenticatedNavbarSet: NavbarElement[] = [...nonAuthenticatedNavbarSet, ...[
  {
    title: 'profile',
    asset: null,
    routerLink: '/profile',
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
