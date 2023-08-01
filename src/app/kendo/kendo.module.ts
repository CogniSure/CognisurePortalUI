import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataBindingDirective, ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { SVGIcon, filePdfIcon, fileExcelIcon } from '@progress/kendo-svg-icons';
import { process } from '@progress/kendo-data-query';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { IconsModule, SVGIconModule } from '@progress/kendo-angular-icons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { ContextMenuModule, MenuModule } from '@progress/kendo-angular-menu';
import { ListViewModule } from "@progress/kendo-angular-listview";

const routes:Routes = [
];
const KendoComponents = [];

@NgModule({
  declarations: [
    
  ],
  imports: [
    GridModule,
    ChartsModule,
    DialogModule,
    InputsModule,
    ButtonsModule,
    LayoutModule,
    IconsModule,
    SVGIconModule,
    DateInputsModule,
    DropDownsModule,
    PDFExportModule ,
    ExcelExportModule,
    PDFModule,
    ExcelModule,
    MenuModule,
    ContextMenuModule,
    ListViewModule 
  ],
  exports:[
    GridModule,
    ChartsModule,
    DialogModule,
    InputsModule,
    ButtonsModule,
    LayoutModule,
    IconsModule,
    SVGIconModule,
    DateInputsModule,
    DropDownsModule,
    PDFExportModule ,
    ExcelExportModule,
    PDFModule,
    ExcelModule,
    MenuModule,
    ContextMenuModule,
    ListViewModule 
  ]
})
export class KendoModule { }
