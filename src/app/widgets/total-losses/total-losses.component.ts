import { Component } from '@angular/core';

@Component({
  selector: 'app-total-losses',
  templateUrl: './total-losses.component.html',
  styleUrls: ['./total-losses.component.scss']
})
export class TotalLossesComponent {
  totalincurred: string = 'Total Losses';
  totalincurredvalue: string = ''
}
