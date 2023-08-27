import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/common/global.service';
import { PropertyBlanketSummary } from 'src/app/model/inbox/PropertyBlanketSummary';
import { CoverageData } from 'src/app/model/summary/CoverageData';

@Component({
  selector: 'app-coverages',
  templateUrl: './coverages.component.html',
  styleUrls: ['./coverages.component.scss'],
})
export class CoveragesComponent {
  exposureDetails: PropertyBlanketSummary[] = [];
  coverages : CoverageData[] = [];
  // {
  //   LocationNumber: 'NA',
  //   BuildingNumber: 'NA',
  //   BuildingName: 'NA',
  //   FullAddress: 'NA',
  //   YearBuilt: 'NA',
  //   TotalArea: 'NA',
  //   RoofType: 'NA',
  //   NumberOfStories: 'NA',
  //   TIV: 'NA',
  //   Geolocation: 'NA',
  //   Flood: 'NA',
  //   Earthquake: 'NA',
  //   NamedStorm: 'NA',
  //   Hail: 'NA',
  //   RoofAge: 'NA',
  //   Construction: 'NA',
  //   Occupancy: 'NA',
  //   Protection: 'NA',
  //   Wiring: 'NA',
  //   Sprinkler: 'NA',
  //   FireAlarm: 'NA',
  // };

  constructor(
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
        this.globalService.getCurrentSubmission().subscribe((sub) => {
          if (sub != null && sub.value != null) {
            sub.value.property_Policy_Info_Blanket_Summary.forEach(
              (exposure: any) => {
                let coverage: CoverageData = {
                  CoverageName : exposure.commercialcoverage_Summary_Blankettypedescription,
                  CoverageValue : exposure.commercialproperty_Summary_Blanketlimitamount,
                  CoverageType : "Blanket"
                }
                this.coverages.push(coverage);
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
}
