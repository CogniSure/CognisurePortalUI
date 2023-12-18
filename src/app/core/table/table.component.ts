import { ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { SVGIcon, filePdfIcon, fileExcelIcon } from '@progress/kendo-svg-icons';
import { process } from '@progress/kendo-data-query';
import { employees } from './employees';
import { images } from './images';
import { InboxIconsService } from 'src/app/services/inboxicons.service';
import { State } from "@progress/kendo-data-query";
import { LoaderType, LoaderThemeColor, LoaderSize } from '@progress/kendo-angular-indicators';
import { Output, EventEmitter } from '@angular/core';
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
import { NgModel } from '@angular/forms';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TextBoxModule } from '@progress/kendo-angular-inputs';

interface NavItem {
  title: string;
  routeLink: string;
  isPipeline?: boolean;
  adress?: string;
}

export interface DropdownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'generic-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit,OnChanges,OnDestroy {
  public formGroup: FormGroup;
   loading = false;
  dropdownValues: string[] = [];
  isToggleOn: boolean = false;
  // saveChanges: any;
  // dropdownOptions: { label: string; link: string }[] = [];
  dropdownData: { label: string; value: string }[] = [
    { label: 'High', value: 'value1' },
    { label: 'Low', value: 'value2' },
    { label: 'Medium', value: 'value3' },
    // ...
  ];
  isDataAvailble = false;
  navData = alertsData;
  cellExpansionState: boolean[] = [];
  selectedValue: { label: string; value: string };
  // selectedValues: { [key: string]: { label: string; value: string } } = {};

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
  dataLoaded: any;
newValue: string;
  tableData: any;

  constructor(public globalService: GlobalService,private changedetector: ChangeDetectorRef,private fb: FormBuilder) {
    this.loading=true

    this.formGroup = this.fb.group({
      agencyname: [''],
    });

  }

  tooltip = Alert1ToolTip;

  @HostListener('unloaded')
  ngOnDestroy(): void {
    
  }

  @Output() newDownloadEvent = new EventEmitter<string>();

  DownloadEvent(value: any) {
    this.newDownloadEvent.emit(value);
  }
  
  public ngOnInit(): void {
    this.loading=true;
    this.selectableSettings = {
      checkboxOnly: true,
      mode: "multiple",
      drag: true,
    };

// this.gridData.forEach((row) => {
//     this.selectedValues[row.id] = { label: 'High', value: 'value1' };
//   });

    this.gridData = this.data;
    this.gridView = this.data;
    this.loading=false;
    this.dataLoaded = true;
    this.selectedValue = { label: 'High', value: 'option1' };
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

  public export :any[]= [
    {
      text: "excel",
    },
    {
      text: "pdf",
    },
  ];

  
  onButtonClick(action: string) {
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

  priorityDropdownOptions = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];
  
  isCellEditable(dataItem: any, column: any): boolean {
    return true;
    return column.type === 'agencyname';
  }

  // isCellEditable(dataItem: any, column: any): boolean {
  //   return column.type === 'agencyname';
  // }
  
  toggleEditMode(dataItem: any): void {
    dataItem.isEditing = true;
  }

  saveChanges(dataItem: any): void {
    dataItem.isEditing = true;
  }

  cancelEdit(dataItem: any): void {
    dataItem.isEditing = false;
  }

  editedItems: Set<number> = new Set<number>();
  isInEditMode(item: any): boolean {
    return this.editedItems.has(item.id);
  }
  
  onEditValueChange(newValue: string, item: any, column: any, event: Event): void {
    item[column.field] = newValue;
    if (newValue !== item[column.field]) {
      this.editedItems.add(item.id);
    } else {
      this.editedItems.delete(item.id);
    }
  }

  onDropdownChange(dataItem: any, newValue: string): void {
    dataItem.dropdownValue = newValue;
  }


}
