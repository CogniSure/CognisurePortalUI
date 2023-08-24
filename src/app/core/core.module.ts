import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaximizeDirective } from './directives/maximize.directive';
import { MaterialModule } from '../material/material.module';
import { TableComponent } from './table/table.component';
import { KendoModule } from '../kendo/kendo.module';
import { RatingComponent } from './table/rating.component';
import { SidemenubarComponent } from './menu/sidemenubar.component';
import { InboxTopbarComponent } from './inbox-topbar/inbox-topbar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RecentlyViewedComponent } from './recently-viewed/recently-viewed.component';
import { RouterModule, Routes } from '@angular/router';
import { InboxMenuComponent } from './inbox-menu/inbox-menu.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';

const routes:Routes = [
];
@NgModule({
  declarations: [
    MaximizeDirective,
    TableComponent,
    RatingComponent,
    SidemenubarComponent,
    InboxTopbarComponent,
    TopbarComponent,
    RecentlyViewedComponent,
    InboxMenuComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    KendoModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    MaximizeDirective,
    TableComponent,
    SidemenubarComponent,
    InboxTopbarComponent,
    TopbarComponent,
    RecentlyViewedComponent,
    InboxMenuComponent,
    FooterComponent,
    LoaderComponent
  ]
})
export class CoreModule { }

