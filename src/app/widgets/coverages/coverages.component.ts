import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit,Inject } from '@angular/core';
import { GlobalService } from 'src/app/services/common/global.service';
import { PropertyBlanketSummary } from 'src/app/model/inbox/PropertyBlanketSummary';
import { CoverageData } from 'src/app/model/summary/CoverageData';
import { parseNumber } from '@progress/kendo-angular-intl';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';

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

  constructor(private changeDetector: ChangeDetectorRef,
    @Inject(InjectToken) private input: WidgetInput) {}
  Building = 0;
  Content = 0;
  BusinessIncome = 0;
  Other = 0;
  ngOnInit(): void {
    if (this.input.DataSubject != null){
      this.input.DataSubject.subscribe((inputData:any[])=>{
        if(inputData!=null && inputData.length>0){
          this.coverages = inputData;
        }
        this.changeDetector.detectChanges();
      })
    }
    
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
