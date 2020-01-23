import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../models/utilisateur';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-electeur',
  templateUrl: './electeur.component.html',
  styleUrls: ['./electeur.component.scss']
})
export class ElecteurComponent implements OnInit {
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject()
  formElecteur: FormGroup;
  electeurs: Utilisateur[];

  constructor(private utilisateurService: UtilisateurService, private formBuilder: FormBuilder) {
    this.initFormulaire();
  }
  


  ngOnInit() {
    this.initDataTable();
    this.utilisateurService.getUtilisateur().subscribe((data: Utilisateur[]) => {
      this.electeurs = data.filter((item,index,items) => item.type=='electeur');
    
        //this.tableDataIsLoaded = true;
        this.dtTrigger.next();
      
    },
    (error) => console.log(error)
  );
  }
  initDataTable():void {
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
  initFormulaire() {
    this.formElecteur = this.formBuilder.group({
      adresse: [''],
      cin: ['', [Validators.required]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      date_naissance: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.email,Validators.required]],      
      sexe: ['masculin', Validators.required],
      situation_familiale: ['', Validators.required],
      origine: ['', Validators.required],
      type : ['electeur'],

    });
  }
  onSubmit(electeur: Utilisateur) {


    // candidat.date_naissance = moment(candidat.date_naissance).format('yyyy-MM-dd');
    console.log(electeur.date_naissance);

    this.utilisateurService.add(electeur).subscribe((data: Utilisateur) => {

        this.electeurs.push(data);
        this.showNotify();
        this.formElecteur.reset();
        this.rerender();

      },
      (error) => console.log(error)

    );

  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
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
      title: 'Candidat ajouté avec success!'
    });
  }
  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formElecteur.patchValue({
          file: reader.result
        });
      };
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
