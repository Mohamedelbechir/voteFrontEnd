import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElecteurService {
  private entityUrl = environment.REST_API_URL +'candidats';
   
  

  constructor(private http: HttpClient) { }
  
  addCandidat(electeur: Utilisateur) : Observable<Utilisateur>{    
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8',"Access-Control-Allow-Origin":"*"}); 
    return this.http.post<Utilisateur>(this.entityUrl, electeur,{headers:headers});

  }
  getCandidats(){
    return this.http.get<Utilisateur[]>(this.entityUrl);
  }
}
