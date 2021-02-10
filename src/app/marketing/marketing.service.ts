import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketingService {

  constructor(private http: HttpClient) { }

  // // get "/api/match/${state}/${template}/${count}" (controller:"match", action:"list")
  public matches(stateAbbr, template, count): Observable<any>{
    return this.http.get<any>(environment.BASE_URL+'/api/guest/match/'+ stateAbbr +'/'+ template + '/'+ count);
  }
}
