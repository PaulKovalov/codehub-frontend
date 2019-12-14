import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountService} from './account.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestInterceptorService implements HttpInterceptor {

  constructor(private authService: AccountService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthorized()) {
      return next.handle(req.clone({
        setHeaders: {Authorization: environment.authPrefix + this.authService.getAuthToken()}
      }));
    } else {
      return next.handle(req);
    }
  }
}
