import { Component } from '@angular/core';
import {TotalLossesData} from '../../model/summary/totallossesdata';
import {TotalLossesService} from '../../services/inbox/summary.service'
import {TotalIncurredValue} from '../../model/summary/totallossesdata';
import {DataService} from '../../model/summary/dataservice';
import {Data} from '../../model/summary/data';


@Component({
  selector: 'app-total-losses',
  templateUrl: './total-losses.component.html',
  styleUrls: ['./total-losses.component.scss']
})
export class TotalLossesComponent {
  totalincurred: string = 'Total Losses';
  totalincurredvalue: string = ''
  totallossesdata: TotalLossesData[] = [];
  selected = 'option2';
  selectedOption: string = '1';
  globalService: any;
  totalloss: any;
  // public selectedYears: string = '';
  selectedValue = '0';
  public years: string[] = ['1yrs', '2yrs', '3yrs', '4yrs'];
  public selectedYear: string;
  totallosses: string = '$75,000';
  selectedYears: number = 1;

  constructor(private totalLossesService: TotalLossesService,private dataService: DataService){
    this.selectedYear = this.years[0];
  }
 
  ngOnInit(): void {
    this.totallossesdata = this.totalLossesService.getTotalLossesData();
  }


  onYearChange(event: any) {
    this.selectedYear = event.target.value;
    console.log('Selected Year:', this.selectedYear);
  }
  
  
  onDropdownChange(value: any) {
    this.selectedYears = value;
    if (this.selectedYears === 1) {
      this.totallosses = '$50,000';
    } else if (this.selectedYears === 2) {
      this.totallosses = '$60,000';
    } else if (this.selectedYears === 3) {
      this.totallosses = '$70,000';
    } else if (this.selectedYears === 4) {
      this.totallosses = '$80,000';
    }
  }

}
