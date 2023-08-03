import { Component, ViewEncapsulation } from "@angular/core";
import { PagerSettings } from "@progress/kendo-angular-listview";

@Component({
  selector: 'app-coverage-requested',
  templateUrl: './coverage-requested.component.html',
  styleUrls: ['./coverage-requested.component.scss']
})
export class CoverageRequestedComponent {
  public destinations: any[] = [
    {
      Col: 1,
      Name: "Comercial Property"
    },
    {
      Col: 1,
      Name: "Business Auto"
    },
    {
      Col: 1,
      Name: "Business Owners"
    },
    {
      Col: 1,
      Name: "Comercial General Liability"
    },
    {
      Col: 2,
      Name: "Comercial Inland Marine"
    },
    {
      Col: 2,
      Name: "Crime"
    },
    {
      Col: 2,
      Name: "Boiler & Machinery"
    },
    {
      Col: 2,
      Name: "Cyber & Privacy"
    },
    {
      Col: 3,
      Name: "Fiduciary Liability"
    },
    {
      Col: 3,
      Name: "Liquor Liability"
    },
    {
      Col: 3,
      Name: "Motor Carrier"
    },
    {
      Col: 3,
      Name: "Truckers"
    },
    {
      Col: 4,
      Name: "Umbrella"
    },
    {
      Col: 4,
      Name: "Garage and Dealers"
    }
  ];

  public pagerSettings: PagerSettings = {
    previousNext: false,
    pageSizeValues: false,
    buttonCount: 9,
  };
  public pageSize = 6;
}
