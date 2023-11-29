import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartComponent, SeriesType } from '@progress/kendo-angular-charts';
import { ChartData } from 'src/app/model/charts/chartdata';
import { DashboardFilter } from 'src/app/model/dashboard/dashboardfilter';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { WidgetService } from 'src/app/services/widget/widget.service';
import { FunnelData } from 'src/app/model/charts/funneldata';
import { SeriesColorConst } from 'src/app/model/constants/seriescolor';

@Component({
  selector: 'app-funnel',
  templateUrl: './funnel.component.html',
  styleUrls: ['./funnel.component.scss'],
})
export class FunnelComponent implements OnInit, OnDestroy {
  public dynamicSlope = false;
  public dynamicHeight = false;
  filter: DashboardFilter;
  ChartType: SeriesType = 'funnel';
  public chartData: any[];
  @ViewChild('chart')
  private chart: ChartComponent;
  constructor(
    private dbService: WidgetService,
    private changeDetector: ChangeDetectorRef,
    @Inject(InjectToken) private input: WidgetInput
  ) {
    this.ChartType = input.WidgetType as SeriesType;
  }

  seriesColors: string[] = SeriesColorConst;

  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.dbService.getDashboard(this.input, this.filter).subscribe((res) => {
      this.chartData = res;
    });
    // this.dbService.getDashboard(this.input, this.filter).subscribe((res) => {
    //   this.chartData = res;
    //   console.log(this.input);
    //   console.log(res);
    //   console.log('Chart Data:', this.chartData);
    // });
  }
  public exportChart(): void {
    // this.chart
    //   .exportImage({
    //     width: 1200,
    //     height: 800,
    //   })
    //   .then((dataURI) => {
    //     saveAs(dataURI, 'chart-large.png');
    //   });
  }
}
