import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "@progress/kendo-angular-charts";
import { saveAs } from "@progress/kendo-file-saver";
import { ChartData } from 'src/app/model/charts/chartdata';
import { SeriesColorConst } from 'src/app/model/constants/seriescolor';
import { DashboardFilter } from 'src/app/model/dashboard/dashboardfilter';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { WidgetService } from 'src/app/services/widget/widget.service';
@Component({
  selector: 'app-xbar',
  templateUrl: './xbar.component.html',
  styleUrls: ['./xbar.component.scss']
})
export class XBarComponent implements OnInit, OnDestroy {
  constructor(
    private dbService: WidgetService,
    private changeDetector: ChangeDetectorRef,
    @Inject(InjectToken) private input: WidgetInput
  ) {}

  chartData: ChartData;
  @ViewChild('chart')
  downloadMode = true;
  private chart: ChartComponent;
  seriesColors: string[] = SeriesColorConst;
  filter: DashboardFilter;
  ngOnDestroy(): void {
   
  }
  ngOnInit(): void {
    this.dbService.getDashboard(this.input, this.filter).subscribe((res) => {
      console.log('Submissions');
      console.log(res);
      this.chartData = res
    });
  }
  
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
