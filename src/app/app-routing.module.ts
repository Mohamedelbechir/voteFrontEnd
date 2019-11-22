import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PlanifierElectionComponent } from './planifier-election/planifier-election.component';
import { CandidatComponent } from './candidat/candidat.component';


const routes: Routes = [
  {path:'', component: HomePageComponent},
  {path:'home', component: HomePageComponent},
  {path:'election', component: PlanifierElectionComponent},
  {path:'candidats', component: CandidatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
