import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Candidat } from '../models/candidat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private entityUrl = environment.REST_API_URL +'candidats';
   
  

  constructor(private http: HttpClient) { }
  
  addCandidat(candidat: Candidat) : Observable<Candidat>{    
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8',"Access-Control-Allow-Origin":"*"}); 
    return this.http.post<Candidat>(this.entityUrl, candidat,{headers:headers});

  }
  getElections(){
    return this.http.get<Candidat[]>(this.entityUrl);
  }
}
