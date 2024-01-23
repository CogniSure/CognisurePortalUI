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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {
  public formGroup: FormGroup;
  mySelection: string[] = [];
  public gridData: any[] = [];
  public selectedCheckboxes: number[] = [];
  //public dialog: MatDialog;
  selectedRowIndices: Set<number> = new Set<number>();
// saveChanges: any;
  subscription : Subscription
  constructor(private inboxservice:InboxService,private dashboardservice:DashboardService, private fb: FormBuilder, private globalService: GlobalService, private dialog: MatDialog)
  {
    this.formGroup = this.fb.group({
      agencyname: [''],
    });
  }
  dropdownValues: string[] = [];
  // isToggleOn: boolean = false;
  isToggleOn = false;
  dropdownOptions: { label: string; link: string }[] = [];
  isDataAvailble = false;
  tableData: any[]
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    console.log("Inbox Loaded");
    this.subscription = this.inboxservice.getAllSubmissionData().subscribe(result=>{
      this.tableData = result;
      console.log("Inbox Loaded from service");
      // this.changedetector.detectChanges();
      console.log(result)
      this.totalRecordCCount = this.tableData.length;
      this.newRecordCCount = this.tableData.filter(item => item.NewStatus).length;
       //this.changeDetectorRef.detectChanges();
    })
  }
  getNewRecordCount(){

  }
  getTotalRecordCount(){

  }
 newRecordCCount=0
 totalRecordCCount=0
  navItems = [
    { title: 'Create Submisson', content: '', icon: 'add_box' },
    { title: '', content: '', icon: 'refresh' },
    { title: '', routeLink: '', icon: 'description' },
    { title: '', routeLink: '/contact', icon: 'filter_alt' },
    { title: '', routeLink: '', icon: 'settings' },
    { title: 'All',title1:'24', routeLink: '/contact', icon: '' },
    { title: 'New',title1:'4', routeLink: '/contact', icon: '' },
    { title: 'Pending Review', title1:'5', routeLink: '', icon: '', icon1: '' },
    { title: 'Rush', title1:'1', routeLink: '', icon: '', icon1: '' },
    { title: 'Evelyn Salt', routeLink: '', icon: 'arrow_drop_down', icon1: '' },
  ];
  fetchDropdownOptions(): void {
    this.dropdownOptions =  [
      { label: 'My Profile', link: '/my-profile' },
      { label: 'Change Password', link: '/change-password' },
      { label: 'Notifications Settings', link: '/notifications-settings' },
      { label: 'Sign Out', link: '/sign-out' }
    ];;
  }
  selectedValue =  { label: 'Mark Thomas', link: '/option1' };
  dropdownOption = [
    { label: 'Mark Thomas', link: '/option1' },
    { label: 'Lisa Scott', link: '/option2' },
    { label: 'John Williams', link: '/option3' },
    { label: 'Kane Williams', link: '/option4' },
    { label: 'Mark Thomas', link: '/option5' },
    { label: 'Lisa Scott', link: '/option6' },
    { label: 'John Williams', link: '/option7' }
  ];
  
  onSelectOption(option: string): void {}

  toggleDropdown(): void {
    this.isToggleOn = !this.isToggleOn;
  }
 public columns: any =[
  {
    field: "Id",
    title: "",
    width:40,
    type: "checkbox",
    columnmenu:false,
    filterable : false,
    sortable:false
  },
  {
    field: 'alerts',
    title: 'Alerts',
    width:90,
    type: 'alerts',
    columnmenu:false,
    sortable: false,
    groupable: true,
  },
  {
    field: "SubmissionID",
    format: "{0:c}",
    title: "Submission ID",
    width:138,
    type: "SubmissionId",
    redirectUrl:"/inbox/detail/summary",
    sortable:true,
    columnmenu:false,
    filterable : false,
    IsNew:"NewStatus"
  },
  {
      field: "AccountName",
      title: "Account Name",
      type: "text",
      width:160,
      columnmenu:true,
      sortable:true,
      filterable : true,
    },
    {
      field: "EffectiveDate",
      // format: "{yyyy-MM-dd}",
      title: "Effective Date",
      width:150,
      type: "text",
      columnmenu:true,
      sortable:true,
      filterable : true,
    },
    {
      field: "LOB",
      format: "{0:c}",
      title: "LOB",
      type: "LOB",
      width:85,
      columnmenu:true,
      sortable:true,
      filterable : true,
    },
    {
      field: "Priority",
      format: "{0:c}",
      title: "Priority",
      width:110,
      type: "priority",
      columnmenu:true,
      sortable:true,
      filterable : true,
      dropdownValue: 'High',
    },
    {
      field: "QualityScore",
      format: "{0:c}",
      title: "Winability Score%",
      width:140,
      type: "text",
      columnmenu:true,
      sortable:true,
      filterable : true,
    },
    {
      field: "Status",
      format: "{0:c}",
      title: "Status",
      type: "text",
      width:110,
      columnmenu:true,
      sortable:true,
      filterable : true,
      template: `
      <img 
        class="status-image" 
        [src]="getStatusImage(dataItem.Status)" 
        alt="Status Image"
      >
    `,
    },
    {
      field: "AssignedBy",
      format: "{0:c}",
      title: "Assigned To",
      type: "text",
      width:120,
      columnmenu:true,
      sortable:true,
      filterable : true,
    },
    {
      field: 'outputs',
      title: 'Outputs',
      width:150,
      type: 'outputs',
      columnmenu:false,
      sortable: false,
      groupable: true,
    }
];

DownloadSumission360(newItem: any) {
    this.dashboardservice.downloadSubmission360(newItem.MessageId).subscribe(downloadRes=>{
      const source = `data:application/pdf;base64,${downloadRes.value.data}`;
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
    priority: row.Priority
  }));
  this.inboxservice.saveChanges(saveData).subscribe(response => {
  //   console.log('Save successful:', response);
    console.log('Updated tableData:', this.tableData);
    this.mySelection = [];
  });
}

getSelectedRowsData(): any[] {
  const selectedRows = this.mySelection.map(selectedSubmissionID => {
    return this.gridData.find(item => item.SubmissionID === selectedSubmissionID);
  });
  return selectedRows;
}

reDirect(url:string, param:any){
  let subInfo : SubmissionInfo = {
    SubmissionId : param.SubmissionID,
    SubmissionName : "",
    MessageId : param.MessageId,
    Status : param.Status,
    Extraction : "",
    Completeness : "",
    RiskClearance : "",
    LOB : param.lineOfBusiness
  }
  this.globalService.setCurrentSubmissionId(param)
}
OpenCopilot(item: any) {
  let dialog1: MatDialog;
  const dialogRef = this.dialog.open(CopilotComponent);

  dialogRef.afterClosed().subscribe((result) => {});
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


}
