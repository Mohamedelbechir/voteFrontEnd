import {
  Component,
  OnInit
} from '@angular/core';
import {
  VoteService
} from '../services/vote.service';
import {
  UtilisateurService
} from '../services/utilisateur.service';
import {
  Utilisateur
} from '../models/utilisateur';
import {
  Election
} from '../models/election';
import {
  ElectionService
} from '../services/election.service';
import {
  Vote
} from '../models/vote';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.scss']
})
export class ResultatComponent implements OnInit {
  candidats: Utilisateur[];
  currentElection: Election;
  nbTvote: number;
  ok = false;
  resultats = [];

  constructor(private electionService: ElectionService, private voteService: VoteService) {}

  ngOnInit() {

    this.chargement();

  }
  async chargement() {
    try {
      const elections = await this.electionService.getElections().toPromise();
      this.currentElection = elections[elections.length-1];
      this.candidats = this.currentElection.candidats;
      const votes = await this.voteService.getNbVoteElection(this.currentElection.id).toPromise();
      this.nbTvote = votes.length;
      this.candidats.forEach(async element => {
        try {
          let votes = await this.voteService.getNbVoteCandidat(element.id, this.currentElection.id).toPromise();
          this.resultats.push({
            candidat: element,
            nbVote: votes.length
          });
          this.resultats = this.resultats.sort((a, b) => (a.nbVote > b.nbVote) ? -1 : 1);
        } catch (error) {
          this.resultats.push({
            candidat: element,
            nbVote: 0
          });

          this.resultats = this.resultats.sort((a, b) => (a.nbVote > b.nbVote) ? -1 : 1);
        }

      });
      
     // console.log(  this.resultats);


      /* promiseElection( (elections: Election[])=>{
        this.currentElection = elections[0];  
        this.candidats = this.currentElection.candidats;
        this.voteService.getNbVoteElection(this.currentElection.id).subscribe(
          (res: Vote[]) =>{
              this.nbTvote = res.length;
              this.populateResultat();
             
          },
          error =>{ 
            this.nbTvote = 0;
            this.populateResultat();
            //this.ok = true;
          }
        );
      });  */
    } catch (error) {
      this.nbTvote = 0;
    }

  }
  populateResultat() {
    this.candidats.forEach(element => {
      this.voteService.getNbVoteCandidat(element.id, this.currentElection.id).subscribe(
        (rest: Vote[]) => {
          this.resultats.push({
            candidat: element,
            nbVote: rest.length
          });
        },
        error => {
          this.resultats.push({
            candidat: element,
            nbVote: 0
          });
        }
      )
    });
    this.resultats.sort((a, b) => (a.nbVote > b.nbVote) ? 1 : -1);

  }

}
