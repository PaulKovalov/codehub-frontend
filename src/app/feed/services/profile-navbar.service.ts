import { Injectable } from '@angular/core';
import { NavbarElement } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

const profileNavbarSet: NavbarElement[] = [
  {
    title: 'home',
    asset: null,
    routerLink: '/home'
  },
  {
    title: 'my articles',
    asset: null,
    routerLink: '/profile/my-articles'
  },
  {
    title: 'my tutorials',
    asset: null,
    routerLink: '/profile/my-tutorials',
  },
  {
    title: 'settings',
    asset: null,
    routerLink: '/profile/settings',
  },
];

@Injectable({
  providedIn: 'root'
})
export class ProfileNavbarService {
  private navbarItemsSubject: BehaviorSubject<NavbarElement[]>;

  constructor() {
    this.navbarItemsSubject = new BehaviorSubject<NavbarElement[]>(profileNavbarSet);
  }

  public navbarItems$(): Observable<NavbarElement[]> {
    return this.navbarItemsSubject.asObservable();
  }
}
