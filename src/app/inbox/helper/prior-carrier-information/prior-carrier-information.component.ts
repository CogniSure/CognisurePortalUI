import { Component } from '@angular/core';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-prior-carrier-information',
  templateUrl: './prior-carrier-information.component.html',
  styleUrls: ['./prior-carrier-information.component.scss']
})
export class PriorCarrierInformationComponent {
  public data: any[] = [
    { PolicyNumber: "Business Auto", LineOfBusiness: "Business Auto", Carrier: "Business Auto", EffectiveDate:"Business Auto", ExpirationDate:"Business Auto", Premium:"Business Auto" },
    { PolicyNumber: "Business Auto", LineOfBusiness: "Business Auto", Carrier: "Business Auto", EffectiveDate:"Business Auto", ExpirationDate:"Business Auto", Premium:"Business Auto" },
    { PolicyNumber: "Business Auto", LineOfBusiness: "Business Auto", Carrier: "Business Auto", EffectiveDate:"Business Auto", ExpirationDate:"Business Auto", Premium:"Business Auto" },
    { PolicyNumber: "Business Auto", LineOfBusiness: "Business Auto", Carrier: "Business Auto", EffectiveDate:"Business Auto", ExpirationDate:"Business Auto", Premium:"Business Auto" },
  ];
  public gridData: GridDataResult = { data: this.data, total: this.data.length };
  public state: State = {
    skip: 0,
    take: 10
  };

  constructor() { }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.data, this.state);
  }

  ngOnInit(): void {
    this.gridData = process(this.data, this.state);
  }
}
