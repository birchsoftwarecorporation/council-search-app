import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL+'/api/user');
  }
}

