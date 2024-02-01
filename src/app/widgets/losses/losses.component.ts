import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { LossesData } from '../../model/summary/lossesdata';
import { LossesService } from '../../services/inbox/losses.service';
import { GlobalService } from 'src/app/services/common/global.service';
import { ClaimDetail } from 'src/app/model/inbox/ClaimDetail';
import { parseNumber } from '@progress/kendo-angular-intl';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';

@Component({
  selector: 'app-losses',
  templateUrl: './losses.component.html',
  styleUrls: ['./losses.component.scss'],
})
export class LossesComponent {
  totalincurred: string = 'Total Incurred';
  totalincurredvalue: string = '';
  totallosses: any = '0';
  lossesdata: LossesData[] = [];
  dropdownOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];
  selectedOption: string = 'Option 1';
  claimDetails: ClaimDetail[] = [];
  header : any = "";
  widgetData: any[] = [];
  widgetDataDB: any[] = [];
  years : any[] = ['0 Yrs']

  constructor(@Inject(InjectToken) private input: WidgetInput,
  private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.header = this.input.WidgetHeader;
    if (this.input.DataSubject != null){
      this.input.DataSubject.subscribe((inputData:any[])=>{
        if(inputData!=null && inputData.length>0){

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

          this.totallosses = inputData.reduce(
            (sum, { GrossIncurred }) => sum + Number(GrossIncurred), 0
          );

          this.lossesdata = [
            {
              numberofclaims: maxClaims,
              numberofopenclaims: maxOpenClaims,
              highestclaim: maxIncurred,
            },
          ];
        }
        else 
        this.lossesdata = [
          {
            numberofclaims: 0,
            numberofopenclaims: 0,
            highestclaim: '0',
          }]
        this.changeDetector.detectChanges();
      })
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
      this.lossesdata = [
        {
          numberofclaims: maxClaims,
          numberofopenclaims: maxOpenClaims,
          highestclaim: maxIncurred,
        },
      ];
    }
    else {
      this.totalincurredvalue = "0";
      this.lossesdata = [
        {
          numberofclaims: 0,
          numberofopenclaims: 0,
          highestclaim: 0,
        },
      ];
    }

    
  }
}
