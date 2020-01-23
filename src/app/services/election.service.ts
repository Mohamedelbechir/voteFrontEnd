import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Election } from '../models/election';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {
  private entityUrl = environment.REST_API_URL +'elections';
   
  

  constructor(private http: HttpClient) { }
  addElection(election: Election) : Observable<Election>{    
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8',"Access-Control-Allow-Origin":"*"}); 
    return this.http.post<Election>(this.entityUrl, election,{headers:headers});

  }
  update(id: string, election: Election): Observable<Election> {
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8',"Access-Control-Allow-Origin":"*"}); 

    return this.http.put<Election>(this.entityUrl + '/' + id, election,{headers:headers});     
  }
  getElections(){
    return this.http.get<Election[]>(this.entityUrl);
  }
}
