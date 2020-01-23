import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IntroComponent } from './intro/intro.component';
import { ContactComponent } from './contact/contact.component';
import { GaleryComponent } from './galery/galery.component';
import { IsieComponent } from './isie/isie.component';
import { AboutComponent } from './about/about.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PlanifierElectionComponent } from './planifier-election/planifier-election.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ElectionService } from './services/election.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { CandidatComponent } from './candidat/candidat.component';
import { CandidatElectComponent } from './candidat-elect/candidat-elect.component';
import { VoteComponent } from './vote/vote.component';
import { ElecteurComponent } from './electeur/electeur.component';
import { AuthUtilisateurComponent } from './auth-utilisateur/auth-utilisateur.component';
import { AuthGuard } from './services/AuthGuard';
import { ResultatComponent } from './resultat/resultat.component';
import { ResultatCandidatComponent } from './resultat-candidat/resultat-candidat.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IntroComponent,
    ContactComponent,
    GaleryComponent,
    IsieComponent,
    AboutComponent,
    NewsletterComponent,
    HeaderAdminComponent,
    HomePageComponent,
    PlanifierElectionComponent,
    CandidatComponent,
    CandidatElectComponent,
    VoteComponent,
    ElecteurComponent,
    AuthUtilisateurComponent,
    ResultatComponent,
    ResultatCandidatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
      AppRoutingModule,
    DataTablesModule,
    FormsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
      OwlNativeDateTimeModule,
    SweetAlert2Module,
    ReactiveFormsModule

  ],
  providers: [AppComponent, ElectionService, { provide: OWL_DATE_TIME_LOCALE, useValue: 'fr' }, AuthGuard,],
  bootstrap: [AppComponent]
})
export class AppModule { }
