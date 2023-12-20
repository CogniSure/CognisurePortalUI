import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboardservice';
import { InboxService } from 'src/app/services/inbox/inbox.service';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public formGroup: FormGroup;
  mySelection: string[] = [];
  public gridData: any[] = [];
  public selectedCheckboxes: number[] = [];
  selectedRowIndices: Set<number> = new Set<number>();
// saveChanges: any;
  constructor(private inboxservice:InboxService,private dashboardservice:DashboardService, private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder)
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
  ngOnInit(): void {
    this.inboxservice.getAllSubmissionData().subscribe(result=>{
      this.tableData = result;

      // this.changedetector.detectChanges();

      this.totalRecordCCount = this.tableData.length;
      this.newRecordCCount = this.tableData.filter(item => item.NewStatus).length;
       this.changeDetectorRef.detectChanges();
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
    width:40,
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
      // template: "#= kendo.toString(kendo.parseDate(EffectiveDate), 'yyyy-MM-dd') #",
      // format: "{0:yyyy-MM-dd}",
      columnmenu:true,
      sortable:true,
      filterable : true,
    },
  // {
  //     field: "AgencyName",
  //     title: "Agency Name",
  //     width:150,
  //     type: "text",
  //     columnmenu:true,
  //     sortable:true,
  //     filterable : true,
  //   },
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
      title: "Quality Score%",
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
      field: "S360Report",
      // format: "{0:c}",
      title: "S360 Report",
      type: "DownloadXL",
      width:120,
      columnmenu:true,
      sortable:true,
      filterable : true,
    },
    {
      field: "AssignedBy",
      format: "{0:c}",
      title: "Assigned By",
      type: "text",
      width:120,
      columnmenu:true,
      sortable:true,
      filterable : true,
    }
];
 
