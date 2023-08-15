import { Component } from '@angular/core';
import { AgencyService } from 'src/app/services/inbox/agency.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent {
  // agencynamevalue: string = 'ACE Insurance';
  // agencycodevalue: string = 'A548889';
  // producer: string = 'John Kelly';
  // produceremail: any = 'jkelly@aceinsurance.com';
  // phone: string = '312-987-3456';
  // activityrank: string = '234 / 4389';

  agencyData: any; 

  constructor(private agencyService: AgencyService) {}

  ngOnInit() {
    this.agencyData = this.agencyService.getAgencyData();
  }

  
}
