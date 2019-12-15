import {Injectable} from '@angular/core';
import {BaseUserData, UserData} from '../interfaces/user-data';
import {HttpClient} from '@angular/common/http';
import {doApiUrl} from '../shared/Utils';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private authTokenKey = 'auth-token';

  constructor(private http: HttpClient) {
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

  public registerUser(user: UserData) {
    const data = {
      username: user.username,
      email: user.email,
      password: user.password,
      confirm_password: user.confirmPassword,
    };
    return this.http.post(doApiUrl('accounts/register'), data);
  }

  public loginUser(user: BaseUserData) {
    return this.http.post(doApiUrl('accounts/login'), user);
  }
}
