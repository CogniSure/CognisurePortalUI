import { Component } from '@angular/core';

@Component({
  selector: 'app-risk-clearance',
  templateUrl: './risk-clearance.component.html',
  styleUrls: ['./risk-clearance.component.scss']
})
export class RiskClearanceComponent {
  ofaccheckvalue: string = 'No';
  sicvalue: number = 7234;
  statesvalue: string = 'NJ';
  statesvalue1: string = 'PA';
  statesvalue2: string = 'WA';
  tivvalue: string = '< $30 M';
  largeloss: string = '';
}
