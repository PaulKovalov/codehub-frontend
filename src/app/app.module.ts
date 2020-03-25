import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HomeModule} from './home/home.module';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AccountsModule} from './accounts/accounts.module';
import {CookieService} from 'ngx-cookie-service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    CookieService,
  ],
  exports: [
    HomeModule,
    AccountsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