//  [
//   {
//     Id: "1",
//     SubmissionID: "B143-03312302301",
//     AccountName: "Dante Mason",
//     EffectiveDate: "03/01/2023",
//     Type: "New Business",
//     AgencyName: "ACE Insurance",
//     LOB: "Property",
//     Priority: "High",
//     Status : "AutoApproved",
//     AssignedBy: "Auto Assigned",
//     NewStatus: true
//   },
//   {
//     Id: "2",
//     SubmissionID: "B143-03312302302",
//     AccountName: "Duke & Duke",
//     EffectiveDate: "04/01/2023",
//     Type: "Renewal",
//     AgencyName: "Welch Ins Agency",
//     LOB: "Property,GL, WC",
//     Priority: "Low",
//     Status : "ExtractionException",
//     AssignedBy: "John Williams",
//     NewStatus: true
//   },
//   {
//     Id: "3",
//     SubmissionID: "B143-03312302301",
//     AccountName: "Dante Mason",
//     EffectiveDate: "03/01/2023",
//     Type: "New Business",
//     AgencyName: "ACE Insurance",
//     LOB: "Property",
//     Priority: "High",
//     Status : "AutoApproved",
//     AssignedBy: "Auto Assigned",
//     NewStatus: false
//   },
//   {
//     Id: "4",
//     SubmissionID: "B143-03312302302",
//     AccountName: "Duke & Duke",
//     EffectiveDate: "04/01/2023",
//     Type: "Renewal",
//     AgencyName: "Welch Ins Agency",
//     LOB: "Property,GL, WC",
//     Priority: "Low",
//     Status : "ExtractionException",
//     AssignedBy: "John Williams",
//     NewStatus: true
//   },
//   {
//     Id: "5",
//     SubmissionID: "B143-03312302301",
//     AccountName: "Dante Mason",
//     EffectiveDate: "03/01/2023",
//     Type: "New Business",
//     AgencyName: "ACE Insurance",
//     LOB: "Property",
//     Priority: "High",
//     Status : "AutoApproved",
//     AssignedBy: "Auto Assigned",
//     NewStatus: false
//   },
//   {
//     Id: "6",
//     SubmissionID: "B143-03312302302",
//     AccountName: "Duke & Duke",
//     EffectiveDate: "04/01/2023",
//     Type: "Renewal",
//     AgencyName: "Welch Ins Agency",
//     LOB: "Property,GL, WC",
//     Priority: "Low",
//     Status : "ExtractionException",
//     AssignedBy: "John Williams",
//     NewStatus: true
//   },
//   {
//     Id: "7",
//     SubmissionID: "B143-03312302301",
//     AccountName: "Dante Mason",
//     EffectiveDate: "03/01/2023",
//     Type: "New Business",
//     AgencyName: "ACE Insurance",
//     LOB: "Property",
//     Priority: "High",
//     Status : "AutoApproved",
//     AssignedBy: "Auto Assigned",
//     NewStatus: false
//   },
//   {
//     Id: "8",
//     SubmissionID: "B143-03312302302",
//     AccountName: "Duke & Duke",
//     EffectiveDate: "04/01/2023",
//     Type: "Renewal",
//     AgencyName: "Welch Ins Agency",
//     LOB: "Property,GL, WC",
//     Priority: "Low",
//     Status : "ExtractionException",
//     AssignedBy: "John Williams",
//     NewStatus: true
//   },
//   {
//     Id: "9",
//     SubmissionID: "B143-03312302301",
//     AccountName: "Dante Mason",
//     EffectiveDate: "03/01/2023",
//     Type: "New Business",
//     AgencyName: "ACE Insurance",
//     LOB: "Property",
//     Priority: "High",
//     Status : "AutoApproved",
//     AssignedBy: "Auto Assigned",
//     NewStatus: false
//   },
//   {
//     Id: "10",
//     SubmissionID: "B143-03312302302",
//     AccountName: "Duke & Duke",
//     EffectiveDate: "04/01/2023",
//     Type: "Renewal",
//     AgencyName: "Welch Ins Agency",
//     LOB: "Property,GL, WC",
//     Priority: "Low",
//     Status : "ExtractionException",
//     AssignedBy: "John Williams",
//     NewStatus: true
//   },
//   {
//     Id: "11",
//     SubmissionID: "B143-03312302301",
//     AccountName: "Dante Mason",
//     EffectiveDate: "03/01/2023",
//     Type: "New Business",
//     AgencyName: "ACE Insurance",
//     LOB: "Property",
//     Priority: "High",
//     Status : "AutoApproved",
//     AssignedBy: "Auto Assigned",
//   },
//   {
//     Id: "12",
//     SubmissionID: "B143-03312302302",
//     AccountName: "Duke & Duke",
//     EffectiveDate: "04/01/2023",
//     Type: "Renewal",
//     AgencyName: "Welch Ins Agency",
//     LOB: "Property,GL, WC",
//     Priority: "Low",
//     Status : "ExtractionException",
//     AssignedBy: "John Williams",
//     NewStatus: true
//   },
//   {
//     Id: "13",
//     SubmissionID: "B143-03312302301",
//     AccountName: "Dante Mason",
//     EffectiveDate: "03/01/2023",
//     Type: "New Business",
//     AgencyName: "ACE Insurance",
//     LOB: "Property",
//     Priority: "High",
//     Status : "AutoApproved",
//     AssignedBy: "Auto Assigned",
//   },
//   {
//     Id: "14",
//     SubmissionID: "B143-03312302302",
//     AccountName: "Duke & Duke",
//     EffectiveDate: "04/01/2023",
//     Type: "Renewal",
//     AgencyName: "Welch Ins Agency",
//     LOB: "Property,GL, WC",
//     Priority: "Low",
//     Status : "ExtractionException",
//     AssignedBy: "John Williams",
//   },
//   {
//     Id: "15",
//     SubmissionID: "B143-03312302301",
//     AccountName: "Dante Mason",
//     EffectiveDate: "03/01/2023",
//     Type: "New Business",
//     AgencyName: "ACE Insurance",
//     LOB: "Property",
//     Priority: "High",
//     Status : "AutoApproved",
//     AssignedBy: "Auto Assigned",
//   },
//   {
//     Id: "16",
//     SubmissionID: "B143-03312302302",
//     AccountName: "Duke & Duke",
//     EffectiveDate: "04/01/2023",
//     Type: "Renewal",
//     AgencyName: "Welch Ins Agency",
//     LOB: "Property,GL, WC",
//     Priority: "Low",
//     Status : "ExtractionException",
//     AssignedBy: "John Williams",
//   },
//   {
//     Id: "17",
//     SubmissionID: "B143-03312302301",
//     AccountName: "Dante Mason",
//     EffectiveDate: "03/01/2023",
//     Type: "New Business",
//     AgencyName: "ACE Insurance",
//     LOB: "Property",
//     Priority: "High",
//     Status : "AutoApproved",
//     AssignedBy: "Auto Assigned",
//   },
//   {
//     Id: "18",
//     SubmissionID: "B143-03312302302",
//     AccountName: "Duke & Duke",
//     EffectiveDate: "04/01/2023",
//     Type: "Renewal",
//     AgencyName: "Welch Ins Agency",
//     LOB: "Property,GL, WC",
//     Priority: "Low",
//     Status : "ExtractionException",
//     AssignedBy: "John Williams",
//   },
//   {
//     Id: "19",
//     SubmissionID: "B143-03312302301",
//     AccountName: "Dante Mason",
//     EffectiveDate: "03/01/2023",
//     Type: "New Business",
//     AgencyName: "ACE Insurance",
//     LOB: "Property",
//     Priority: "High",
//     Status : "AutoApproved",
//     AssignedBy: "Auto Assigned",
//   },
//   {
//     Id: "20",
//     SubmissionID: "B143-03312302302",
//     AccountName: "Duke & Duke",
//     EffectiveDate: "04/01/2023",
//     Type: "Renewal",
//     AgencyName: "Welch Ins Agency",
//     LOB: "Property,GL, WC",
//     Priority: "Low",
//     Status : "ExtractionException",
//     AssignedBy: "John Williams",
//   }
//];

