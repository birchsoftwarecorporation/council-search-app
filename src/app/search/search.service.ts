import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Suggestion} from './models/suggestion';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public getSuggestions(word, count): Observable<Suggestion[]>{
    return this.http.get<Suggestion[]>(environment.BASE_URL+'/api/guest/suggest/'+ word +'/'+count);
  }

  public getSearchResults(postData): Observable<any> {
    return this.http.post(environment.BASE_URL+'/api/guest/search/', postData, { headers: this.HTTP_HEADERS });
  }
}
