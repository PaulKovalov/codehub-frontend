import { Injectable } from '@angular/core';
import { NavbarElement } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

const profileNavbarSet: NavbarElement[] = [
  {
    title: 'home',
    routerLink: '/home'
  },
  {
    title: 'my articles',
    routerLink: '/profile/my-articles'
  },
  {
    title: 'my tutorials',
    routerLink: '/profile/my-tutorials',
  },
  {
    title: 'settings',
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
