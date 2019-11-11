import { Component, OnInit , ViewChild } from '@angular/core';
import { DataTableDirective  } from 'angular-datatables';

import { DateTimeAdapter } from 'ng-pick-datetime';
import { NgForm } from '@angular/forms';
import { ElectionService } from '../services/election.service';
import { Election } from '../models/election';

import * as moment from 'moment';

@Component({
  selector: 'app-planifier-election',
  templateUrl: './planifier-election.component.html',
  styleUrls: ['./planifier-election.component.scss']
})
export class PlanifierElectionComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  //electionService: ElectionService;

  //dt2 = new Date();
  constructor(dateTimeAdapter: DateTimeAdapter<any>,private electionService: ElectionService){
    dateTimeAdapter.setLocale('fr-FR'); // change locale to Japanese
    
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }
  onSubmit(election:Election){
    //console.log(election);
    election.dateDebut= moment(election.dateDebut).format('YYYY/MM/DD HH:mm:ss');
    election.dateFin = moment(election.dateFin).format('YYYY/MM/DD HH:mm:ss');
    
    this.electionService.addElection(election).subscribe((data: Election) =>{
      //console.log(election);
     // Swal.fire('Hello world!')
    },
    (error) => console.log(error)
    
  );
    
  }
}
