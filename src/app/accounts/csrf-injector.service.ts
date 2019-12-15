import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {flatMap} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {doApiUrl} from '../shared/Utils';

@Injectable()
export class CsrfInjector implements HttpInterceptor {

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return next.handle(req);
    } else if (this.cookieService.check('csrftoken')) {
      const token = this.cookieService.get('csrftoken');
      const newReq = this.updateReq(token, req);
      return next.handle(newReq);
    } else {
      return this.getCsrfToken().pipe(flatMap((resp) => {
        const token = resp.headers.get('csrftoken');
        if (token !== undefined && token !== null) {
          this.cookieService.set('csrftoken', token);
          const newReq = this.updateReq(token, req);
          return next.handle(newReq);
        } else {
          return next.handle(req);
        }
      }));
    }
  }

  private getCsrfToken() {
    return this.http.get(doApiUrl('get-csrf'), {observe: 'response'});
  }

  private updateReq(token: string, req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      headers: new HttpHeaders({
        'X-CSRFToken': token,
      })
    });
  }
}

