import { Component, OnInit } from '@angular/core';
import {
  Utilisateur
} from '../models/utilisateur';
import { CandidatService } from '../services/candidat.service';

import * as moment from 'moment';
import { UtilisateurService } from '../services/utilisateur.service';
@Component({
  selector: 'app-candidat-elect',
  templateUrl: './candidat-elect.component.html',
  styleUrls: ['./candidat-elect.component.scss']
})
export class CandidatElectComponent implements OnInit {
  candidats: Utilisateur[];

  constructor(private utilisateurService: UtilisateurService) {

   }

  ngOnInit() {
    
    this.utilisateurService.getUtilisateur().subscribe((data: Utilisateur[]) => {
      console.log(data);
      this.candidats = data;      
    },
    (error) => console.log(error)
  );
  }
  getAge (dateNaiss: string) {
      return moment().diff(dateNaiss,'years');
  } 
  getGenre(sexe: string): string{
    if(sexe === 'masculin')
      return 'Homme';
    else
      return 'Femme';

  }
}
