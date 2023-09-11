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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { CopilotComponent } from './copilot/copilot.component';
import { InputComponent } from './generic/input/input.component';
import { TooltipComponent } from './generic/tooltip/tooltip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidationErrorsComponent } from './generic/validation-errors/validation-errors.component';

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
    LoaderComponent,
    InputComponent,
    TooltipComponent,
    ValidationErrorsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    KendoModule,
    FormsModule,
    ReactiveFormsModule,
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
    LoaderComponent,
    InputComponent,
    ValidationErrorsComponent
  ]
})
export class CoreModule { }

