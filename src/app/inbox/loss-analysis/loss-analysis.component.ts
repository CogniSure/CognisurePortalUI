import { Component, OnInit } from '@angular/core';
import { SelectEvent } from '@progress/kendo-angular-layout';
import { ClaimDetail } from 'src/app/model/inbox/ClaimDetail';
import { ColumnSample } from 'src/app/model/samples/columnSample';
import { GlobalService } from 'src/app/services/common/global.service';
@Component({
  selector: 'app-loss-analysis',
  templateUrl: './loss-analysis.component.html',
  styleUrls: ['./loss-analysis.component.scss'],
})
export class LossAnalysisComponent implements OnInit {
  constructor(private globalService: GlobalService) {}
  claimDetails: ClaimDetail[] = [];
  public columns: any = ColumnSample.ClaimDetailColumns;
  ngOnInit(): void {
    this.globalService.getCurrentSubmission().subscribe((sub) => {
      this.claimDetails = [];
      if (sub != null && sub.value != null) {
        sub.value.claim_Info.forEach((claim: any) => {
          let tempClaim: ClaimDetail = {
            ClaimNo: claim.claim_Nbr,
            PolicyEffectiveDate: this.getConcatenateString([claim.policy_Effectivedate]),
            LineOfBusiness: this.getConcatenateString([claim.line_Of_Business]),
            LossDate: this.getConcatenateString([claim.loss_Date]),
            ClaimReportDate: this.getConcatenateString([claim.reported_Date]),
            LossLocation: this.getConcatenateString([claim.city]),
            LossState: this.getConcatenateString([claim.state]),
            Carrier: 'NA',
            PolicyNo: this.getConcatenateString([claim.policy_Nbr]),
            ClaimantName: this.getConcatenateString([claim.claimant_Nm]),
            ClaimDescription: this.getConcatenateString([claim.loss_Desc]),
            ClaimStatus: this.getConcatenateString([claim.claim_Status]),
            ValuationDate: this.getConcatenateString([claim.valuation_Date]),
            IndemnityRes: this.getConcatenateString([claim.pd_Reserves]),
            ExpenseRes: this.getConcatenateString([claim.reserve_Alae]),
            IndemnityPaid: this.getConcatenateString([claim.pd_Paid]),
            ExpensePaid: this.getConcatenateString([claim.paid_Alae]),
            TotalIncurred: this.getConcatenateString([claim.total_Incurred]),
          };
          this.claimDetails.push(tempClaim)
        });
      }
      console.log("Exposure Data")
      console.log(this.claimDetails)
    });
  }
  public onTabSelect(e: SelectEvent): void {}
  
  getConcatenateString(elements: string[]) {
    let concatenatedString = '';
    if (elements != null && elements != undefined && elements.length > 0) {
      for (let i = 0; i <= elements.length; i++) {
        let element = elements[i];
        if (element != undefined && element != '') {
          let separator: string = '';
          if (element != '' && i <= elements.length) separator = ',';
          concatenatedString += element + separator;
        }
      }
    }
    if (concatenatedString==null || concatenatedString == '' || concatenatedString.trim() === '' || concatenatedString=="undefined") concatenatedString = 'NA';
    else if (concatenatedString.endsWith(',')) concatenatedString= concatenatedString.slice(0, -1);

    return concatenatedString;
  }
 
}
