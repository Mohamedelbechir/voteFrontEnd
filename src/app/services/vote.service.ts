import {
  Injectable
} from '@angular/core';
import {
  environment
} from 'src/environments/environment';
import {
  Vote
} from '../models/vote';
import {
  Observable
} from 'rxjs';
import {
  HttpHeaders,
  HttpClient
} from '@angular/common/http';
import {
  UtilisateurService
} from './utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private entityUrl = environment.REST_API_URL + 'votes';

  constructor(private http: HttpClient, private utilisateurService: UtilisateurService) {}

  add(vote: Vote): Observable < Vote > {
    console.log(vote);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      "Access-Control-Allow-Origin": "*"
    });

    return this.http.post < Vote > (this.entityUrl, vote, {
      headers: headers
    });

  }
  getVoteByIdElecteurByIdElection(idElecteur: number, idElection: number) {

    return this.http.get < Vote > (this.entityUrl + '/' + idElecteur + '/' + idElection);
  }
  getNbVoteCandidat(idCant: number, idEl: number) {
    return this.http.get < Vote[] > (this.entityUrl + '/resultat/' + idCant + '/' + idEl)
  }
  getNbVoteElection(idEl: number) {
    return this.http.get < Vote[] > (this.entityUrl + '/nbvote/election/' + idEl)
  }
}
