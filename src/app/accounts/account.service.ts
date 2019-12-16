import {Injectable} from '@angular/core';
import {BaseUserData, User, UserData} from '../interfaces/user-data';
import {HttpClient} from '@angular/common/http';
import {doApiUrl} from '../shared/Utils';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor(private http: HttpClient) {
  }

  public registerUser(user: UserData) {
    const data = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    console.log(doApiUrl('accounts/'));
    return this.http.post(doApiUrl('accounts/'), data);
  }

  public loginUser(user: BaseUserData) {
    return this.http.post(doApiUrl('accounts/login/'), user);
  }

  public me(): Observable<User> {
    return this.http.get<User>(doApiUrl('accounts/me/'));
  }
}
