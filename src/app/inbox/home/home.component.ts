import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboardservice';
import { InboxService } from 'src/app/services/inbox/inbox.service';
import { GlobalService } from 'src/app/services/common/global.service';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SubmissionInfo } from 'src/app/model/inbox/SubmissionInfo';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CopilotComponent } from 'src/app/core/copilot/copilot.component';
import { UserProfile } from 'src/app/model/profile/userprofile';
import { DomSanitizer } from '@angular/platform-browser';
import { ColumnSample } from 'src/app/model/samples/columnSample';
import { EmailpopupComponent } from 'src/app/core/emailpopup/emailpopup.component';
import { PopupAnimation } from '@progress/kendo-angular-popup';
import { DataComponent } from 'src/app/model/samples/data';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;
  userProfile: UserProfile;
  userList: any[] = [];
  mySelection: string[] = [];
  gridData : any[]= []
  public selectedCheckboxes: number[] = [];
  selectedRowIndices: Set<number> = new Set<number>();
  subscription: Subscription;
  public columns: any[] = ColumnSample.InboxColumns;
  dropdownValues: string[] = [];
  isToggleOn = false;
  dropdownOptions: { label: string; link: string }[] = [];
  defaultProfile : any;
  isDataAvailble = false;
  tableData: any[];
  clientName: any;
  submissionData : any[] = [];
  
  selectedSubmission : any;

  constructor(
    private inboxservice: InboxService,
    private dashboardservice: DashboardService,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private authService : AuthService
  ) {
    this.formGroup = this.fb.group({
      agencyname: [''],
    });
    this.columns = ColumnSample.InboxColumns;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.subscription = this.inboxservice
      .getAllSubmissionData()
      .subscribe((result) => {
        this.tableData = result.sort((a:any, b:any) => (a.SubmissionID > b.SubmissionID ? -1 : 1));
        this.submissionData = result.sort((a:any, b:any) => (a.SubmissionID > b.SubmissionID ? -1 : 1));
        this.getRecordCount();
      });
     
      this.userProfile = this.globalService.getUserProfile();
      let userDDL = {
        Email : this.userProfile.Email,
        Name : this.userProfile.FirstName + " " + this.userProfile.LastName
      }
      this.defaultProfile = userDDL;
      this.userList.push(userDDL)
  }

  newRecordCCount = 0;
  totalRecordCCount = 0;
  getRecordCount(){
    this.actionItems.forEach((action:any) => {
      
      if(action.type == 'allstatus'){
        action.content = this.submissionData.length
      }
      else if(action.type == 'newstatus'){
        action.content = this.submissionData.filter(
          (item) => item.Status.toLowerCase()=="new" 
        ).length;
      }
      else if(action.type == 'inqueuestatus'){
        action.content = this.submissionData.filter(
          (item) => item.Status.toLowerCase()=="in queue" 
        ).length;
      }
      else if(action.type == 'inprogressstatus'){
        action.content = this.submissionData.filter(
          (item) => item.Status.toLowerCase()=="in progress" 
        ).length;
      }
      else if(action.type == 'completedstatus'){
        action.content = this.submissionData.filter(
          (item) => item.Status.toLowerCase()=="completed" 
        ).length;
      }
    });
    
  }
  actionItems = [
    { title: 'Create Submisson', type:"createsubmission", content: '', icon : 'add_box', buttonClass : "buttonClassBlue" },
    { title: '', type:"createsubmission", content: '', icon: 'refresh', buttonClass : "buttonClassWhite"},
    { title: '', type:"createsubmission", content: '', icon: 'settings', buttonClass : "buttonClassWhite"},
    { title: 'All', type:"allstatus", content: '100', icon: '', buttonClass : "buttonClassWhite" },
    { title: 'New', type:"newstatus", content: '100', icon: '', buttonClass : "buttonClassWhite" },
    { title: 'In-Queue', type:"inqueuestatus", content: '100', icon: '', buttonClass : "buttonClassWhite" },
    { title: 'In-Progress', type:"inprogressstatus", content: '100', icon: '', buttonClass : "buttonClassWhite" },
    { title: 'Completed', type:"completedstatus", content: '100', icon: '', buttonClass : "buttonClassWhite" },
  ];
  fetchDropdownOptions(): void {
    this.dropdownOptions = [
      { label: 'My Profile', link: '/my-profile' },
      { label: 'Change Password', link: '/change-password' },
      { label: 'Notifications Settings', link: '/notifications-settings' },
      { label: 'Sign Out', link: '/sign-out' },
    ];
  }
  selectedValue = { label: 'Mark Thomas', link: '/option1' };
  onSelectOption(option: string): void {}

  toggleDropdown(): void {
    this.isToggleOn = !this.isToggleOn;
  }
  

  DownloadSumission360(newItem: any) {
    this.dashboardservice
      .downloadSubmission360(newItem.MessageId)
      .subscribe((downloadRes) => {
        const source = `data:application/octet-stream;base64,${downloadRes.value.data}`;
        const downloadLink = document.createElement('a');
        const fileName = downloadRes.value.fileName;

        downloadLink.href = source;
        downloadLink.download = fileName;
        downloadLink.click();
      });
  }

  onSaveButtonClick(): void {
    const selectedRowsData = this.getSelectedRowsData();
    const saveData = selectedRowsData.map((row: any) => ({
      submissionId: row.SubmissionID,
      priority: row.Priority,
    }));
    this.inboxservice.saveChanges(saveData).subscribe((response) => {
      this.mySelection = [];
    });
  }

  getSelectedRowsData(): any[] {
    const selectedRows = this.mySelection.map((selectedSubmissionID) => {
      return this.gridData.find(
        (item) => item.SubmissionID === selectedSubmissionID
      );
    });
    return selectedRows;
  }
  isPopupVisible = false;
  OpenMessageEvent(item: any) {
    this.selectedSubmission = item;
    this.isPopupVisible = true;
  }

  togglePopup(dataItem:any) {
    this.isPopupVisible = !this.isPopupVisible;
  }

  closePopup() {
    this.isPopupVisible = false;
  }
  reDirect(data:any){
    let param = data.value;
    
    let subInfo : SubmissionInfo = {
      SubmissionId : param.SubmissionID,
      SubmissionGUID: param.SubmissionGUID,
      ClientSubmissionGUID: param.ClientSubmissionGUID,
      SubmissionName : "",
      MessageId : param.MessageId,
      Status : param.Status,
      Extraction : "",
      Completeness : "",
      RiskClearance : "",
      LOB : param.lineOfBusiness
    }
    if(data.type == '')
      this.globalService.setCurrentSubmissionId(subInfo)
    else 
      this.RedirectToZoho(param.SubmissionGUID);
  }
  OpenCopilot(item: any) {
    console.log("Copilot on Inbox")
    console.log(item)
    let dialog1: MatDialog;
    let dialogRef = this.dialog.open(CopilotComponent,{
      data:item
    });

    dialogRef.afterClosed().subscribe((result) => {
     
    });
  }
  getStatusImage(status: string): string {
    if (status === 'Completed') {
      return '../../../assets/images/execl_downloadimg.png';
    } else if (status === 'In Progress') {
      return '../../../assets/images/disabled_excel.png';
    } else {
      return '../../../assets/images/s360_download-removebg-preview.png';
    }
  }

  refreshPage() {
    window.location.reload();
  }
  
  actionClicked(type:string){
    
    let tableData = this.tableData;
    
    if(type == 'allstatus'){
      this.tableData = this.submissionData
    }
    else if(type == 'newstatus'){
      this.tableData = this.submissionData.filter(
        (item) => item.Status.toLowerCase()=="new" 
      );
    }
    else if(type == 'inqueuestatus'){
      this.tableData = this.submissionData.filter(
        (item) => item.Status.toLowerCase()=="in queue" 
      );
    }
    else if(type == 'inprogressstatus'){
      this.tableData = this.submissionData.filter(
        (item) => item.Status.toLowerCase()=="in progress" 
      );
    }
    else if(type == 'completedstatus'){
      this.tableData = this.submissionData.filter(
        (item) => item.Status.toLowerCase()=="completed" 
      );
    }
  }
  public get animate(): boolean | PopupAnimation {
    if (this.isPopupVisible) {
      return {
        type: "expand",
        direction: "right",
        duration: 200,
      };
    }

    return false;
  }

  RedirectToZoho(SubmissionGUID : string){
    let userDetail = this.globalService.getUserProfile();
      this.authService.getZOHOToken(userDetail.Email).subscribe((token) => {
        // console.log('token');
  
        // this.globalService.getCurrentSubmissionId().subscribe((subInfo) => {
           let GUID = SubmissionGUID;
          let returndURL = DataComponent.RiskInsightsReturnURL.replace('{GUID}', GUID);
          let redirectURL = DataComponent.RiskInsightsRedirectURL
          redirectURL = redirectURL
            .replace('Zohotoken', token.value)
            .replace('returnURL', returndURL);
          //console.log(this.redirectURL);
          window.open(redirectURL, '_blank');
        });
      //});
    }
}
