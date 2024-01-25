import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { TotalLossesData } from '../../model/summary/totallossesdata';
import { TotalLossesService } from '../../services/inbox/summary.service';
import { TotalIncurredValue } from '../../model/summary/totallossesdata';
import { DataService } from '../../model/summary/dataservice';
import { Data } from '../../model/summary/data';
import { ClaimDetail } from 'src/app/model/inbox/ClaimDetail';
import { GlobalService } from 'src/app/services/common/global.service';
import { parseNumber } from '@progress/kendo-angular-intl';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';

@Component({
  selector: 'app-total-losses',
  templateUrl: './total-losses.component.html',
  styleUrls: ['./total-losses.component.scss'],
})
export class TotalLossesComponent implements OnInit {
  totalincurred: string = 'Total Losses';
  totalincurredvalue: string = '';
  totallossesdata: TotalLossesData[] = [];
  selected = 'option2';
  selectedOption: string = '1';

  totalloss: any;
  // public selectedYears: string = '';
  selectedValue = '0';
  public years: string[] = ['1yrs', '2yrs', '3yrs', '4yrs'];
  public selectedYear: string;
  totallosses: string = '$75,000';
  selectedYears: number = 1;
  claimDetails: ClaimDetail[] = [];
  countries = [{
    id: 1, name: 'France' 
  },
  {
    id: 2, name: 'Germany' 
  },
  {
    id: 3, name: 'Italy' 
  },
  ];
  widgetData : any[] = [];
  selectedCountry: any = this.countries[0].id;
  constructor(
    @Inject(InjectToken) private input: WidgetInput,
    private changeDetector: ChangeDetectorRef
  ) {
    this.selectedYear = this.years[0];
  }

  ngOnInit(): void {
    if (this.input.DataSubject != null){
      this.input.DataSubject.subscribe((inputData:any[])=>{
          
        if(inputData!=null && inputData.length>0){
          this.widgetData = inputData;
          this.years = [];
          this.years = this.widgetData.map(x=>x.Year);
          let maxIncurred = inputData.reduce((a, {GrossIncurred})=>Number(GrossIncurred) > a ? Number(GrossIncurred) : a , -1);
          let maxClaims = inputData.reduce((a, {TotalNoOfClaims})=>Number(TotalNoOfClaims) > a ? Number(TotalNoOfClaims) : a , -1);
          let maxOpenClaims = inputData.reduce((a, {TotalNoOfOpenClaims})=>Number(TotalNoOfOpenClaims) > a ? Number(TotalNoOfOpenClaims) : a , -1);

          this.totalincurredvalue = inputData.reduce((sum, {GrossIncurred})=> sum + Number(GrossIncurred), 0);
          
          this.totallossesdata = [
            {
              numberofclaims: maxClaims,
              numberofopenclaims: maxOpenClaims,
              highestclaim: '$' + maxIncurred,
            }]
          
        }
        this.changeDetector.detectChanges();
      })
    }

    
    }

  onYearChange(event: any) {
    this.selectedYear = event.target.value;
  }

  onDropdownChange(value: any) {
    console.log("Year Dropdown")
    console.log(value)
    // this.selectedYears = value;
    // if (this.selectedYears === 1) {
    //   this.totallosses = '$50,000';
    // } else if (this.selectedYears === 2) {
    //   this.totallosses = '$60,000';
    // } else if (this.selectedYears === 3) {
    //   this.totallosses = '$70,000';
    // } else if (this.selectedYears === 4) {
    //   this.totallosses = '$80,000';
    // }
  }
}
