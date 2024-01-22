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
  selectedCountry: any = this.countries[0].id;
  constructor(
    @Inject(InjectToken) private input: WidgetInput,
    private cdRef: ChangeDetectorRef
  ) {
    this.selectedYear = this.years[0];
  }

  ngOnInit(): void {
    // this.globalService.getCurrentSubmission().subscribe((sub: any) => {
    //   this.claimDetails = [];
    //   if (sub != null && sub.value != null && sub.value.claim_Info!=null) {
    //     let noOfClaims = 0;
    //     let noOfOpenClaims = 0;
    //     let totalIncurred = 0;
    //     let highestIncurred = 0;
    //     sub.value.claim_Info.forEach((claim: any) => {
    //       //let totalIncurredTemp = parseNumber(claim.total_Incurred.replace('$',''));
    //       let totalIncurredTemp = 0;

    //       if (claim.total_Incurred != null) {
    //         var str = claim.total_Incurred.replace('$', '');
    //         totalIncurredTemp = parseNumber(str);
    //       }
    //       totalIncurred += totalIncurredTemp;
    //       if (totalIncurredTemp > highestIncurred)
    //         highestIncurred = totalIncurredTemp;

    //       noOfClaims++;
    //       if (claim.claim_Status == 'Open') noOfOpenClaims++;
    //     });

    //     this.totallosses = '$' + totalIncurred.toLocaleString('en-GB');
    //     this.totallossesdata = [
    //       {
    //         numberofclaims: noOfClaims,
    //         numberofopenclaims: noOfOpenClaims,
    //         highestclaim: '$' + highestIncurred.toLocaleString('en-GB'),
    //       },
    //     ];
    //   }
    //   this.cdRef.detectChanges();
    // });

    this.totallossesdata = [
      {
        numberofclaims: 110,
        numberofopenclaims: 10,
        highestclaim: '$' + 10000,
      }]
    }

  onYearChange(event: any) {
    this.selectedYear = event.target.value;
  }

  onDropdownChange(value: any) {
    console.log("Year Dropdown")
    console.log(value)
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
