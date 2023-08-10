
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { SVGIcon, filePdfIcon, fileExcelIcon } from '@progress/kendo-svg-icons';
import { process } from '@progress/kendo-data-query';
import { employees } from './employees';
import { images } from './images';
import { InboxIconsService } from 'src/app/services/inboxicons.service';

interface NavItem {
    title: string;
    routeLink: string;
    isPipeline?: boolean; 
    adress?: string; 
  }


@Component({
    selector: 'generic-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
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
        { title: 'Evelyn Salt', routeLink: '', icon: 'arrow_drop_down', icon1: '' }
      ];
      
     
      dropdownValues: string[] = [];
      isToggleOn: boolean = false;
      dropdownOptions: { label: string; link: string }[] = [];
      isDataAvailble = false;
      




    @Input() data: any[];
    @Input() columns: any;

    constructor(public inboxiconsService: InboxIconsService) {
    }

    @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective | undefined;
    public gridData: any[];
    public gridView!: any[]; 

    public mySelection: string[] = [];
    public pdfSVG: SVGIcon = filePdfIcon;
    public excelSVG: SVGIcon = fileExcelIcon;

    public ngOnInit(): void {
        console.log(JSON.stringify(this.columns)); 
        this.gridData = this.data;
        this.gridView = this.data;        

        this.fetchDropdownOptions();
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

        if (this.dataBinding != undefined)
        {
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
    
      onSelectOption(option: string): void {
       
      }
    
      toggleDropdown(): void {
        this.isToggleOn = !this.isToggleOn;
      }



}
