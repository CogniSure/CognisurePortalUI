import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InboxService } from 'src/app/services/inbox/inbox.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private inboxservice:InboxService)
  {

  }
  dropdownValues: string[] = [];
  isToggleOn: boolean = false;
  dropdownOptions: { label: string; link: string }[] = [];
  isDataAvailble = false;
  tableData: any[]
  ngOnInit(): void {
    this.inboxservice.getAllSubmissionData().subscribe(result=>{
      this.tableData = result;
      // this.changedetector.detectChanges();
      console.log("Inbox Data");
      console.log(this.tableData);
    })
  }
 
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
    width:100,
    type: 'alerts',
    columnmenu:false,
    sortable: false,
    groupable: true,
  },
  {
    field: "SubmissionID",
    format: "{0:c}",
    title: "Submission ID",
    width:250,
    type: "SubmissionId",
    sortable:true,
    columnmenu:true,
    filterable : true,
    IsNew:"NewStatus"
  },
  {
      field: "AccountName",
      title: "Account Name",
      type: "text",
      width:180,
      sortable:false,
      columnmenu:true,
    },
    {
      field: "EffectiveDate",
      format: "{0:c}",
      title: "Effective Date",
      width:180,
      type: "text",
      sortable:true,
      columnmenu:true,
    },
  {
      field: "AgencyName",
      title: "Agency Name",
      width:180,
      type: "text",
      sortable:false,
      columnmenu:true,
    },
    {
      field: "LOB",
      format: "{0:c}",
      title: "LOB",
      type: "text",
      width:180,
      sortable:true,
      columnmenu:true,
    },
    {
      field: "Priority",
      format: "{0:c}",
      title: "Priority",
      width:150,
      type: "text",
      sortable:true,
      columnmenu:true,
    },
    {
      field: "Status",
      format: "{0:c}",
      title: "Status",
      type: "text",
      width:180,
      sortable:true,
      columnmenu:true,
    },
    {
      field: "AssignedBy",
      format: "{0:c}",
      title: "Assigned By",
      type: "text",
      sortable:true,
      columnmenu:true,
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
//     console.log("Test");
//     this.submissionData = res.value;
//     console.log(res)
//     this.globalService.setCurrentSubmission(res)
//   })
// }
}
