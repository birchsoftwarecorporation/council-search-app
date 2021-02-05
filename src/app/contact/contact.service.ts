import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public postContact(postData): Observable<any>{
    return this.http.post(environment.BASE_URL+'/api/guest/contact/', postData, { headers: this.HTTP_HEADERS });
  }

}

