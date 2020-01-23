import { Component, OnInit } from '@angular/core';
import { CandidatService } from '../services/candidat.service';
import { Utilisateur } from '../models/utilisateur';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from '../services/utilisateur.service';
import { ElectionService } from '../services/election.service';
import { Election } from '../models/election';
import { Vote } from '../models/vote';
import { VoteService } from '../services/vote.service';

import * as moment from 'moment';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  candidats: Utilisateur[];
  formVote: FormGroup;
  currentElection: Election;
  dejaVote = false;
  laoding = true;
  outDate = false;

  constructor(private utilisateurService: UtilisateurService, 
    private voteService: VoteService,
    private electionService: ElectionService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.initFormulaire();
    /*this.utilisateurService.getUtilisateur().subscribe((data)=>{
      this.candidats = data;

    },
    (error) => console.log(error)
    ); */
    // recuper la première election
    this.electionService.getElections().subscribe(
     (elections: Election[]) => {
      
        this.currentElection = elections[elections.length-1];
        if(this.currentElection.dateFin > Date()){
          this.outDate =true;
        }
        this.candidats = this.currentElection.candidats;
        // verifier si electeur a d"jà voter
        
        this.voteService.getVoteByIdElecteurByIdElection(this.utilisateurService.currentUserValue.id,
          this.currentElection.id).subscribe(
            (res: Vote) => {
              // deja voter
              this.dejaVote = true;
              this.laoding = false;
            },
            error => {
              console.log(error.status);
              this.dejaVote = false;
              this.laoding = false;
            }
          )
     },
     (error) => {console.log(error);}
     
    )
    
  }
  initFormulaire() {
    this.formVote = this.formBuilder.group({    
      vote: ['', [Validators.required]],
    });
  }
  onSubmit(form){
    console.log(form.value);
    const vote : Vote = {
      id: null,
      idElecteur: this.utilisateurService.currentUserValue.id,
      idCandidat: form.value.vote,
      idElection: this.currentElection.id,
      date: null
    }

    this.voteService.add(vote).subscribe(
      (res: Vote) => {
        console.log('vote réaliser avec succes');
        this.dejaVote = true;
        
      },
      error => {console.log(error);
      }
    )

  }
}
