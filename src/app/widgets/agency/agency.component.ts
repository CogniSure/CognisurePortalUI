import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { subreportIcon } from '@progress/kendo-svg-icons';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { GlobalService } from 'src/app/services/common/global.service';
import { AgencyService } from 'src/app/services/inbox/agency.service';
import { AccountInfo } from 'src/app/model/inbox/AccountInfo';
import { CacheService } from 'src/app/services/common/cache.service';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit,AfterViewInit,OnDestroy,OnChanges{
  isDataAvailable = false;
  isDataAvailble = false;

  accountInformation: AccountInfo = {
    AgencyName: "NA",
    AgencyCode: "NA",
    Producer: "NA",
    ProducerEmail: "NA",
    ProducerPhoneNo: "NA",
    ActivityRank: "NA",
  };

  summary : any={};
  animationClass = "slide-effect-x1";
  agencyData: any;
  subscription: any;
  constructor(private cacheService: CacheService,
    private changeDetector: ChangeDetectorRef,
    @Inject(InjectToken) private input: WidgetInput) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    if (this.input.DataSubject != null){
      this.input.DataSubject.subscribe((inputData:any[])=>{
        
        if(inputData!=null && inputData.length>0){

          let accInfo = inputData[0];
          // console.log('sampleData ClaimsbyLOBbyYear - agency');
          
          // console.log(accInfo)
          this.accountInformation = {
            AgencyCode: accInfo.AgencyCode,
            AgencyName: accInfo.AgencyName,
            Producer: accInfo.Producer,
            ProducerEmail: accInfo.ProducerEmail,
            ProducerPhoneNo: accInfo.ProducerPhoneNo,
            ActivityRank: accInfo.ActivityRank,
          };
          if (this.accountInformation) {
            // Data is available, set isDataAvailable to true
            this.isDataAvailable = true;
          } else {
            // No data available, set isDataAvailable to false
            this.isDataAvailable = false;
          }
        }
        this.changeDetector.detectChanges();
      })
    }

  }
  ngAfterViewInit() {
  }

  // ngOnDestroy(){
  //   this.animationClass = "";
  // }
  ngOnChanges(changes: any){

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