// getSubmissionDetail(string submissionId){
//   this.inboxService.getSubmissionData("AAMkADU1NjU3NzEyLWMxZTItNDA5Yy04N2E0LTkzYWNjNTc3ZWVlMQBGAAAAAABFiQ8wy3CORZrMw-rLQJlFBwCM8fwoQTOCSY_HjadmsuvGAAAAAAEMAACM8fwoQTOCSY_HjadmsuvGAAKVXoPlAAA=").subscribe(res=>{
//     this.submissionData = res.value;
//     this.globalService.setCurrentSubmission(res)
//   })
// }

DownloadSumission360(newItem: any) {
    this.dashboardservice.downloadSubmission360(newItem.Id).subscribe(downloadRes=>{
      const source = `data:application/pdf;base64,${downloadRes.value.data}`;
      const downloadLink = document.createElement('a');
      const fileName = downloadRes.value.fileName;
  
      downloadLink.href = source;
      downloadLink.download = fileName;
      downloadLink.click();
    });
    
  //this.items.push(newItem);

  // const source = `data:submission360;base64,${rowElement.FileContent}`;
  //   const downloadLink = document.createElement('a');
  //   const fileName = rowElement.FileName;

  //   downloadLink.href = source;
  //   downloadLink.download = fileName;
  //   downloadLink.click();
}

// saveChanges(dataItem: any): void {
//   dataItem.isEditing = true;
// }

// onSaveButtonClick(dataItem?: any): void {
//   if (dataItem) {
//     dataItem.isEditing = true;
//   } else {
//     console.log('No data item provided for editing');
//   }
// }


// getSelectedRowsData(): any[] {
//   return this.selectedCheckboxes.map((index) => this.gridData[index]);
// }

// onSaveButtonClick(): void {
//   const selectedRowsData = this.getSelectedRowsData();
//   console.log('Selected Rows Data:', selectedRowsData);
// }


// onSaveButtonClick(): void {
//   const selectedRowsData = this.getSelectedRowsData();
//   console.log('Selected Rows:', selectedRowsData);

//   const saveData = selectedRowsData.map(row => ({
//     submissionId: row.SubmissionID,
//     priority: row.Priority
//   }));

//   console.log('Save Data:', saveData);

//   this.inboxservice.saveChanges(saveData).subscribe(response => {
//     console.log('Save successful:', response);

//     this.tableData = this.tableData.map(row => {
//       const selectedRow = selectedRowsData.find(selected => selected.SubmissionID === row.SubmissionID);
//       return selectedRow ? { ...row, ...selectedRow } : row;
//     });
//     console.log('Updated tableData:', this.tableData);
//     this.mySelection = [];
//   });
// }






// onSaveButtonClick(): void {
//   const selectedRowsData = this.gridData.filter((_, index) => this.selectedRowIndices.has(index));
//   console.log('Selected Rows:', selectedRowsData);

//   const saveData = selectedRowsData.map(row => ({
//     submissionId: row.SubmissionID,
//     priority: row.Priority
//   }));

//   console.log('Save Data:', saveData);

//   this.inboxservice.saveChanges(saveData).subscribe(response => {
//     console.log('Save successful:', response);

//     // Assuming tableData is an array that stores all the data
//     // Update tableData with the changes (if necessary)
//     this.tableData = this.tableData.map(row => {
//       const selectedRow = selectedRowsData.find(selected => selected.SubmissionID === row.SubmissionID);
//       return selectedRow ? { ...row, ...selectedRow } : row;
//     });

//     console.log('Updated tableData:', this.tableData);

//     // Clear the selection
//     this.selectedRowIndices.clear();
//   });
// }


onSaveButtonClick(): void {
  const selectedRowsData = this.getSelectedRowsData();
  console.log('Selected Rows:', selectedRowsData);


  const saveData = selectedRowsData.map((row: any) => ({
    submissionId: row.SubmissionID,
    priority: row.Priority
  }));

  console.log('Save Data:', saveData);

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

  console.log('Selected Rows Data:', selectedRows);
  return selectedRows;
}



// onSaveButtonClick(): void {
//   const selectedRows = this.mySelection.map(id => this.tableData.find(item => item.Id === id));
//   console.log('Selected Rows:', selectedRows);

//   const saveData = selectedRows.map(row => ({
//     submissionId: row.SubmissionID,
//     priority: row.Priority
//   }));

//   console.log('Save Data:', saveData);

//   this.inboxservice.saveChanges(saveData).subscribe(response => {
//     console.log('Save successful:', response);
//     console.log('Updated tableData:', this.tableData);
//     this.mySelection = [];
//   });
// }


getStatusImage(status: string): string {
  if (status === 'Completed') {
    return '../../../assets/images/execl_downloadimg.png';
  } else if (status === 'In Progress') {
    return '../../../assets/images/disabled_excel.png';
  } else {
    return '../../../assets/images/s360_download-removebg-preview.png';
  }
}


}
