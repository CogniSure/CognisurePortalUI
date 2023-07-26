
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { SVGIcon, filePdfIcon, fileExcelIcon } from '@progress/kendo-svg-icons';
import { process } from '@progress/kendo-data-query';
import { employees } from './employees';
import { images } from './images';
@Component({
    selector: 'generic-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
  })
export class AppComponent implements OnInit {
    @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective | undefined;
    public gridData: any[] = employees;
    public gridView!: any[];

    public mySelection: string[] = [];
    public pdfSVG: SVGIcon = filePdfIcon;
    public excelSVG: SVGIcon = fileExcelIcon;

    public ngOnInit(): void {
      
        this.gridView = this.gridData;
        console.log('Employee Data ' + this.gridView);
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
}
