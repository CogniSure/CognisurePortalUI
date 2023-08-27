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
  
  public gridData: any[];
  public gridView!: any[];

  public mySelection: string[] = [];
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;
  public selectableSettings: SelectableSettings;

  @ViewChild("generictable") dataBinding: DataBindingDirective;
  @Input() data: any[];
  @Input() columns: any;
  @Input() height: number = 42;

  constructor(public globalService: GlobalService,private changedetector: ChangeDetectorRef) {
    this.loading=true
  }
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
      RiskClearance : ""
    }
    this.globalService.setCurrentSubmissionId(param)
  }


  
}
