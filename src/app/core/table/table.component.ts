import { ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { SVGIcon, filePdfIcon, fileExcelIcon } from '@progress/kendo-svg-icons';
import { process } from '@progress/kendo-data-query';
import { Output, EventEmitter } from '@angular/core';
import {
  SelectableSettings,
} from "@progress/kendo-angular-grid";
import { GlobalService } from 'src/app/services/common/global.service';
import { SubmissionInfo } from 'src/app/model/inbox/SubmissionInfo';
import { OutputIcons, alertsData } from 'src/app/model/sidenav/nav-data';
import {Alert1ToolTip} from '../../model/constants/tooltipDetails';
import { DataComponent } from 'src/app/model/samples/data';
import {
  shareIcon,
  arrowDownIcon,
} from "@progress/kendo-svg-icons";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

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

export interface SubmissionData {
  Status: string;
  statusImage: string;
}

@Component({
  selector: 'generic-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit,OnChanges,OnDestroy {
  showSpinner = false;
  public selectedCheckboxes: number[] = [];
  selectedItemId: number | null = null;
  selectedCheckbox: number | null = null;
  selectedRowIndices: Set<number> = new Set<number>();
  public formGroup: FormGroup;
   loading = false;
  dropdownValues: string[] = [];
  isToggleOn: boolean = false;
  isPopupVisible = false;
  popupAnchor: HTMLElement;
  // saveChanges: any;
  // dropdownOptions: { label: string; link: string }[] = [];
  dropdownData: { label: string; value: string }[] = [
    { label: 'High', value: 'value1' },
    { label: 'Medium', value: 'value3' },
    { label: 'Low', value: 'value2' },
  ];
  isDataAvailble = false;
  navData = alertsData;
  outputIcons = OutputIcons;
  cellExpansionState: boolean[] = [];
  selectedValue: { label: string; value: string };
 
  public dialog: MatDialog;
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
  @Input() columns: any[] = [];
  @Input() height: number = 42;
  dataLoaded: any;
  newValue: string;
  tableData: any;

  constructor(public globalService: GlobalService,private changedetector: ChangeDetectorRef,private fb: FormBuilder) {
   this.formGroup = this.fb.group({
      agencyname: [''],
    });

  }

  tooltip = Alert1ToolTip;

  @HostListener('unloaded')
  ngOnDestroy(): void {
    
  }

  @Output() DownloadEvent = new EventEmitter<string>();

  Download_Click(value: any) {
    this.DownloadEvent.emit(value);
  }
  @Output() CopilotEvent = new EventEmitter<string>();

  Copilot_Click(value: any) {
    this.CopilotEvent.emit(value);
  }
  @Output() IDclickEvent = new EventEmitter<string>();

  ID_Clicked(value: any) {
    this.IDclickEvent.emit(value);
  }
  @Output() MessageEvent = new EventEmitter<string>();

  Message_Clicked(value: any) {
    this.MessageEvent.emit(value);
  }
  public ngOnInit(): void {
    this.showSpinner = true;
    this.loading=true;
    this.selectableSettings = {
      checkboxOnly: true,
      mode: "multiple",
      drag: true,
    };


    this.gridData = this.data;
    this.gridView = this.data;
    this.loading=false;
    this.dataLoaded = true;
    this.showSpinner = false;
    this.selectedValue = { label: 'High', value: 'option1' };

  }

  alertsInfo = DataComponent.Tooltip;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes!=null && changes['data']!=null ) {
      this.showSpinner = false;
      this.data = changes['data'].currentValue;
      this.gridData = this.data;
      this.gridView = this.data;
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


  toggleCellExpansion(dataItem: any) {
    const rowIndex = this.gridData.indexOf(dataItem);
    this.cellExpansionState[rowIndex] = !this.cellExpansionState[rowIndex];
  }

  public complexValue = { text: "Export", id: 2 };
  
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

  priorityDropdownOptions = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];

  s360PendingimgPath = '../../../assets/icons/S360Report.svg';
  convaiPendingimgPath = '../../../assets/icons/ConversationAI.svg';
  insgihtsPending = '../../../assets/icons/Insights.svg';
  
  isCellEditable(dataItem: any, column: any): boolean {
    return true;
    return column.type === 'agencyname';
  }

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

  onCheckboxChange(columnIndex: number): void {
    this.selectedCheckbox = columnIndex;
  }

  onCheckBoxClick(e: any, rowIndex: number, dataItem: any): void {
    if (e.target.checked) {
      this.mySelection.push(dataItem.SubmissionID);
    } else {
      this.mySelection = this.mySelection.filter(id => id !== dataItem.SubmissionID);
    }
    console.log('mySelection:', this.mySelection);
  }

  isAllSelected(): boolean {
    return this.selectedCheckboxes.length === this.gridData.length;
  }

  getSelectedRowsData(): any[] {
    return this.mySelection.map(selectedSubmissionID => {
      return this.gridData.find(item => item.SubmissionID === selectedSubmissionID);
    });
  }

  isSelected(dataItem: any): boolean {
    return this.mySelection.some(item => item === dataItem);
  }
  
  onCheckBoxChange(event: any, dataItem: any): void {
    if (event.target.checked) {
      this.mySelection.push(dataItem); 
    } else {
      const index = this.mySelection.findIndex(item => item === dataItem);
      if (index !== -1) {
        this.mySelection.splice(index, 1); 
      }
    }
  }

  togglePopup(dataItem:any) {
    console.log("Selected Items")
    console.log(dataItem)
    this.isPopupVisible = !this.isPopupVisible;
  }

  closePopup() {
    this.isPopupVisible = false;
  }
  public exportButtons = [
    {
      id: 1,
      actionName: "Export as Excel",
      icon : "../../../assets/images/XL.svg",
      click : (dataItem: any): void => {
        console.log(`${dataItem.actionName}ing last action.`);
      },
    },
    {
      id: 2,
      actionName : "Export as PDF",
      icon : "../../../assets/images/PDF.svg",
      click : (dataItem: any): void => {
        console.log(`${dataItem.actionName}ing last action.`);
      },
    }
  ];

  public exportItemClick(e:any, grid: any) {
    if(e.id === 1) {
      grid.saveAsExcel();
    } else if(e.id === 2) {
      grid.saveAsPDF();
    }
  }
}
