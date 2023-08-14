import { Component } from '@angular/core';
import { TotalLossesData } from '../../model/summary/totallossesdata';
import { TotalLossesService } from '../../services/inbox/summary.service';

@Component({
  selector: 'app-total-losses',
  templateUrl: './total-losses.component.html',
  styleUrls: ['./total-losses.component.scss']
})
export class TotalLossesComponent {
  totalincurred: string = 'Total Losses';
  totalincurredvalue: string = ''
}
