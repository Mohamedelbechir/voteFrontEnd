import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utilisateur } from '../models/utilisateur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private entityUrl = environment.REST_API_URL +'candidats';
   
  

  constructor(private http: HttpClient) { }
  
  addCandidat(candidat: Utilisateur) : Observable<Utilisateur>{    
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8',"Access-Control-Allow-Origin":"*"}); 
    return this.http.post<Utilisateur>(this.entityUrl, candidat,{headers:headers});

  }
  getCandidats(){
    return this.http.get<Utilisateur[]>(this.entityUrl);
  }
  
}
