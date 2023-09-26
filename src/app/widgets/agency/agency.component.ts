import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { subreportIcon } from '@progress/kendo-svg-icons';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { GlobalService } from 'src/app/services/common/global.service';
import { AgencyService } from 'src/app/services/inbox/agency.service';
import { AccountInfo } from 'src/app/model/inbox/AccountInfo';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit,AfterViewInit,OnDestroy,OnChanges{
  isDataAvailable = false;
  isDataAvailble = false;

  accountInformation: AccountInfo = {
    Namedinsured_Fullname: "NA",
  Namedinsured_Mailingaddress_Lineone: "NA",
  Namedinsured_Mailingaddress_Cityname: "NA",
  Namedinsured_Mailingaddress_Stateorprovincecode: "NA",
  Namedinsured_Mailingaddress_Postalcode: "NA",
  Namedinsured_Naicscode: "NA",
  Naics_Description: "NA",
  Producer_Fullname: "NA",
  Insurer_Produceridentifier: "NA",
  Producer_Mailingaddress_Lineone: "NA",
  Producer_Mailingaddress_Postalcode: "NA",
  };

  summary : any={};
  animationClass = "slide-effect-x1";
  agencyData: any; 
  @Input() widgetInput:WidgetInput
  subscription: any;
  constructor(private agencyService: AgencyService,private globalService : GlobalService) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscription = this.globalService.getCurrentSubmission().subscribe((sub) => {
      if (sub != null && sub.value != null && sub.value.account_Level_Info!=null) {
        let accInfo = sub.value.account_Level_Info[0];
        this.accountInformation = {
          Namedinsured_Fullname: this.getConcatenateString([
            accInfo.namedinsured_Fullname,
          ]),
          Namedinsured_Mailingaddress_Lineone: this.getConcatenateString([
            accInfo.namedinsured_Mailingaddress_Lineone
          ]),
          Namedinsured_Mailingaddress_Cityname: this.getConcatenateString([
            accInfo.namedinsured_Mailingaddress_Cityname,
          ]),
          Namedinsured_Mailingaddress_Stateorprovincecode: this.getConcatenateString([
            accInfo.namedinsured_Mailingaddress_Stateorprovincecode
          ]),
          Namedinsured_Mailingaddress_Postalcode: this.getConcatenateString([accInfo.Namedinsured_mailingaddress_Postalcode]),
          Namedinsured_Naicscode: this.getConcatenateString([accInfo.namedinsured_Naicscode]),
          Naics_Description: this.getConcatenateString([accInfo.naics_Description]),
          Producer_Fullname: this.getConcatenateString([accInfo.producer_Fullname]),
          Insurer_Produceridentifier: this.getConcatenateString([accInfo.insurer_Produceridentifier]),
          Producer_Mailingaddress_Lineone: this.getConcatenateString([accInfo.producer_Mailingaddress_Lineone]),
          Producer_Mailingaddress_Postalcode: this.getConcatenateString([accInfo.producer_Mailingaddress_Postalcode]),
        };
        //this.accountInformation = sub.value.account_Level_Info[0];
        //this.propertyInformation = sub.value.property_Policy_Info_Premises_Information[0];
      }




      if (this.accountInformation) {
        // Data is available, set isDataAvailable to true
        this.isDataAvailable = true;
      } else {
        // No data available, set isDataAvailable to false
        this.isDataAvailable = false;
      }


  
    });



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
