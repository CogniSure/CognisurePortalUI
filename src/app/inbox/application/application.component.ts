import { Component, OnInit } from '@angular/core';
import { SelectEvent } from '@progress/kendo-angular-layout';
import { ClaimDetail } from 'src/app/model/inbox/ClaimDetail';
import { ApplicationProperty } from 'src/app/model/inbox/PropertyDetail';
import { ColumnSample } from 'src/app/model/samples/columnSample';
import { GlobalService } from 'src/app/services/common/global.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  constructor(private globalService: GlobalService) {}
  ngOnInit(): void {
    this.getApplicationExposure();
    this.getApplicationClaimDetails();
  }
  exposureDetails: ApplicationProperty[] = [];
  tableData2: ClaimDetail[] = [];
  public columns1: any = ColumnSample.ApplicationExposureColumns;
  public columns2: any = ColumnSample.ClaimDetailColumns;
  
  public onTabSelect(e: SelectEvent): void {}

  getApplicationExposure() {
    this.globalService.getCurrentSubmission().subscribe((sub) => {
      this.exposureDetails = [];
      if (sub != null && sub.value != null) {
        sub.value.property_Policy_Info_Premises_Information.forEach(
          (exposure: any) => {
            let tempExposure: ApplicationProperty = {
              LocationNumber: this.getConcatenateString([
                exposure.commercialstructure_Location_Produceridentifier,
              ]),
              BuildingNumber: this.getConcatenateString([
                exposure.commercialstructure_Building_Produceridentifier,
              ]),
              BuildingName: this.getConcatenateString([
                exposure.commercialstructure_Building_Sublocationdescription,
              ]),
              FullAddress: this.getConcatenateString([
                exposure.commercialstructure_Physicaladdress_Lineone,
                exposure.commercialstructure_Physicaladdress_CityName,
                exposure.commercialstructure_Physicaladdress_StateOrProvinceCode,
              ]),
              YearBuilt: this.getConcatenateString([
                exposure.commercialstructure_Builtyear,
              ]),
              TotalArea: this.getConcatenateString([
                exposure.construction_BuildingArea,
              ]),
              RoofType: this.getConcatenateString([
                exposure.construction_RoofMaterialCode,
              ]),
              NumberOfStories: 'NA',
              TIV: 'NA',
              Geolocation: 'NA',
              Flood: 'NA',
              Earthquake: 'NA',
              NamedStorm: 'NA',
              Hail: 'NA',
              RoofAge: 'NA',
              Construction: 'NA',
              Occupancy: 'NA',
              Protection: 'NA',
              Wiring: 'NA',
              Sprinkler: 'NA',
              FireAlarm: 'NA',
              BuildingNameAndOccupancy : this.getConcatenateString([
                exposure.buildingoccupancy_Otheroccupanciesdescription]),
              City: this.getConcatenateString([
                exposure.commercialstructure_Physicaladdress_Cityname,
              ]),
              State: this.getConcatenateString([
                exposure.commercialstructure_Physicaladdress_Stateorprovincecode,
              ]),
              ZipCode: this.getConcatenateString([
                exposure.commercialstructure_Physicaladdress_Postalcode,
              ]),
              Coinsurance: this.getConcatenateString([
                exposure.commercialproperty_Premises_Coinsurancepercent,
              ]),
              Valuation: this.getConcatenateString([
                exposure.commercialproperty_Premises_Valuationcode,
              ]),
              Building: this.getConcatenateString([
                exposure.commercialproperty_Test//Didnot find mapping
              ]),
              BPP: this.getConcatenateString([
                exposure.commercialproperty_Test
              ]),
              BusinessIncome: this.getConcatenateString([
                exposure.commercialproperty_Attachment_Businessincomeextraexpenseindicator,
              ]),
              ExtraExpense: this.getConcatenateString([
                exposure.commercialproperty_Attachment_Businessincomeextraexpenseindicator,
              ]),
              Contents: this.getConcatenateString([
                exposure.commercialproperty_Test
              ]),
              PersonalPropertyofOthers: this.getConcatenateString([
                exposure.commercialproperty_Test
              ]),
              Others: this.getConcatenateString([
                exposure.commercialproperty_Test
              ]),
              ISOConstructionType: this.getConcatenateString([
                exposure.construction_Constructioncode
              ]),
              NoOfStories: this.getConcatenateString([
                exposure.commercialproperty_Test
              ]),
              AlarmType: this.getConcatenateString([
                exposure.commercialproperty_Test
              ]),
              TotalInsuredValues: this.getConcatenateString([
                exposure.commercialproperty_Test
              ]),
            };
            this.exposureDetails.push(tempExposure);
          }
        );
      }
    });
  }
  getApplicationClaimDetails(){
    this.globalService.getCurrentSubmission().subscribe((sub) => {
      this.tableData2 = [];
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
          this.tableData2.push(tempClaim)
        });
      }
    });
  }

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
    if (
      concatenatedString == null ||
      concatenatedString == '' ||
      concatenatedString.trim() === '' ||
      concatenatedString == 'undefined'
    )
      concatenatedString = 'NA';
    else if (concatenatedString.endsWith(','))
      concatenatedString = concatenatedString.slice(0, -1);

    return concatenatedString;
  }
}
