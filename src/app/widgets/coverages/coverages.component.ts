import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/common/global.service';
import { PropertyBlanketSummary } from 'src/app/model/inbox/PropertyBlanketSummary';
import { CoverageData } from 'src/app/model/summary/CoverageData';
import { parseNumber } from '@progress/kendo-angular-intl';

@Component({
  selector: 'app-coverages',
  templateUrl: './coverages.component.html',
  styleUrls: ['./coverages.component.scss']
})
export class CoveragesComponent implements OnInit {
  exposureDetails: PropertyBlanketSummary[] = [];
  coverages: CoverageData[] = [];
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

  constructor(private globalService: GlobalService,private cdRef:ChangeDetectorRef) {}
  Building = 0;
  Content = 0;
  BusinessIncome = 0;
  Other = 0;
  ngOnInit(): void {
    this.globalService.getCurrentSubmission().subscribe((sub) => {
      this.Building = 0;
      this.Content = 0;
      this.BusinessIncome = 0;
      this.Other = 0;
      if (sub != null && sub.value != null && sub.value.property_Policy_Info_Premises_Information!=null) {
        
        sub.value.property_Policy_Info_Premises_Information.forEach(
          (exposure: any) => {
            
            let propertyType1 =
              exposure.commercialproperty_Premises_Subjectofinsurancecode;
            let propertyValue = 0;
            if (exposure.commercialproperty_Premises_Limitamount != null) {
              var str =
                exposure.commercialproperty_Premises_Limitamount.replace(
                  '$',
                  ''
                );
              propertyValue = parseNumber(str);
            }
            
            if ((propertyType1 != null && propertyType1 != '')) {
              let propertyType = propertyType1.toLowerCase();
              console.log(propertyType);
              console.log(propertyValue)
              if (propertyType.indexOf('building') !== -1) {
                this.Building = this.Building + propertyValue;
              } else if (propertyType.indexOf('content') !== -1) {
                this.Content = this.Content + propertyValue;
              } else if (
                propertyType.indexOf('business income') !== -1 ||
                propertyType.indexOf('business') !== -1 ||
                propertyType.indexOf('income') !== -1
              ) {
               this.BusinessIncome = this.BusinessIncome + propertyValue;
              }
              else {
                this.Other = this.Other + propertyValue;
              }
            }
            
          }
        );
        this.coverages.push({
          CoverageName : "Building",
          CoverageType : 'Blanket',
          CoverageValue : "$"+this.Building.toLocaleString('en-GB')
        },
        {
          CoverageName : "Content",
          CoverageType : 'Blanket',
          CoverageValue : "$"+this.Content.toLocaleString('en-GB')
        },
        {
          CoverageName : "Business Income",
          CoverageType : 'Blanket',
          CoverageValue : "$"+this.BusinessIncome.toLocaleString('en-GB')
        },
        {
          CoverageName : "Other",
          CoverageType : 'Blanket',
          CoverageValue : "$"+this.Other.toLocaleString('en-GB')
        }
        );
        
        this.cdRef.detectChanges();
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
