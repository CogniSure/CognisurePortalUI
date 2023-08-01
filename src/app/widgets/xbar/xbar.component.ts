import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from "@progress/kendo-angular-charts";
import { saveAs } from "@progress/kendo-file-saver";
@Component({
  selector: 'app-xbar',
  templateUrl: './xbar.component.html',
  styleUrls: ['./xbar.component.scss']
})
export class XBarComponent {
  @ViewChild("chart")
  private chart: ChartComponent;
  seriesColors: string[] = [
  "#5bc0de",
  "#5cb85c",
  "#f0ad4e",
  "#e67d4a",
  "#d9534f",
  ]
categories = [1,2,3,4,5,6,7,8,9,10]
  series = [
    {
      name: "India",
      data: [
        3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.89, 8.238, 9.552, 6.855,
      ],
    },
  ];

  public exportChart(): void {
    this.chart
      .exportImage({
        width: 1200,
        height: 800,
      })
      .then((dataURI) => {
        saveAs(dataURI, "chart-large.png");
      });
  }
}
