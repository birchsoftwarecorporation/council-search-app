import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../environments/environment';

import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');

  public redirectUrl = '';

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  @Output() getUserName: EventEmitter<string | null> = new EventEmitter();

  public getCurrentUser(): User | null {
    const userCookie = this.cookieService.get('user');
    const user: User = userCookie ? JSON.parse(userCookie) : null;

    if (user && user.access_token && user.refresh_token) {
      return user;
    }

    return null;
  }

  public login(username, password): Observable<User> {
    return this.http.post<User>(`${environment.BASE_URL}/api/login`, { username, password }, { headers: this.HTTP_HEADERS })
      .pipe(map(user => {
        if (user && user.access_token && user.refresh_token) {
          this.cookieService.set('user', JSON.stringify(user));

          this.getUserName.emit(user.username);
        }

        return user;
      }), catchError(err => {
        this.getUserName.emit(null);

        return throwError(err);
      }));
  }

  public logout(): void {
    this.cookieService.delete('user');
    this.getUserName.emit(null);
    this.router.navigate(['/login']);
  }

  public renewToken(): void {

  }
}
