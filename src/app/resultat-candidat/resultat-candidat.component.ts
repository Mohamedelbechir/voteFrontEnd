import { Component, OnInit, Input } from '@angular/core';
import { Election } from '../models/election';
import { Utilisateur } from '../models/utilisateur';
import { VoteService } from '../services/vote.service';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-resultat-candidat',
  templateUrl: './resultat-candidat.component.html',
  styleUrls: ['./resultat-candidat.component.scss']
})
export class ResultatCandidatComponent implements OnInit {
  @Input() currentElection: Election;
  @Input() candidat: Utilisateur;
  @Input() rang: number;
  @Input() nbTVote: number;
  @Input() nbVoteC: number;
  pourcentage: string;
  

  constructor(private voteService: VoteService, private utilisateurService: UtilisateurService,) { }

  ngOnInit() {
    this.pourcentage = (( this.nbVoteC / this.nbTVote ) * 100).toFixed(1);

  }
  getHeight(){
    return ((this.nbVoteC/this.nbTVote) *15) +'rem';
  }

}
