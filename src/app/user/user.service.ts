import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');
  private REST_API_URL = environment.protocol+"://"+environment.domain

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<any> {
    return this.http.get<any>(this.REST_API_URL+'/api/guest/user');
  }
}

