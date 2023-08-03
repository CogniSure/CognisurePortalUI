import { Component } from '@angular/core';
import { SelectEvent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
  public onTabSelect(e: SelectEvent): void {
    console.log(e);
  }
}
