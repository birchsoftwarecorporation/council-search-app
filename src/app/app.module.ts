import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptorService } from './helpers/jwt-interceptor.service';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AuthGuard } from './helpers/auth-guard.service';

import { AlertModule } from './alert/alert.module';
import { ContactModule } from './contact/contact.module';
import { DocumentModule } from './document/document.module';
import { EventModule } from './event/event.module';
import { MarketingModule } from './marketing/marketing.module';
// import { HelpersModule } from './helpers/helpers.module';

import { LoginModule } from './login/login.module';
import { SearchModule } from './search/search.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AlertModule,
    ContactModule,
    DocumentModule,
    EventModule,
    LoginModule,
    MarketingModule,
    // HelpersModule,
    SearchModule
  ],
  exports: [ // FYI - https://stackoverflow.com/questions/60221876/angular-material-not-working-in-angular-version-9
    // MatAutocompleteModule,
    // MatInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    CookieService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
