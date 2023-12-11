import { ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { SVGIcon, filePdfIcon, fileExcelIcon } from '@progress/kendo-svg-icons';
import { process } from '@progress/kendo-data-query';
import { employees } from './employees';
import { images } from './images';
import { InboxIconsService } from 'src/app/services/inboxicons.service';
import { State } from "@progress/kendo-data-query";
import { LoaderType, LoaderThemeColor, LoaderSize } from '@progress/kendo-angular-indicators';
import {
  SelectableSettings,
  SelectableMode,
} from "@progress/kendo-angular-grid";
import { GlobalService } from 'src/app/services/common/global.service';
import { SubmissionInfo } from 'src/app/model/inbox/SubmissionInfo';
import { alertsData } from 'src/app/model/sidenav/nav-data';
import { navbarData } from '../../model/sidenav/nav-data';
import {Alert1ToolTip} from '../../model/constants/tooltipDetails';
import { DataComponent } from 'src/app/model/samples/data';
import {
  shareIcon,
  arrowDownIcon,
  facebookIcon,
  twitterIcon,
  linkedinIcon,
  redditIcon,
} from "@progress/kendo-svg-icons";

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
export class TableComponent implements OnInit,OnChanges,OnDestroy {
   loading = false;
  dropdownValues: string[] = [];
  isToggleOn: boolean = false;
  dropdownOptions: { label: string; link: string }[] = [];
  isDataAvailble = false;
  navData = alertsData;
  cellExpansionState: boolean[] = [];

  public gridData: any[];
  public gridView!: any[];

  public mySelection: string[] = [];
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;
  public selectableSettings: SelectableSettings;
  public svgShare: SVGIcon = shareIcon;
  public svgArrow: SVGIcon = arrowDownIcon;


  @ViewChild("generictable") dataBinding: DataBindingDirective;
  @Input() data: any[];
  @Input() columns: any;
  @Input() height: number = 42;

  constructor(public globalService: GlobalService,private changedetector: ChangeDetectorRef) {
    this.loading=true
  }

  tooltip = Alert1ToolTip;

  @HostListener('unloaded')
  ngOnDestroy(): void {
    
  }


  
  public ngOnInit(): void {
    this.loading=true;
    this.selectableSettings = {
      checkboxOnly: true,
      mode: "multiple",
      drag: true,
    };
    this.gridData = this.data;
    this.gridView = this.data;
    this.loading=false;
  }

  alertsInfo = DataComponent.Tooltip;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes!=null && changes['data']!=null ) {
      this.data = changes['data'].currentValue;
      this.gridData = this.data;
      this.gridView = this.data;
      //this.gridView = process(this.data, this.state)
      //this.gridData = process(this.data, this.state)
      //this.dataBinding.data=this.data;
      //this.dataBinding.rebind();
      //this.dataBinding.dataChanged = true;
      //this.dataBinding.notifyDataChange();
      //this.changedetector.detectChanges()
    }
    
  }
  public onFilter(value: Event): void {
    const inputValue = value;
    let custFilters :any[] = []
    this.columns.forEach( (col:any) => {
      custFilters.push(
        {
          field: col.field,
          operator: 'contains',
          value: inputValue,
        }
      );
    })
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters : custFilters
      },
    }).data;

    if (this.dataBinding != undefined) {
      this.dataBinding.skip = 0;
    }
  }
  onSelectOption(option: string): void {}

  toggleDropdown(): void {
    this.isToggleOn = !this.isToggleOn;
  }


  onCheckBoxClick(e:any, rowIndex:any, dataItem:any) {

    // perform the desired custom logic for selecting items based on the currently selected
    // ones, and the checkbox being shift-clicked
  }

  // submissionIdTemplate(dataItem: any): string {
  //   return `
  //     <div>
  //       <img src="../../../assets/images/Extraction.svg" style="padding-right: 0.25em;" />
  //       <a routerLink="/inbox/detail/summary" [ngStyle]="{ color: 'blue' }">
  //         ${dataItem.SubmissionID}
  //       </a>
  //     </div>`
  // }
  

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


  toggleCellExpansion(dataItem: any) {
    const rowIndex = this.gridData.indexOf(dataItem);
    this.cellExpansionState[rowIndex] = !this.cellExpansionState[rowIndex];
  }

  // selectedValue =  { label: 'Export', link: '/option1', icon: 'export' };
  // dropdownOption = [
  //   { label: 'Export', link: '/option1', icon: 'export' },
  //   { label: 'Lisa Scott', link: '/option2', icon: 'user' },
  //   { label: 'John Williams', link: '/option3', icon: 'user' },
  // ];

  public complexValue = { text: "Export", id: 2 };
  // public Operands: Array<string> = [
  //   "Equals",
  //   "Less Than",
  //   "Greter Than",
  // ];
  // public ValidationConditions: Array<string> = [
  //   "Fail if any Failed",
  //   "Fail if all Failed",
  //   "Pass if any Passed",
  //   "Pass if all Passed"
  // ];
  // public ValidationRules : string[] = [
  //   "Missing data",
  //   "Reconciliation Issue",
  //   "Format Issue"
  // ];
  // public CognisureValidations: Array<string> = [
  //   "Select",
  //   "Missing data",
  //   "Reconciliation Issue",
  //   "Format Issue",
  //   "Invalid date",
  //   "Bad Data",
  //   "Bad Amount",
  //   "Invalid number",
  //   "Invalid check",
  //   "Others",
  //   "Non standard data",
  //   "Total Incurred Mismatch",
  //   "Claim Count Mismatch"
  // ];
  // public Condition : string[] = [
  //   "And",
  //   "Or"
  // ]
  public treeItems: any[] = [
    {
      text: "Export as pdf",
    },
    {
      text: "Export as XL",
    }
  ];

  selectedValue: any; // Assuming your data structure for selectedValue
  dropdownOption = [
    { label: 'Option 1', value: 'value1', imageUrl: '../../../' },
    { label: 'Option 2', value: 'value2', imageUrl: 'PDF.svg' },
    // other items
  ];

 
  // public shareData = [
  //   {
  //     text: "Export as XL",
  //     imageUrl: "../../../assets/images/XL.svg",
  //     isDisabled: false,
  //   },
  //   {
  //     text: "Export as pdf",
  //     imageUrl: "../../../assets/images/PDF.svg",
  //     isDisabled: false,
  //   }
  // ];


  // public exdata = [
  //   {
  //     text: "Export as pdf",
  //     imageUrl:"../../../assets/images/PDF.svg",
  //   },
  //   {
  //     text: "Export as XL",
  //     imageUrl:"../../../assets/images/XL.svg",
  //   },
  // ];

  public export :any[]= [
    {
      text: "excel",
    },
    {
      text: "pdf",
    },
  ];

  

  // onButtonClick(action: string) {
  //   console.log(`Button clicked: ${action}`);
  // }


  // public svgArrow1: string = 'arrow-icon'; 
  

  // public shareData1 = [
  //   {
  //     text: 'Export as XL',
  //     iconClass: 'k-icon k-i-excel',
  //     isDisabled: false,
  //   },
  //   {
  //     text: 'Export as PDF',
  //     iconClass: 'k-icon k-i-pdf',
  //     isDisabled: false,
  //   },
  // ];

  onButtonClick(action: string) {
    // Handle button click based on the action
    console.log(`Button clicked: ${action}`);
  }

  download(rowElement: any) {
    const source = `data:submission360;base64,${rowElement.FileContent}`;
    const downloadLink = document.createElement('a');
    const fileName = rowElement.FileName;

    downloadLink.href = source;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  // generateDummyReportUrl(): string {
  //   // Assuming a base URL and a unique identifier for the report
  //   const baseUrl = 'http://localhost:4200/#/inbox/detail/summary';
  //   const uniqueIdentifier = Math.floor(Math.random() * 1000); // Replace this with your logic
  
  //   // Combining the base URL and unique identifier to create a dummy report URL
  //   const dummyReportUrl = `${baseUrl}report-${uniqueIdentifier}.xlsx`;
  
  //   return dummyReportUrl;
  // }

  // generateDownloadLink(reportUrl: string): string {
  //   if (reportUrl) {
  //     return reportUrl;
  //   } else {
  //     return this.generateDummyReportUrl();
  //   }
  // }

}
