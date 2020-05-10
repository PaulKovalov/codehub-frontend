import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

interface AppConfig {
  apiUrl: string;
  googleTag: string;
  maxArticleLength: number;
  minArticleLength: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor(private injector: Injector) {
  }

  public loadAppConfig() {
    const http = this.injector.get(HttpClient);
    return http.get('./app-config.json').toPromise().then((appConfig: AppConfig) => {
      environment.apiUrl = appConfig.apiUrl;
      environment.googleTag = appConfig.googleTag;
      environment.minArticleLength = appConfig.minArticleLength;
      environment.maxArticleLength = appConfig.maxArticleLength;
    });
  }
}
