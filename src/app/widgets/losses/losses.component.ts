import { Component } from '@angular/core';
import { LossesData } from '../../model/summary/lossesdata';
import { LossesService } from '../../services/inbox/losses.service';
import { GlobalService } from 'src/app/services/common/global.service';
import { ClaimDetail } from 'src/app/model/inbox/ClaimDetail';
import { parseNumber } from '@progress/kendo-angular-intl';

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
  claimDetails: ClaimDetail[] = [];



  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    
    this.globalService.getCurrentSubmission().subscribe((sub: any) => {
      this.claimDetails = [];
      if (sub != null && sub.value != null) {
        let noOfClaims = 0;
        let noOfOpenClaims = 0;
        let totalIncurred = 0;
        let highestIncurred = 0;
        sub.value.claim_Info.forEach((claim: any) => {
          let totalIncurredTemp = 0;
          if(claim.total_Incurred!=null)
            {
              var str = claim.total_Incurred.replace('$','')
              totalIncurredTemp = parseNumber(str);
            }
          totalIncurred += totalIncurredTemp;
          if (totalIncurredTemp > highestIncurred)
            highestIncurred = totalIncurredTemp;

          noOfClaims++;
          if(claim.claim_Status == "Open")
            noOfOpenClaims++
        });

        this.totallosses = totalIncurred.toLocaleString('en-GB')
        this.lossesdata = [
          {numberofclaims: noOfClaims, numberofopenclaims: noOfOpenClaims, highestclaim: highestIncurred }
        ];
      }
    });
}
}
