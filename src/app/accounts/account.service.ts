import {Injectable} from '@angular/core';
import {BaseUserData, UserData} from '../interfaces/user-data';
import {HttpClient} from '@angular/common/http';
import {doApiUrl} from '../shared/Utils';

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
    return this.http.post(doApiUrl('accounts/'), data);
  }

  public loginUser(user: BaseUserData) {
    return this.http.post(doApiUrl('accounts/login/'), user);
  }

  public me() {
    return this.http.get(doApiUrl('accounts/me/'));
  }
}
