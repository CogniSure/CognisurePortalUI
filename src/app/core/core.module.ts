import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { MatDialogModule } from '@angular/material/dialog';
import { PopupModule } from '@progress/kendo-angular-popup';
import { EmailpopupComponent } from './emailpopup/emailpopup.component';
import { FormatAmountPipe } from './pipes/format-amount.pipe';

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
    SelectComponent,
    CopilotComponent,
    EmailpopupComponent,
    FormatAmountPipe
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
    MatDialogModule,
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
    SelectComponent,
    CopilotComponent,
    EmailpopupComponent,
    FormatAmountPipe
  ],
  providers: [FormatAmountPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule { }

