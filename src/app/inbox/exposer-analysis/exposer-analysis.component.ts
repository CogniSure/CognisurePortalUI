import { Component, OnInit } from '@angular/core';
import { parseNumber } from '@progress/kendo-angular-intl';
import { SelectEvent } from '@progress/kendo-angular-layout';
import { PropertyDetail } from 'src/app/model/inbox/PropertyDetail';
import { ColumnSample } from 'src/app/model/samples/columnSample';
import { GlobalService } from 'src/app/services/common/global.service';
@Component({
  selector: 'app-exposer-analysis',
  templateUrl: './exposer-analysis.component.html',
  styleUrls: ['./exposer-analysis.component.scss'],
})
export class ExposerAnalysisComponent implements OnInit {
  constructor(private globalService: GlobalService) {}
  exposureDetails: PropertyDetail[] = [];
  columns = ColumnSample.ExposureColumns;
  ngOnInit(): void {
    this.globalService.getCurrentSubmission().subscribe((sub) => {
      this.exposureDetails = [];
      if (sub != null && sub.value != null) {
        sub.value.property_Policy_Info_Premises_Information.forEach(
          (exposure: any) => {
            let tempExposure: PropertyDetail = {
              LocationNumber:this.getConcatenateString([exposure.commercialstructure_Location_Produceridentifier]),
              BuildingNumber: this.getConcatenateString([exposure.commercialstructure_Building_Produceridentifier]),
              BuildingName: this.getConcatenateString([exposure.commercialstructure_Building_Sublocationdescription]),
              FullAddress: this.getConcatenateString([
                exposure.commercialstructure_Physicaladdress_Lineone,
                exposure.commercialstructure_Physicaladdress_CityName,
                exposure.commercialstructure_Physicaladdress_StateOrProvinceCode,
              ]),
              YearBuilt: this.getConcatenateString([exposure.commercialstructure_Builtyear]),
              TotalArea: this.getConcatenateString([exposure.construction_BuildingArea]),
              RoofType: this.getConcatenateString([exposure.construction_RoofMaterialCode]),
              NumberOfStories: this.getConcatenateString([exposure.construction_Storeycount]),
              TIV: "$"+parseNumber(this.getConcatenateString([exposure.commercialproperty_Premises_Limitamount])).toLocaleString('en-GB'),
              Geolocation: 'NA',
              Flood: 'NA',
              Earthquake: 'NA',
              NamedStorm: 'NA',
              Hail: 'NA',
              RoofAge: 'NA',
              Construction: this.getConcatenateString([exposure.construction_Constructioncode]),
              Occupancy: this.getConcatenateString([exposure.buildingoccupancy_Otheroccupanciesdescription]),
              Protection:this.getConcatenateString([exposure.buildingfireprotection_Protectionclasscode]),
              Wiring: this.getConcatenateString([exposure.buildingimprovement_Wiringyear]),
              Sprinkler: this.getConcatenateString([exposure.buildingfireprotection_Alarm_Sprinklerpercent]),
              FireAlarm: this.getConcatenateString([exposure.buildingfireprotection_Alarm_Protectiondescription]),
            };
            this.exposureDetails.push(tempExposure);
          }
        );
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
    if (concatenatedString==null || concatenatedString == '' || concatenatedString.trim() === '' || concatenatedString=="undefined") concatenatedString = 'NA';
    else if (concatenatedString.endsWith(',')) concatenatedString= concatenatedString.slice(0, -1);

    return concatenatedString;
  }
  public onTabSelect(e: SelectEvent): void {}
}
