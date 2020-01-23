import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import {
  DataTableDirective
} from 'angular-datatables';

import {
  DateTimeAdapter
} from 'ng-pick-datetime';
import {
  NgForm, FormGroup, FormBuilder, Validators
} from '@angular/forms';
import {
  ElectionService
} from '../services/election.service';
import {
  Election
} from '../models/election';

import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subject } from 'rxjs';
//declare var $;

@Component({
  selector: 'app-planifier-election',
  templateUrl: './planifier-election.component.html',
  styleUrls: ['./planifier-election.component.scss']
})
export class PlanifierElectionComponent implements OnDestroy,OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  elections: Election[];
  //tableDataIsLoaded: boolean = false;
  formPlan: FormGroup;

  //electionService: ElectionService;

  //dt2 = new Date();
  constructor(private dateTimeAdapter: DateTimeAdapter < any > , private electionService: ElectionService, private formBuilder: FormBuilder) {
   // dateTimeAdapter.setLocale('de'); // change locale to Japanese

    this.formPlan = this.formBuilder.group({
      libele: ['',Validators.required],
      dateDebut: ['',Validators.required],
      dateFin: ['',Validators.required],
      type: ['presidentielle',Validators.required],
    });
  }
  ngOnInit(): void {

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
    this.electionService.getElections().subscribe((data: Election[]) => {
        this.elections = data;
      
          //this.tableDataIsLoaded = true;
        
          this.dtTrigger.next();
          console.log('la première election comprend'+ data[0].candidats.length+"candidats");
          
        
      },
      (error) => console.log(error)
    );
  }
  onSubmit(election: Election) {
  
    election.dateDebut = moment(election.dateDebut).format('YYYY/MM/DD HH:mm:ss');
    election.dateFin = moment(election.dateFin).format('YYYY/MM/DD HH:mm:ss');
    
    this.electionService.addElection(election).subscribe((data: Election) => {
     
        this.elections.push(data);
        this.showNotify();        
        this.formPlan.reset();
        this.rerender();
      },
      (error) => console.log(error)

    );

  }
  showNotify() {
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
      title: 'Election planifié avec success!'
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
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
