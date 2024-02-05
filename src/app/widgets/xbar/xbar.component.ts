import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Border,
  ChartComponent,
  SeriesLabels,
  SeriesLabelsContentArgs,
  ValueAxisLabels,
} from '@progress/kendo-angular-charts';
import { saveAs } from '@progress/kendo-file-saver';
import { FormatAmountPipe } from 'src/app/core/pipes/format-amount.pipe';
import { ChartData } from 'src/app/model/charts/chartdata';
import { SeriesColorConst } from 'src/app/model/constants/seriescolor';
import { DashboardFilter } from 'src/app/model/dashboard/dashboardfilter';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { WidgetService } from 'src/app/services/widget/widget.service';

@Component({
  selector: 'app-xbar',
  templateUrl: './xbar.component.html',
  styleUrls: ['./xbar.component.scss'],
})
export class XBarComponent implements OnInit, OnDestroy {
  prefix = '';
  suffix = '';
  majorUnit: number;
  showSpinner = false;
  noDataAvailble = false;
  private dataType: string = 'percentage';
  isStacked = false;
  showLabels = true;
  constructor(
    private dbService: WidgetService,
    private changeDetector: ChangeDetectorRef,
    private formatPipe: FormatAmountPipe,
    @Inject(InjectToken) private input: WidgetInput
  ) {}

  chartData: ChartData = {
    Dimension: [],
    Data: [
      {
        Name: '',
        Data: [],
      },
    ],
  };
  valueAxisMax: any = {
    max: 1000,
    min: 0,
  };
  public seriesLabels: SeriesLabels = {
    visible: true, // Note that visible defaults to false
    font: 'bold 12px Arial, sans-serif',
    background: 'transparent',
    position: 'outsideEnd',
    color: 'white',
  };

  public valueAxisLabels: ValueAxisLabels = {
    font: '12px Arial, sans-serif',
  };
  public seriesBorder: Border = {};
  @ViewChild('chart')
  downloadMode = true;
  private chart: ChartComponent;
  seriesColors: string[] = SeriesColorConst;
  filter: DashboardFilter;
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.showSpinner = true;
    this.ApplySettings();

    if (this.input.DataSubject != null) {
      this.input.DataSubject.subscribe((inputData: any[]) => {
        if (inputData != null && inputData.length > 0) {
          this.chartData = inputData[0];

          let sumArr: number[] = [];
          this.chartData.Data.forEach((data) => {
            let sum: number = 0;
            data.Data.forEach((a) => (sum += Number(a)));
            sumArr.push(sum);
          });
          let maxVal = 0;
          if (sumArr != null && sumArr.length > 0)
            sumArr.reduce((a, b) => Math.max(a, b));
          if (maxVal > 10) {
            this.valueAxisMax.max = maxVal;
          } else this.valueAxisMax.max = maxVal;
          this.majorUnit = maxVal > 10 ? Math.ceil(maxVal / 10) : 1;

          if (this.chartData.Data != null && this.chartData.Data.length > 0)
            this.noDataAvailble = false;
          else this.noDataAvailble = true;

          this.changeDetector.detectChanges();
        } else {
          this.noDataAvailble = true;
        }
        this.showSpinner = false;
        this.changeDetector.detectChanges();
      });
    } else this.showSpinner = false;
  }
  ApplySettings() {
    if (this.input.Settings != null) {
      if (this.input.Settings.NumberType != null) {
        this.dataType = this.input.Settings.NumberType;
      }
      if (this.input.Settings.ShowLabels != null) {
        this.showLabels = this.input.Settings.ShowLabels;
      }
      if (this.input.Settings.Stack != null) {
        this.isStacked = this.input.Settings.Stack;
      }

      if (this.dataType == 'Number') {
        this.prefix = '';
        this.suffix = '';
      } else if (this.dataType == 'Percentage') {
        this.prefix = '';
        this.suffix = '%';
      } else if (this.dataType == 'Dollar') {
        this.prefix = '$';
        this.suffix = '';
      }
    }
  }
  public labelContent = (e: SeriesLabelsContentArgs): string => {
    let val = 0;
    if (e.value != '') val = e.value;
    else val = e.stackValue!;

    if (this.dataType == 'Number') return this.formatPipe.transform(val);
    else if (this.dataType == 'Percentage') {
      this.prefix = '';
      this.suffix = '%';
      return this.formatPipe.transform(val, '', this.suffix);
    } else if (this.dataType == 'Dollar') {
      this.prefix = '$';
      this.suffix = '';
      return this.formatPipe.transform(val, this.prefix, '');
    }

    return e.value;
  };
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
