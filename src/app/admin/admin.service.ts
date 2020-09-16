import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Suggestion} from '../search/models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');
  private REST_API_URL = environment.protocol+"://"+environment.domain

  constructor(private http: HttpClient) { }

  public postContact(postData): Observable<any>{
    return this.http.post(this.REST_API_URL+'/api/guest/contact/', postData, { headers: this.HTTP_HEADERS });
  }

}
