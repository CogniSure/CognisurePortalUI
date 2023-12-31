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
import { CustomTooltipComponent } from './generic/tooltip/tooltip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidationErrorsComponent } from './generic/validation-errors/validation-errors.component';
import { ValidationSummaryComponent } from './generic/validation-summary/validation-summary.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { SelectComponent } from './generic/select/select.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { IconsModule } from '@progress/kendo-angular-icons';

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
    CustomTooltipComponent,
    ValidationErrorsComponent,
    ValidationSummaryComponent,
    TooltipDirective,
    SelectComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    KendoModule,
    FormsModule,
    DropDownsModule,
    ReactiveFormsModule,
    DropDownListModule,
    IconsModule,
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
    ValidationErrorsComponent,
    ValidationSummaryComponent,
    TooltipDirective,
    SelectComponent
  ]
})
export class CoreModule { }

