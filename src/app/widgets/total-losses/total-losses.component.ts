import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TotalLossesData } from '../../model/summary/totallossesdata';
import { TotalLossesService } from '../../services/inbox/summary.service';
import { TotalIncurredValue } from '../../model/summary/totallossesdata';
import { DataService } from '../../model/summary/dataservice';
import { Data } from '../../model/summary/data';
import { ClaimDetail } from 'src/app/model/inbox/ClaimDetail';
import { GlobalService } from 'src/app/services/common/global.service';
import { parseNumber } from '@progress/kendo-angular-intl';

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
  constructor(
    private globalService: GlobalService,
    private cdRef: ChangeDetectorRef
  ) {
    this.selectedYear = this.years[0];
  }

  ngOnInit(): void {
    this.globalService.getCurrentSubmission().subscribe((sub: any) => {
      this.claimDetails = [];
      if (sub != null && sub.value != null) {
        let noOfClaims = 0;
        let noOfOpenClaims = 0;
        let totalIncurred = 0;
        let highestIncurred = 0;
        sub.value.claim_Info.forEach((claim: any) => {
          //let totalIncurredTemp = parseNumber(claim.total_Incurred.replace('$',''));
          let totalIncurredTemp = 0;

          if (claim.total_Incurred != null) {
            var str = claim.total_Incurred.replace('$', '');
            totalIncurredTemp = parseNumber(str);
          }
          totalIncurred += totalIncurredTemp;
          if (totalIncurredTemp > highestIncurred)
            highestIncurred = totalIncurredTemp;

          noOfClaims++;
          if (claim.claim_Status == 'Open') noOfOpenClaims++;
        });

        this.totallosses = '$' + totalIncurred.toLocaleString('en-GB');
        this.totallossesdata = [
          {
            numberofclaims: noOfClaims,
            numberofopenclaims: noOfOpenClaims,
            highestclaim: '$' + highestIncurred.toLocaleString('en-GB'),
          },
        ];
      }
      this.cdRef.detectChanges();
    });
  }

  onYearChange(event: any) {
    this.selectedYear = event.target.value;
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
