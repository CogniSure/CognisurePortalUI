import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartComponent, SeriesType } from '@progress/kendo-angular-charts';
import { DashboardFilter } from 'src/app/model/dashboard/dashboardfilter';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { WidgetService } from 'src/app/services/widget/widget.service';

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
  ngOnDestroy(): void {}
  ngOnInit(): void {
    console.log("funnelFIlter:")
    console.log(this.input)
    this.dbService.getDashboard(this.input, this.filter).subscribe((res) => {
      console.log(res)
      this.chartData = res;
    });
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
  public model = [
    {
      stat: 'Impressions ',
      count: 434823,
      color: '#0e5a7e',
    },
    {
      stat: 'Clicks',
      count: 356854,
      color: '#166f99',
    },
    {
      stat: 'Unique Visitors',
      count: 280022,
      color: '#2185b4',
    },
    {
      stat: 'Downloads',
      count: 190374,
      color: '#319fd2',
    },
    {
      stat: 'Purchases',
      count: 120392,
      color: '#3eaee2',
    },
  ];
}
