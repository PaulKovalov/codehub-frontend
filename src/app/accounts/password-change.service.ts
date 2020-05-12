import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeService {
  private email: string;
  private requestId: string;

  constructor(private http: HttpClient) {
    this.email = '';
  }

  public getEmail() {
    return this.email;
  }

  public setRequestId(requestId: string) {
    this.requestId = requestId;
  }

  public sendNewPassword(newPassword: string) {
    const data = {
      request_id: this.requestId,
      password: newPassword
    };
    return this.http.post(Utils.doApiUrl('accounts/set-new-password/'), data);
  }

  public requestPasswordChange(email: string) {
    this.email = email;
    return this.http.post(Utils.doApiUrl(`accounts/request-password-change/?email=${encodeURIComponent(email)}`), {});
  }
}
