import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL+'/api/alert');
  }

  public create(postData): Observable<any> {
    return this.http.post(environment.BASE_URL+'/api/alert/', postData, { headers: this.HTTP_HEADERS });
  }

  public delete(id): Observable<any> {
    return this.http.delete(environment.BASE_URL+'/api/alert/'+id);
  }

  public process(id): Observable<any> {
    return this.http.get(environment.BASE_URL+'/api/alert/process/'+id);
  }
}
