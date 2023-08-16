import { Component } from '@angular/core';
import { LossesData } from '../../model/summary/lossesdata';
import { LossesService } from '../../services/inbox/losses.service';

@Component({
  selector: 'app-losses',
  templateUrl: './losses.component.html',
  styleUrls: ['./losses.component.scss']
})
export class LossesComponent {
  totalincurred: string = 'Total Incurred';
  totalincurredvalue: string = ''
  totallosses: any = '$75,000';
 lossesdata: LossesData[] = [];
 dropdownOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];
  selectedOption: string = 'Option 1';
  // selectedOption: number = 1;




  constructor(private lossesService: LossesService) {}

  ngOnInit(): void {
    
    this.lossesdata = this.lossesService.getLossesData();
    // dropdownOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];

  // this.lossesdata = [
  //   { numberofclaims: 27, numberofopenclaims: 4, highestclaim: '$10,000' },
  // ];

  // this.dropdownOptions = [
  //   { id: 1, name: 'Option 1' },
  //   { id: 2, name: 'Option 2' },
  //   { id: 3, name: 'Option 3' }
  // ];
}
}
