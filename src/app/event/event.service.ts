import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');
  private REST_API_URL = environment.protocol+"://"+environment.domain;

  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get<any>(this.REST_API_URL+'/api/event');
  }

  public get(uuid): Observable<any>{
    return this.http.get<any>(this.REST_API_URL+'/api/event/'+ uuid);
  }

  public updateDescription(uuid, text): Observable<any> {
    return this.http.post(this.REST_API_URL+'/api/event/'+uuid+'/description', { text }, { headers: this.HTTP_HEADERS });
  }

  public updateOwner(uuid, ownerId): Observable<any> {
    return this.http.post(this.REST_API_URL+'/api/event/'+uuid+'/owner', { ownerId }, { headers: this.HTTP_HEADERS });
  }

  public updateStatus(uuid, status): Observable<any> {
    return this.http.post(this.REST_API_URL+'/api/event/'+uuid+'/status', { status }, { headers: this.HTTP_HEADERS });
  }

  public addComment(uuid, text): Observable<any> {
    return this.http.post(this.REST_API_URL+'/api/event/'+uuid+'/comment', { text }, { headers: this.HTTP_HEADERS });
  }

  public getMembers(uuid): Observable<any> {
    return this.http.get<any>(this.REST_API_URL+'/api/event/'+uuid+'/members');
  }

}


