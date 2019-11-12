import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  DataTableDirective
} from 'angular-datatables';

import {
  DateTimeAdapter
} from 'ng-pick-datetime';
import {
  NgForm
} from '@angular/forms';
import {
  ElectionService
} from '../services/election.service';
import {
  Election
} from '../models/election';

import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare var $;

@Component({
  selector: 'app-planifier-election',
  templateUrl: './planifier-election.component.html',
  styleUrls: ['./planifier-election.component.scss']
})
export class PlanifierElectionComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  elections: Election[];
  tableDataIsLoaded: boolean = false;

  //electionService: ElectionService;

  //dt2 = new Date();
  constructor(dateTimeAdapter: DateTimeAdapter < any > , private electionService: ElectionService) {
    dateTimeAdapter.setLocale('fr-FR'); // change locale to Japanese

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
        this.tableDataIsLoaded = true;

      },
      (error) => console.log(error)
    );
  }
  onSubmit(election: Election) {
    //console.log(election);
    election.dateDebut = moment(election.dateDebut).format('YYYY/MM/DD HH:mm:ss');
    election.dateFin = moment(election.dateFin).format('YYYY/MM/DD HH:mm:ss');

    this.electionService.addElection(election).subscribe((data: Election) => {

        console.log('election planifiée');

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

      },
      (error) => console.log(error)

    );

  }
}
