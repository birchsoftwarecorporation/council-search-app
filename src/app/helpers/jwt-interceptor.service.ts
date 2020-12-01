import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  private REST_API_URL = environment.protocol+"://"+environment.domain

  constructor(private loginService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const user = this.loginService.getCurrentUser();
    const isLoggedIn = user && user.access_token;
    const isApiUrl = request.url.startsWith(this.REST_API_URL);

    if (isLoggedIn && isApiUrl) {
      console.log("User logged in");
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${user.access_token}` }
      });
    }else{
      console.log("Not logged in");
    }

    return next.handle(request);
  }

}
