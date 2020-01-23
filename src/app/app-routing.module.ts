import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PlanifierElectionComponent } from './planifier-election/planifier-election.component';
import { CandidatComponent } from './candidat/candidat.component';
import { CandidatElectComponent } from './candidat-elect/candidat-elect.component';
import { VoteComponent } from './vote/vote.component';
import { ElecteurComponent } from './electeur/electeur.component';
import { AuthUtilisateurComponent } from './auth-utilisateur/auth-utilisateur.component';
import { AuthGuard } from './services/AuthGuard';
import { ResultatComponent } from './resultat/resultat.component';


const routes: Routes = [
  {path:'', component: HomePageComponent},
  {path:'home', component: HomePageComponent},
  {path:'election', component: PlanifierElectionComponent},
  {path:'candidats', component: CandidatComponent},
  {path:'electeurs', component: ElecteurComponent},
  {path:'candidats-elect', component: CandidatElectComponent},
  {path:'vote', canActivate: [AuthGuard], component: VoteComponent},
  {path:'resultats', component: ResultatComponent},
  {path:'login-user', component: AuthUtilisateurComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
