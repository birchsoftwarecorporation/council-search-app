import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL+'/api/guest/state');
  }

}
