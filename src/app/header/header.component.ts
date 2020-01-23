import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../models/utilisateur';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: Utilisateur;


  constructor(private utilisateurService: UtilisateurService ) { } 

  ngOnInit() {
    this.utilisateurService.currentUserSubject.subscribe(
      (user: Utilisateur) =>{
        this.currentUser = user;
      }
    )
  }
  logOut(){
    this.utilisateurService.logOut();
  } 
}
