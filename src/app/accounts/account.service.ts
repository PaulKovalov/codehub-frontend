import { Injectable } from '@angular/core';
import { BaseUserData, User, UserData } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../shared/utils';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private user$ = new BehaviorSubject<User | null>(null);
  private isAuthenticated$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.updateAuthState();
  }

  public registerUser(user: UserData) {
    const data = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    return this.http.post(Utils.doApiUrl('accounts/'), data);
  }

  public login(user: BaseUserData) {
    return this.http.post(Utils.doApiUrl('accounts/login/'), user);
  }

  public logout() {
    return this.http.get(Utils.doApiUrl('accounts/logout/'));
  }

  public isLoggedIn$(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  public getCurrentUser$(): Observable<User> {
    return this.user$.asObservable().pipe(filter((user: User) => user !== null));
  }

  public updateAuthState() {
    this.http.get<User>(Utils.doApiUrl('accounts/me/')).subscribe((user) => {
      this.user$.next(user);
      this.isAuthenticated$.next(user !== null);
    }, (error) => {
      this.user$.next(null);
      this.isAuthenticated$.next(false);
    });
  }
}
