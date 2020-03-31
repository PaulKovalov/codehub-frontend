import { Injectable } from '@angular/core';
import { BaseUserData, User, UserData } from '../interfaces/user-data';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../shared/utils';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private user$ = new BehaviorSubject<User | null>(null);
  private isAuthenticated$ = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient) {
    this.http.get<User>(Utils.doApiUrl('accounts/me/')).subscribe((user) => {
      this.user$.next(user);
      this.isAuthenticated$.next(user !== null);
    });
  }

  public registerUser(user: UserData) {
    const data = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    return this.http.post(Utils.doApiUrl('accounts/'), data);
  }

  public loginUser(user: BaseUserData) {
    return this.http.post(Utils.doApiUrl('accounts/login/'), user);
  }

  public isLoggedIn$(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  public getCurrentUser$(): Observable<User> {
    return this.user$.asObservable().pipe(filter((user: User) => user !== null));
  }
}
