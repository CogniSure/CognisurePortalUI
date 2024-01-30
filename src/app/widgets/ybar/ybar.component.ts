import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ChartComponent, SeriesLabelsContentArgs } from '@progress/kendo-angular-charts';
import {
  Border,
  SeriesLabels,
  ValueAxisLabels,
} from '@progress/kendo-angular-charts';
import { saveAs } from '@progress/kendo-file-saver';
import { ChartData } from 'src/app/model/charts/chartdata';
import { ChartSeries } from 'src/app/model/charts/series';
import { SeriesColorConst } from 'src/app/model/constants/seriescolor';
import { DashboardFilter } from 'src/app/model/dashboard/dashboardfilter';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { WidgetService } from 'src/app/services/widget/widget.service';
@Component({
  selector: 'app-ybar',
  templateUrl: './ybar.component.html',
  styleUrls: ['./ybar.component.scss'],
})
export class YBarComponent implements OnInit, OnDestroy {
  noDataAvailble = false;
  @ViewChild('chart', { static: true })
  public categories: number[] = [];
  public YbarChart: ChartComponent;
  majorUnit: number;
  dataType :string = "percentage";
  
  constructor(
    private dbService: WidgetService,
    private changeDetector: ChangeDetectorRef,
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

  @ViewChild('chart')
  downloadMode = true;
  private chart: ChartComponent;
  seriesColors: string[] = SeriesColorConst;

  filter: DashboardFilter;
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.noDataAvailble = false;
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
          let maxVal = sumArr.reduce((a, b) => Math.max(a, b));
          if (maxVal > 10) {
            this.valueAxisMax.max = maxVal;
          } else this.valueAxisMax.max = maxVal;

          this.majorUnit = maxVal > 10 ? Math.ceil(maxVal / 10) : 1;

          // console.log("Pie Chart " + this.input.WidgetName)
          // console.log(this.chartData)
          if (this.chartData.Data[0].Data != null && this.chartData.Data[0].Data.length > 0)
            this.noDataAvailble = false;
          else this.noDataAvailble = true;

          this.changeDetector.detectChanges();
        } else {
          this.noDataAvailble = true;
        }
        this.changeDetector.detectChanges();
      });
    }

    this.changeDetector.detectChanges();
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


  valueAxis: {
    labels: {
      format: '{0:0}';
    };
  };

  public labelContent = (e: SeriesLabelsContentArgs): string => {
    if(this.dataType == "Number")
      return e.value;
    else if(this.dataType == "Percentage")
      return e.value + '%';
    else if(this.dataType == "Dollar")
      return "$" + e.value;
    return e.value;
  };

  public valueAxisLabels: ValueAxisLabels = {
    //font: "bold 16px Arial, sans-serif",
    font: '12px Arial, sans-serif',
  };
  public seriesLabels: SeriesLabels = {
    visible: true, // Note that visible defaults to false
    font: 'bold 12px Arial, sans-serif',
    background: 'transparent',
    position: 'center',
    color: 'white',
  };
  ApplySettings(){
    
    if(this.input.Settings !=null){
      if(this.input.Settings.DataType!=null){
        this.dataType = this.input.Settings.DataType
      }
    }
  }
}
