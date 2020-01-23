import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  Utilisateur
} from '../models/utilisateur';
import {
  CandidatService
} from '../services/candidat.service';
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  Subject
} from 'rxjs';
import {
  DataTableDirective
} from 'angular-datatables';
import {
  UtilisateurService
} from '../services/utilisateur.service';
import {
  Election
} from '../models/election';
import {
  ElectionService
} from '../services/election.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss']
})
export class CandidatComponent implements OnInit {
  @ViewChild(DataTableDirective, {
    static: false
  })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject < any > = new Subject()
  candidats: Utilisateur[];
  formCandidat: FormGroup;
  selectedSituation = "Selectionner Situation familiale";
  selectedElection: Election;
  elections: Election[];
  formAffecter: FormGroup;



  constructor(private utilisateurService: UtilisateurService, private electionService: ElectionService, private formBuilder: FormBuilder) {

    this.initFormulaire();
    //this.Utilisateurs = [];
  }
  initFormulaire() {
    this.formCandidat = this.formBuilder.group({
      adresse: [''],
      cin: ['', [Validators.required]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      date_naissance: ['', Validators.required],
      tel: ['', Validators.required],
      sexe: ['masculin', Validators.required],
      situation_familiale: ['', Validators.required],
      origine: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      type: ['canditat'],

    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  initDataTable(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      dom: 'Bfrtip',
      // buttons: [
      //   'print',
      //   'csv'
      // ],
      responsive: true,
      /* below is the relevant part, e.g. translated to spanish */
      language: {

        processing: "chargement...",
        search: "Rechercher:",
        lengthMenu: "Mostrar _MENU_ &eacute;l&eacute;ments",
        info: "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
        infoEmpty: "Information vide.",
        infoFiltered: "(filtré à partir de _MAX_ éléments au total)",
        infoPostFix: "",
        loadingRecords: "Chargement...",
        zeroRecords: "Aucune donnée à afficher",
        emptyTable: "Liste vide",
        paginate: {
          first: "Premier",
          previous: "Dernier",
          next: "Suivant",
          last: "Précédent"
        },
        aria: {
          sortAscending: ":  activer pour trier la colonne par ordre croissant",
          sortDescending: ": activer pour trier la colonne par ordre décroissant"
        }
      }
    };
  }
  ngOnInit(): void {
    this.initDataTable();
    this.utilisateurService.getUtilisateur().subscribe((data: Utilisateur[]) => {
        this.candidats = data.filter((item) => item.type === 'candidat');

        //this.tableDataIsLoaded = true;
        this.dtTrigger.next();
        console.log(this.candidats);

      },
      (error) => console.log(error)
    );
      /**
       * Charger la liste des elections 
       */
      this.electionService.getElections().subscribe((data: Election[])=>{
        this.elections = data;
       
      },
      (error) =>{
          console.log(error);
          
      });

  }
  onClickPart(idCandidat: number){
    console.log(idCandidat);
    /** 
     * Créer un formulaire  
     * 
    */
   if(this.elections !=null){
  
      this.selectedElection = this.elections[0];
      this.formAffecter = this.formBuilder.group({
        idCandidat:[idCandidat],
        election: ['', [Validators.required]],
      });
      document.getElementById("openModalButton").click();
   }
  }
  
  onSubmitParticiper(){
    let utilisateur =  this.candidats.find(item => item.id == this.formAffecter.value.idCandidat);
    //utilisateur.elections = [this.selectedElection];
    this.selectedElection.candidats.push(utilisateur)
    this.electionService.update(this.selectedElection.id.toString(), this.selectedElection).subscribe(
      (res:Election) => {
        console.log(res.candidats);
        this.showNotify('Candidat affecté à l\'élection avec succès!');
      },
      error => {
        console.log(error);
        
      }
    );
  
  }
  onSubmit(candidat: Utilisateur) {


    // candidat.date_naissance = moment(candidat.date_naissance).format('yyyy-MM-dd');
    console.log(candidat.date_naissance);

    this.utilisateurService.add(candidat).subscribe((data: Utilisateur) => {

        this.candidats.push(data);
        this.showNotify('Candidat ajouté avec succès!');
        this.formCandidat.reset();
        this.rerender();

      },
      (error) => console.log(error)

    );

  }
  showNotify(message) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    Toast.fire({
      icon: 'success',
      title: message,
    });
  }
  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formCandidat.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        //this.cd.markForCheck();
      };
    }
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
