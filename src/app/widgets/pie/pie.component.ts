import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartComponent } from '@progress/kendo-angular-charts';
import { saveAs } from '@progress/kendo-file-saver';
import { ChartData } from 'src/app/model/charts/chartdata';
import { SeriesColorConst } from 'src/app/model/constants/seriescolor';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { WidgetService } from 'src/app/services/widget/widget.service';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent implements OnInit, OnDestroy {
  constructor(
    private dbService: WidgetService,
    private changeDetector: ChangeDetectorRef,
    @Inject(InjectToken) private input: WidgetInput
  ) {}
  @ViewChild('chart')
  private chart: ChartComponent;
  seriesColors: string[] = SeriesColorConst;
  chartData: ChartData;
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.chartData = {
      Categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      Data: [
        {
          Name: 'India',
          Data: [
            '3.907',
            '7.943',
            '7.848',
            '9.284',
            '9.263',
            '9.801',
            '3.89',
            '8.238',
            '9.552',
            '6.855',
          ],
        },
      ],
    };
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
}
