import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountInformation } from 'src/app/model/inbox/AccountInformation';
import { SubmissionInfo } from 'src/app/model/inbox/SubmissionInfo';
import { CacheService } from 'src/app/services/common/cache.service';
import { GlobalService } from 'src/app/services/common/global.service';
import { InboxService } from 'src/app/services/inbox/inbox.service';
interface NavItem {
  title: string;
  routeLink: string;
  isPipeline?: boolean; 
  adress?: string; 
}
@Component({
  selector: 'app-inbox-topbar',
  templateUrl: './inbox-topbar.component.html',
  styleUrls: ['./inbox-topbar.component.scss']
})

export class InboxTopbarComponent implements OnInit, OnDestroy {
  accountInformation: AccountInformation | null = {
      SubmissionId : "",
      NamedinsuredFullname: 'NA',
      FullAddress: 'NA',
      BusinessDescription: 'NA',
      BusinessType: 'NA',
      EffectiveDate: 'NA',
      OrganizationType: 'NA',
      YearStarted: 'NA',
      NumberOfEmployees: 'NA',
      SICCode: 'NA',
      Taxidentifier: 'NA',
      ContactName: 'NA',
      PhoneNumber: 'NA',
      Email: 'NA',
      ProducerFullname : 'NA',
      LOB:"NA"
    };
  subscription: Subscription;
  
  constructor(public inboxService: InboxService,private globalService : GlobalService, 
      private router: Router, private cdRef:ChangeDetectorRef,
      private cacheService : CacheService
      ) {}
  navItems = [
    { title: 'Duke & Duke', content: '885 Street, Warrnville, illinois 60555', icon: '' },
    { title: 'Hotel', content: '', icon: 'bed' },
    { title: '04/01/2023', routeLink: '/contact', icon: ' calendar_month' },
    { title: 'Property', routeLink: '/contact', icon: 'home' },
    { title: 'Hub International', routeLink: '/contact', icon: 'account_circle' },
    { title: 'Risk Clearence Pending', routeLink: '/contact', icon: '', pending1: 'E', pending2: 'C', pending3:'R' },
    { title: 'Action', routeLink: '', icon: '', icon1: '' }
  ];
  
 
  dropdownValues: string[] = [];
  isToggleOn: boolean = false;
  dropdownOptions: { label: string; link: string }[] = [];
  isDataAvailble = false;
  
