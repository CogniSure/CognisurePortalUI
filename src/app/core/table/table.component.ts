import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { SVGIcon, filePdfIcon, fileExcelIcon } from '@progress/kendo-svg-icons';
import { process } from '@progress/kendo-data-query';
import { employees } from './employees';
import { images } from './images';
import { InboxIconsService } from 'src/app/services/inboxicons.service';
import { State } from "@progress/kendo-data-query";
import { LoaderType, LoaderThemeColor, LoaderSize } from '@progress/kendo-angular-indicators';

interface NavItem {
  title: string;
  routeLink: string;
  isPipeline?: boolean;
  adress?: string;
}

@Component({
  selector: 'generic-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  navItems = [
    { title: 'Create Submisson', content: '', icon: 'add_box' },
    { title: '', content: '', icon: 'refresh' },
    { title: '', routeLink: '', icon: 'description' },
    { title: '', routeLink: '/contact', icon: 'filter_alt' },
    { title: '', routeLink: '', icon: 'settings' },
    { title: 'All 24', routeLink: '/contact', icon: '' },
    { title: 'New 4', routeLink: '/contact', icon: '' },
    { title: 'Pending Review 5', routeLink: '', icon: '', icon1: '' },
    { title: 'Rush 1', routeLink: '', icon: '', icon1: '' },
    { title: 'Evelyn Salt', routeLink: '', icon: 'arrow_drop_down', icon1: '' },
  ];
  loading = false;
  customColumns: any[] = [
    {
      field: 'Id',
      title: '',
      width: 40,
      type: 'checkbox',
      filterable: false,
      sortable: false,
      groupable: true,
    },
    {
      field: 'alerts',
      title: 'Alerts',
      type: 'alerts',
      sortable: false,
      groupable: true,
    },
    {
      field: 'SubmissionID',
      format: '{0:c}',
      title: 'Submission ID',
      type: 'link',
      sortable: true,
      groupable: true,
      template: this.submissionIdTemplate,
    },
    {
      field: 'AccountName',
      title: 'Account Name',
      type: 'text',
      sortable: false,
      groupable: true,
    },
    {
      field: 'EffectiveDate',
      format: '{0:c}',
      title: 'Effective Date',
      type: 'text',
      sortable: true,
      groupable: false,
    },
    {
      field: 'Type',
      format: '{0:c}',
      title: 'Type',
      type: 'text',
      sortable: true,
      groupable: false,
    },
    {
      field: 'AgencyName',
      title: 'Agency Name',
      type: 'text',
      sortable: false,
      groupable: false,
    },
    {
      field: 'LOB',
      format: '{0:c}',
      title: 'LOB',
      type: 'text',
      sortable: true,
      groupable: false,
    },
    {
      field: 'Priority',
      format: '{0:c}',
      title: 'Priority',
      type: 'text',
      sortable: true,
      groupable: false,
    },
    {
      field: 'Status',
      format: '{0:c}',
      title: 'Status',
      type: 'text',
      sortable: true,
      groupable: false,
    },
    {
      field: 'AssignedBy',
      format: '{0:c}',
      title: 'Assigned By',
      type: 'text',
      sortable: true,
      groupable: false,
    },
  ];
  data1 = [
    {
      Id: '1',
      SubmissionID: 'B143-03312302301',
      AccountName: 'Dante Mason',
      EffectiveDate: '03/01/2023',
      Type: 'New Business',
      AgencyName: 'ACE Insurance',
      LOB: 'Property',
      Priority: 'High',
      Status: 'AutoApproved',
      AssignedBy: 'Auto Assigned',
    },
    {
      Id: '2',
      SubmissionID: 'B143-03312302302',
      AccountName: 'Duke & Duke',
      EffectiveDate: '04/01/2023',
      Type: 'Renewal',
      AgencyName: 'Welch Ins Agency',
      LOB: 'Property,GL, WC',
      Priority: 'Low',
      Status: 'ExtractionException',
      AssignedBy: 'John Williams',
    },
    {
      Id: '3',
      SubmissionID: 'B143-03312302301',
      AccountName: 'Dante Mason',
      EffectiveDate: '03/01/2023',
      Type: 'New Business',
      AgencyName: 'ACE Insurance',
      LOB: 'Property',
      Priority: 'High',
      Status: 'AutoApproved',
      AssignedBy: 'Auto Assigned',
    },
    {
      Id: '4',
      SubmissionID: 'B143-03312302302',
      AccountName: 'Duke & Duke',
      EffectiveDate: '04/01/2023',
      Type: 'Renewal',
      AgencyName: 'Welch Ins Agency',
      LOB: 'Property,GL, WC',
      Priority: 'Low',
      Status: 'ExtractionException',
      AssignedBy: 'John Williams',
    },
    {
      Id: '5',
      SubmissionID: 'B143-03312302301',
      AccountName: 'Dante Mason',
      EffectiveDate: '03/01/2023',
      Type: 'New Business',
      AgencyName: 'ACE Insurance',
      LOB: 'Property',
      Priority: 'High',
      Status: 'AutoApproved',
      AssignedBy: 'Auto Assigned',
    },
    {
      Id: '6',
      SubmissionID: 'B143-03312302302',
      AccountName: 'Duke & Duke',
      EffectiveDate: '04/01/2023',
      Type: 'Renewal',
      AgencyName: 'Welch Ins Agency',
      LOB: 'Property,GL, WC',
      Priority: 'Low',
      Status: 'ExtractionException',
      AssignedBy: 'John Williams',
    },
    {
      Id: '7',
      SubmissionID: 'B143-03312302301',
      AccountName: 'Dante Mason',
      EffectiveDate: '03/01/2023',
      Type: 'New Business',
      AgencyName: 'ACE Insurance',
      LOB: 'Property',
      Priority: 'High',
      Status: 'AutoApproved',
      AssignedBy: 'Auto Assigned',
    },
    {
      Id: '8',
      SubmissionID: 'B143-03312302302',
      AccountName: 'Duke & Duke',
      EffectiveDate: '04/01/2023',
      Type: 'Renewal',
      AgencyName: 'Welch Ins Agency',
      LOB: 'Property,GL, WC',
      Priority: 'Low',
      Status: 'ExtractionException',
      AssignedBy: 'John Williams',
    },
    {
      Id: '9',
      SubmissionID: 'B143-03312302301',
      AccountName: 'Dante Mason',
      EffectiveDate: '03/01/2023',
      Type: 'New Business',
      AgencyName: 'ACE Insurance',
      LOB: 'Property',
      Priority: 'High',
      Status: 'AutoApproved',
      AssignedBy: 'Auto Assigned',
    },
    {
      Id: '10',
      SubmissionID: 'B143-03312302302',
      AccountName: 'Duke & Duke',
      EffectiveDate: '04/01/2023',
      Type: 'Renewal',
      AgencyName: 'Welch Ins Agency',
      LOB: 'Property,GL, WC',
      Priority: 'Low',
      Status: 'ExtractionException',
      AssignedBy: 'John Williams',
    },
    {
      Id: '11',
      SubmissionID: 'B143-03312302301',
      AccountName: 'Dante Mason',
      EffectiveDate: '03/01/2023',
      Type: 'New Business',
      AgencyName: 'ACE Insurance',
      LOB: 'Property',
      Priority: 'High',
      Status: 'AutoApproved',
      AssignedBy: 'Auto Assigned',
    },
    {
      Id: '12',
      SubmissionID: 'B143-03312302302',
      AccountName: 'Duke & Duke',
      EffectiveDate: '04/01/2023',
      Type: 'Renewal',
      AgencyName: 'Welch Ins Agency',
      LOB: 'Property,GL, WC',
      Priority: 'Low',
      Status: 'ExtractionException',
      AssignedBy: 'John Williams',
    },
    {
      Id: '13',
      SubmissionID: 'B143-03312302301',
      AccountName: 'Dante Mason',
      EffectiveDate: '03/01/2023',
      Type: 'New Business',
      AgencyName: 'ACE Insurance',
      LOB: 'Property',
      Priority: 'High',
      Status: 'AutoApproved',
      AssignedBy: 'Auto Assigned',
    },
    {
      Id: '14',
      SubmissionID: 'B143-03312302302',
      AccountName: 'Duke & Duke',
      EffectiveDate: '04/01/2023',
      Type: 'Renewal',
      AgencyName: 'Welch Ins Agency',
      LOB: 'Property,GL, WC',
      Priority: 'Low',
      Status: 'ExtractionException',
      AssignedBy: 'John Williams',
    },
    {
      Id: '15',
      SubmissionID: 'B143-03312302301',
      AccountName: 'Dante Mason',
      EffectiveDate: '03/01/2023',
      Type: 'New Business',
      AgencyName: 'ACE Insurance',
      LOB: 'Property',
      Priority: 'High',
      Status: 'AutoApproved',
      AssignedBy: 'Auto Assigned',
    },
    {
      Id: '16',
      SubmissionID: 'B143-03312302302',
      AccountName: 'Duke & Duke',
      EffectiveDate: '04/01/2023',
      Type: 'Renewal',
      AgencyName: 'Welch Ins Agency',
      LOB: 'Property,GL, WC',
      Priority: 'Low',
      Status: 'ExtractionException',
      AssignedBy: 'John Williams',
    },
    {
      Id: '17',
      SubmissionID: 'B143-03312302301',
      AccountName: 'Dante Mason',
      EffectiveDate: '03/01/2023',
      Type: 'New Business',
      AgencyName: 'ACE Insurance',
      LOB: 'Property',
      Priority: 'High',
      Status: 'AutoApproved',
      AssignedBy: 'Auto Assigned',
    },
    {
      Id: '18',
      SubmissionID: 'B143-03312302302',
      AccountName: 'Duke & Duke',
      EffectiveDate: '04/01/2023',
      Type: 'Renewal',
      AgencyName: 'Welch Ins Agency',
      LOB: 'Property,GL, WC',
      Priority: 'Low',
      Status: 'ExtractionException',
      AssignedBy: 'John Williams',
    },
    {
      Id: '19',
      SubmissionID: 'B143-03312302301',
      AccountName: 'Dante Mason',
      EffectiveDate: '03/01/2023',
      Type: 'New Business',
      AgencyName: 'ACE Insurance',
      LOB: 'Property',
      Priority: 'High',
      Status: 'AutoApproved',
      AssignedBy: 'Auto Assigned',
    },
    {
      Id: '20',
      SubmissionID: 'B143-03312302302',
      AccountName: 'Duke & Duke',
      EffectiveDate: '04/01/2023',
      Type: 'Renewal',
      AgencyName: 'Welch Ins Agency',
      LOB: 'Property,GL, WC',
      Priority: 'Low',
      Status: 'ExtractionException',
      AssignedBy: 'John Williams',
    },
  ];
  dropdownValues: string[] = [];
  isToggleOn: boolean = false;
  dropdownOptions: { label: string; link: string }[] = [];
  isDataAvailble = false;

  @Input() data: any[];

  @Input() columns: any;

  constructor(public inboxiconsService: InboxIconsService) {
    this.loading=true
  }

  @ViewChild(DataBindingDirective) dataBinding:
    | DataBindingDirective
    | undefined;
  public gridData: any[];
  public gridView!: any[];

  public mySelection: string[] = [];
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;

  
  public ngOnInit(): void {
    this.loading=true;
    console.log(Date.now())
    setTimeout(()=>31000)
    console.log(Date.now())
    this.gridData = this.data;
    this.gridView = this.data;

    this.fetchDropdownOptions();
    this.loading=false;
  }

  public onFilter(value: Event): void {
    const inputValue = value;

    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'full_name',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'job_title',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'budget',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'phone',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'address',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    if (this.dataBinding != undefined) {
      this.dataBinding.skip = 0;
    }
  }

  public photoURL(dataItem: { img_id: string; gender: string }): string {
    const code: string = dataItem.img_id + dataItem.gender;
    const image: { [Key: string]: string } = images;

    return image[code];
  }

  public flagURL(dataItem: { country: string }): string {
    const code: string = dataItem.country;
    const image: { [Key: string]: string } = images;

    return image[code];
  }

  fetchDropdownOptions(): void {
    this.dropdownOptions = this.inboxiconsService.getDropdownOptions();
  }

  onSelectOption(option: string): void {}

  toggleDropdown(): void {
    this.isToggleOn = !this.isToggleOn;
  }




  submissionIdTemplate(dataItem: any): string {
    return `
      <div>
        <img src="../../../assets/images/Extraction.svg" style="padding-right: 0.25em;" />
        <a routerLink="/inbox/detail/summary" [ngStyle]="{ color: 'blue' }">
          ${dataItem.SubmissionID}
        </a>
      </div>`
  }
  




  
}
