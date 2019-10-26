import {Injectable} from '@angular/core';
import {NavbarElement} from '../interfaces/navbar-element';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authTokenKey = 'auth-token';

  constructor() {
  }

  public isAuthorized(): boolean {
    return localStorage.getItem(this.authTokenKey) !== undefined && localStorage.getItem(this.authTokenKey) !== '';
  }

  public getAuthToken(): string {
    return localStorage.getItem(this.authTokenKey);
  }

  public setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  public getNavbarItems(): NavbarElement[] {
    if (this.isAuthorized()) {
      return [
        {
          title: 'articles',
          asset: null
        },
        {
          title: 'tutorials',
          asset: null
        },
        {
          title: 'my articles',
          asset: null
        },
        {
          title: 'my tutorials',
          asset: null
        },
        {
          title: 'search',
          asset: 'assets/img/search.png'
        }
      ];
    } else {
      return [
        {
          title: 'articles',
          asset: null
        },
        {
          title: 'tutorials',
          asset: null
        },
        {
          title: 'search',
          asset: 'assets/img/search.png'
        }
      ];
    }
  }
}
