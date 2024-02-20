import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountInformation } from 'src/app/model/inbox/AccountInformation';
import { SubmissionInfo } from 'src/app/model/inbox/SubmissionInfo';
import { CacheService } from 'src/app/services/common/cache.service';
import { GlobalService } from 'src/app/services/common/global.service';
import { InboxService } from 'src/app/services/inbox/inbox.service';
import { CopilotComponent } from '../copilot/copilot.component';
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

  extractionComplete: number = 2;

  accountInformation: AccountInformation = {
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
      private cacheService : CacheService, private dialog: MatDialog
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
  propertyInformation : any={};

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  submissionInfo : SubmissionInfo={
    Completeness : "",
    SubmissionGUID: "",
    ClientSubmissionGUID : "",
    Extraction : "",
    MessageId : "",
    RiskClearance : "",
    Status : "",
    SubmissionId : "",
    SubmissionName : "",
    LOB : ""
  }
  getDistinctLOB(lob: string ){
    let lobToDisplay  = ""
      if(lob!=null && lob !=""){
        var lobArr = lob.split(",")
        if(lobArr != null && lobArr.length>0)
        {
          let apendStr=""
          const distinctArray = lobArr.filter((n, i) => lobArr.indexOf(n) === i && n!="");
          let count = 0;
          distinctArray.forEach(distLob=>{
            count++;
            if(count <= 2){
              apendStr += distLob 
            }
            // if(count == 2){
            //   apendStr += apendStr +","
            // }
            if(count < 2){
              apendStr += ","
            } 
          })
          if(count>2){
            apendStr += "+" + (count-2).toLocaleString()
          } 
          //apendStr = distinctArray[0].toString();
          lobToDisplay = apendStr
        }
        
        
      }
      lobToDisplay = lobToDisplay.replace(/,$/, "")
      return lobToDisplay;
  }
  ngOnInit(): void {
   
    this.cacheService.getAccountInformation().subscribe(
      (accountInfo) => {
        this.accountInformation = accountInfo;
        this.cdRef.detectChanges();
      },
    );

    this.fetchDropdownOptions();
    
    this.globalService.getCurrentSubmissionId().subscribe((subInfo) => {
      this.submissionInfo = {
        Completeness : subInfo.Completeness,
        SubmissionGUID: subInfo.SubmissionGUID,
        ClientSubmissionGUID: subInfo.ClientSubmissionGUID,
        Extraction : subInfo.Extraction,
        MessageId : subInfo.MessageId,
        RiskClearance : subInfo.RiskClearance,
        Status : subInfo.Status,
        SubmissionId : subInfo.SubmissionId,
        SubmissionName : subInfo.SubmissionName,
        LOB : subInfo.LOB//this.getDistinctLOB(subInfo.LOB)
      }

      console.log("SubmissionInfo")
      console.log(this.submissionInfo)
      
      this.cdRef.detectChanges();
    })
    // this.globalService.getCurrentSubmission().subscribe((sub) => {
    //   if (sub != null && sub.value != null && sub.value.account_Level_Info!=null && sub.value.property_Policy_Info_Premises_Information!=null) {
    //     let accInfo = sub.value.account_Level_Info[0];
    //     let propertyInfo = sub.value.property_Policy_Info_Premises_Information[0];
    //   }
    //   this.cdRef.detectChanges();
    // }
    // );
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

  ActionButtons = [
    { text: "Approve & Submit" },
    { text: "Reject" },
    { text: "Refer" },
    { text: "Reprocess" }
  ];
  OpenCopilot() {
    console.log("Copilot on Inbox top bar")
    console.log(this.submissionInfo)
    let dialogRef = this.dialog.open(CopilotComponent,{
      data:{
        SubmissionID : this.submissionInfo.SubmissionId
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
     
    });
  }
}
