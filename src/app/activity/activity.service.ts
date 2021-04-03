import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public save(data): Observable<any> {
    return this.http.post(environment.BASE_URL+'/api/guest/activity', data, { headers: this.HTTP_HEADERS });
  }
}
