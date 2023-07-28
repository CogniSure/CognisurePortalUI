import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaximizeDirective } from './directives/maximize.directive';
import { MaterialModule } from '../material/material.module';
import { TableComponent } from './table/table.component';
import { KendoModule } from '../kendo/kendo.module';
import { RatingComponent } from './table/rating.component';
import { MenuComponent } from './menu/menu.component';
import { InboxTopbarComponent } from './inbox-topbar/inbox-topbar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RecentlyViewedComponent } from './recently-viewed/recently-viewed.component';

@NgModule({
  declarations: [
    MaximizeDirective,
    TableComponent,
    RatingComponent,
    MenuComponent,
    InboxTopbarComponent,
    TopbarComponent,
    RecentlyViewedComponent
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

