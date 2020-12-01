import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private REST_API_URL = environment.protocol+"://"+environment.domain

  constructor(private http: HttpClient) { }

  public get(uuid): Observable<any>{
    return this.http.get<any>(this.REST_API_URL+'/api/guest/document/'+ uuid);
  }

  public pdf(uuid): Observable<Blob>{
    return this.http.get(this.REST_API_URL+'/api/guest/s3/download/'+ uuid, {
      responseType: 'blob'
    });
  }
}
