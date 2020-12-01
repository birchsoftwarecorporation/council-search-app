import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');
  private REST_API_URL = environment.protocol+"://"+environment.domain

  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get<any>(this.REST_API_URL+'/api/alert');
  }

  public create(postData): Observable<any> {
    return this.http.post(this.REST_API_URL+'/api/alert/', postData, { headers: this.HTTP_HEADERS });
  }

  public delete(id): Observable<any> {
    return this.http.delete(this.REST_API_URL+'/api/alert/'+id);
  }

  public process(id): Observable<any> {
    return this.http.get(this.REST_API_URL+'/api/alert/process/'+id);
  }
}
