import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../../shared/utils';
import { NotificationSettings } from '../interfaces';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../accounts/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) {
  }

  public updateNotificationSettings(data: NotificationSettings) {
    if (data.id) {
      return this.http.patch(Utils.doApiUrl(`accounts/me/notifications/${data.id}/`), data);
    }
  }

  public updateUsername(newUsername: string) {
    const data = {
      username: newUsername
    };
    return this.http.patch(Utils.doApiUrl('accounts/me/'), data);
  }

  public getNotificationSettings(): Observable<NotificationSettings> {
    return this.http.get<NotificationSettings>(Utils.doApiUrl('accounts/me/notifications/')).pipe(map(data => {
        if (data) {
          return data[0];
        }
        return null;
      }), catchError(err => null)
    );
  }

  public updateAvatar(avatarBase64: string): Observable<User> {
    const data = {
      avatar: avatarBase64
    };
    return this.http.patch<User>(Utils.doApiUrl('accounts/me/'), data);
  }
}
