import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorService } from './services/interceptor.service';
// FYI - https://github.com/angular/components/issues/17503
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

// Council Search app
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { DocumentComponent } from './document/document.component';
import { ContactComponent } from './contact/contact.component';
import { BetasignupComponent } from './betasignup/betasignup.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './services/auth-guard.service';
import { AlertModule } from './alert/alert.module';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    DocumentComponent,
    ContactComponent,
    BetasignupComponent,
    ThankyouComponent,
    AlertModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ToastrModule.forRoot()
  ],
  exports: [ // FYI - https://stackoverflow.com/questions/60221876/angular-material-not-working-in-angular-version-9
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
