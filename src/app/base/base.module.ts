import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CognisureComponent } from './cognisure/cognisure.component';
import { EpicComponent } from './epic/epic.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    CognisureComponent,
    EpicComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    CognisureComponent,
    EpicComponent
  ]
})
export class BaseModule { }
