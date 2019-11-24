import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Candidat } from '../models/candidat';
import { CandidatService } from '../services/candidat.service';
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss']
})
export class CandidatComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  candidats: Candidat[];
  formCandidat: FormGroup;
  

  constructor(private candidatService: CandidatService, private formBuilder: FormBuilder) {
  
     this.formCandidat = this.formBuilder.group({
      candidat_id: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      cin: ['',[Validators.required]],
      nom: ['',Validators.required],
      prenom: ['',Validators.required],
      date_naissance: ['',Validators.required],      
      tel: ['',Validators.required],
      sexe: ['',Validators.required],
      situation_familiale: ['',Validators.required],
      origine: ['',Validators.required],
      
     });
   }

  ngOnInit() {
  }

  onSubmit(candidat: Candidat) {
  
   
    candidat.date_naissance = moment(candidat.date_naissance).format('YYYY/MM/DD');
    
    this.candidatService.addCandidat(candidat).subscribe((data: Candidat) => {
     
        this.candidats.push(candidat);
        this.showNotify();        
        this.formCandidat.reset();
       
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
  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
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
}

