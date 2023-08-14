import { Component } from '@angular/core';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent {
  agencynamevalue: string = 'ACE Insurance';
  agencycodevalue: string = 'A548889';
  producer: string = 'John Kelly';
  produceremail: any = 'jkelly@aceinsurance.com';
  phone: string = '312-987-3456';
  activityrank: string = '234 / 4389';
}
