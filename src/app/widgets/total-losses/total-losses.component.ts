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
  years : any[] = ["0 Yrs"]
  totalloss: any;
  // public selectedYears: string = '';
  selectedValue = '0';
  public selectedYear: string = "All";
  totallosses: string = '$0';
  selectedYears: number = 1;
  claimDetails: ClaimDetail[] = [];
  widgetData: any[] = [];
  widgetDataDB: any[] = [];

  constructor(
    @Inject(InjectToken) private input: WidgetInput,
    private changeDetector: ChangeDetectorRef
  ) {
    //this.selectedYear = this.years[0];
  }

  ngOnInit(): void {
    if (this.input.DataSubject != null) {
      this.input.DataSubject.subscribe((inputData: any[]) => {
        if (inputData != null && inputData.length > 0) {
          this.widgetData = inputData;
          this.widgetDataDB = inputData;
          this.years = [];
          this.years = this.widgetData.map((x) => x.Year);
          let maxIncurred = inputData.reduce(
            (a, { GrossIncurred }) =>
              Number(GrossIncurred) > a ? Number(GrossIncurred) : a,
            -1
          );
          let maxClaims = inputData.reduce(
            (a, { TotalNoOfClaims }) => a + Number(TotalNoOfClaims), 0
          );
          let maxOpenClaims = inputData.reduce(
            (a, { TotalNoOfOpenClaims }) => a + Number(TotalNoOfOpenClaims), 0
          );

          this.totalincurredvalue = inputData.reduce(
            (sum, { GrossIncurred }) => sum + Number(GrossIncurred), 0
          );

          this.totallossesdata = [
            {
              numberofclaims: maxClaims,
              numberofopenclaims: maxOpenClaims,
              highestclaim: maxIncurred,
            },
          ];
        }
        this.changeDetector.detectChanges();
      });
    }
  }
  onYearChange(value: any) {
    let inputData = this.widgetDataDB;
    if(inputData != null && inputData.length > 0){
      let filteredData  = [];
      
      if(value=="All"){
        filteredData = inputData
      }
      else {
        filteredData = inputData.filter((data:any)=>
          Number(data.Year) <= Number(value) )
      }

      this.totalincurredvalue = filteredData.reduce(
        (sum, { GrossIncurred }) => sum + Number(GrossIncurred),
        0
      );

      let maxIncurred = filteredData.reduce(
        (a, { GrossIncurred }) =>
          Number(GrossIncurred) > a ? Number(GrossIncurred) : a,
        -1
      );
      let maxClaims = filteredData.reduce(
        (a, { TotalNoOfClaims }) => a + Number(TotalNoOfClaims), 0
      );
      let maxOpenClaims = filteredData.reduce(
        (a, { TotalNoOfOpenClaims }) => a + Number(TotalNoOfOpenClaims), 0
      );
      this.totallossesdata = [
        {
          numberofclaims: maxClaims,
          numberofopenclaims: maxOpenClaims,
          highestclaim: '$' + maxIncurred,
        },
      ];
    }
    else {
      this.totalincurredvalue = "0";
      this.totallossesdata = [
        {
          numberofclaims: 0,
          numberofopenclaims: 0,
          highestclaim: '$' + 0,
        },
      ];
    }

    
  }
}
