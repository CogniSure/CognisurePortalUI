import { NgModule } from '@angular/core';
import{MatButtonModule} from '@angular/material/button'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import { MatSidenavModule } from "@angular/material/sidenav";
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider'
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';

const MaterialComponents = [
  MatButtonModule,
  MatGridListModule,
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatSidenavModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatBadgeModule,
  MatDividerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatExpansionModule
]
@NgModule({
  imports: [
    MaterialComponents
  ],
  exports:[
    MaterialComponents
  ]
})
export class MaterialModule { }
