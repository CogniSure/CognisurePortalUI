import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CognisureComponent } from './cognisure/cognisure.component';
import { EpicComponent } from './epic/epic.component';



@NgModule({
  declarations: [
    CognisureComponent,
    EpicComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BaseModule { }
