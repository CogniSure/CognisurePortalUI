import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaximizeDirective } from './directives/maximize.directive';
import { MaterialModule } from '../material/material.module';
import { TableComponent } from './table/table.component';
import { KendoModule } from '../kendo/kendo.module';
import { RatingComponent } from './table/rating.component';

@NgModule({
  declarations: [
    MaximizeDirective,
    TableComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    KendoModule
  ],
  exports:[
    MaximizeDirective,
    TableComponent
  ]
})
export class CoreModule { }