  // accountInformation: AccountInformation = {
  //   NamedinsuredFullname: 'NA',
  //   FullAddress: 'NA',
  //   BusinessDescription: 'NA',
  //   BusinessType: 'NA',
  //   EffectiveDate: 'NA',
  //   OrganizationType: 'NA',
  //   YearStarted: 'NA',
  //   NumberOfEmployees: 'NA',
  //   SICCode: 'NA',
  //   Taxidentifier: 'NA',
  //   ContactName: 'NA',
  //   PhoneNumber: 'NA',
  //   Email: 'NA',
  //   ProducerFullname : 'NA'
  // };
  propertyInformation : any={};

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  submissionInfo : SubmissionInfo={
    Completeness : "",
    Extraction : "",
    MessageId : "",
    RiskClearance : "",
    Status : "",
    SubmissionId : "",
    SubmissionName : "",
    LOB : ""
  }
  getDistinctLOB(lob: string ){
      if(lob!=null && lob !=""){
        var lobArr = lob.split(",")
        if(lobArr != null && lobArr.length>0)
        {
          let apendStr=""
          const distinctArray = lobArr.filter((n, i) => lobArr.indexOf(n) === i && n!="");
          apendStr = distinctArray[0].toString();
          lob = apendStr
        }
        
        
      }
      return lob;
  }
  ngOnInit(): void {
    // this.accountInformation = this.inboxService.getAccountInformation();

    // this.subscription = this.inboxService.accountInformation$.subscribe(
    //   (accountInformation) => {
    //     this.accountInformation = accountInformation;
    //   }
    // );


    this.cacheService.getAccountInformation().subscribe(
      (accountInfo) => {
        this.accountInformation = accountInfo;
        console.log("topbar");
        console.log(this.accountInformation);
        this.cdRef.detectChanges();
      },
    );

    this.fetchDropdownOptions();
    
    this.globalService.getCurrentSubmissionId().subscribe((subInfo) => {
      this.submissionInfo = {
        Completeness : subInfo.Completeness,
        Extraction : subInfo.Extraction,
        MessageId : subInfo.MessageId,
        RiskClearance : subInfo.RiskClearance,
        Status : subInfo.Status,
        SubmissionId : subInfo.SubmissionId,
        SubmissionName : subInfo.SubmissionName,
        LOB : "Property"//this.getDistinctLOB(subInfo.LOB)
      }
      this.cdRef.detectChanges();
    })
    this.globalService.getCurrentSubmission().subscribe((sub) => {
      if (sub != null && sub.value != null && sub.value.account_Level_Info!=null && sub.value.property_Policy_Info_Premises_Information!=null) {
        let accInfo = sub.value.account_Level_Info[0];
        let propertyInfo = sub.value.property_Policy_Info_Premises_Information[0];
        // this.accountInformation = {
        //   NamedinsuredFullname: this.getConcatenateString([
        //     accInfo.namedinsured_Fullname,
        //   ]),
        //   FullAddress: this.getConcatenateString([
        //     accInfo.namedInsured_MailingAddress_LineOne,
        //     accInfo.namedInsured_MailingAddress_CityName,
        //     accInfo.namedInsured_MailingAddress_StateOrProvinceCode,
        //     accInfo.namedInsured_MailingAddress_PostalCode,
        //   ],""),
        //   BusinessDescription: this.getConcatenateString([
        //     accInfo.commercialPolicy_OperationsDescription,
        //   ]),
        //   BusinessType: this.getConcatenateString([
        //     accInfo.namedInsured_LegalEntity_CorporationIndicator,
        //     accInfo.namedInsured_LegalEntity_IndividualIndicator,
        //     accInfo.namedInsured_LegalEntity_JointVentureIndicator,
        //     accInfo.namedInsured_LegalEntity_LimitedLiabilityCorporationIndicator,
        //     accInfo.namedInsured_LegalEntity_MemberManagerCount,
        //     accInfo.namedInsured_LegalEntity_NotForProfitIndicator,
        //     accInfo.namedInsured_LegalEntity_PartnershipIndicator,
        //     accInfo.namedInsured_LegalEntity_SubchapterSCorporationIndicator,
        //     accInfo.namedInsured_LegalEntity_TrustIndicator,
        //     accInfo.namedInsured_LegalEntity_OtherIndicator,
        //     accInfo.namedInsured_LegalEntity_OtherDescription,
        //   ]),
        //   EffectiveDate: this.getConcatenateString([propertyInfo.policy_Effectivedate]),
        //   OrganizationType: 'NA',
        //   YearStarted: 'NA',
        //   NumberOfEmployees: 'NA',
        //   ProducerFullname : this.getConcatenateString([accInfo.producer_Fullname ]),
        //   SICCode: this.getConcatenateString([propertyInfo.namedInsured_SICCode]),
        //   Taxidentifier: this.getConcatenateString([propertyInfo.namedinsured_Taxidentifier]),
        //   ContactName: 'NA',
        //   PhoneNumber: this.getConcatenateString([propertyInfo.namedInsured_Primary_PhoneNumber]),
        //   Email: 'NA',
        // };
        //this.accountInformation = sub.value.account_Level_Info[0];
        //this.propertyInformation = sub.value.property_Policy_Info_Premises_Information[0];
      }
      this.cdRef.detectChanges();
    }
    );
  }

  fetchDropdownOptions(): void {
    this.dropdownOptions = this.inboxService.getDropdownOptions();
  }

  onSelectOption(option: string): void {
   
  }

  toggleDropdown(): void {
    this.isToggleOn = !this.isToggleOn;
  }

  Logout() {
    this.router.navigate(['/login'], { queryParamsHandling: 'preserve' });
  }
  openMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }
  closeMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();
  }
  Guidewire(){
      // var submissionId = "AAMkADU1NjU3NzEyLWMxZTItNDA5Yy04N2E0LTkzYWNjNTc3ZWVlMQBGAAAAAABFiQ8wy3CORZrMw-rLQJlFBwCM8fwoQTOCSY_HjadmsuvGAAAAAAEMAACM8fwoQTOCSY_HjadmsuvGAAKVXoPlAAA=";
      this.subscription = this.globalService.getCurrentSubmissionId().subscribe((submission:SubmissionInfo)=>{
        this.inboxService.sendToGuidewire(submission.MessageId).subscribe(downloadRes=>{
        });
        
        
      })
  }
  getConcatenateString(elements: string[],defaultValue:string="NA") {
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
      concatenatedString = defaultValue;
    else if (concatenatedString.endsWith(','))
      concatenatedString = concatenatedString.slice(0, -1);

    return concatenatedString;
  }
}
