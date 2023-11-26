import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartComponent, SeriesType } from '@progress/kendo-angular-charts';
import { saveAs } from '@progress/kendo-file-saver';
import { ChartData } from 'src/app/model/charts/chartdata';
import { SeriesColorConst } from 'src/app/model/constants/seriescolor';
import { DashboardFilter } from 'src/app/model/dashboard/dashboardfilter';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { WidgetService } from 'src/app/services/widget/widget.service';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent implements OnInit, OnDestroy {
  piechartData: any;
  ChartType:SeriesType = "donut";
  public data: any[];
  constructor(
    private dbService: WidgetService,
    private changeDetector: ChangeDetectorRef,
    @Inject(InjectToken) private input: WidgetInput
  ) {
    this.ChartType = input.WidgetType as SeriesType
    
    dbService.getDashboard(this.input,this.filter).subscribe(res=>{
      this.data = res; 
    });
  }
  @ViewChild('chart')
  private chart: ChartComponent;
  seriesColors: string[] = SeriesColorConst;
  public chartData: any[];
  filter: DashboardFilter;
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.dbService.getDashboard(this.input, this.filter).subscribe((res) => {
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
        saveAs(dataURI, 'chart-large.png');
      });
  }
  public pieLabelContent(e: any): string {
    return e.value + '%';
  }

  processDataForXbarChart(data: any[]): void {

    // this.chartData = data.map(item => ({
    //   category: item['category'],
    //   value: item['value'], 
    // }));
  }


}
