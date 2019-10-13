import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
}
