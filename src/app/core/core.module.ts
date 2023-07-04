import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaximizeDirective } from './directives/maximize.directive';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    MaximizeDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports:[
    MaximizeDirective,
  ]
})
export class CoreModule { }

