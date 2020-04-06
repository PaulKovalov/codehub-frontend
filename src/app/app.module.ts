import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FeedModule } from './feed/feed.module';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AccountsModule } from './accounts/accounts.module';
import { CookieService } from 'ngx-cookie-service';
import { AppConfigService } from './app-config.service';
import { CsrfInjector } from './accounts/csrf-injector.service';

/**
 * Runs before any other part of the application
 *
 * Uses AppConfigService to prepare environment
 */
const appEnvironmentFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    CookieService,
    AppConfigService,
    {provide: APP_INITIALIZER, useFactory: appEnvironmentFn, deps: [AppConfigService], multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CsrfInjector, multi: true},
  ],
  exports: [
    FeedModule,
    AccountsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
