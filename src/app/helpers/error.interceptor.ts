import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoginService } from '../login/login.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status) && this.loginService.getCurrentUser()) {
        // auto logout if 401 or 403 response returned from api
        console.error("Error is making 401 Unauthorized or 403 Forbidden...logging user out")
        this.loginService.logout();
      }else{
        console.error("Some other bullshit error")
      }

      // const error = (err && err.error && err.error.message) || err.statusText;
      // console.log(error);
      return throwError(err);
    }))
  }
}
