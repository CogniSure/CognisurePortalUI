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
import { AxisLabelContentArgs, ChartComponent, SeriesLabelsContentArgs } from '@progress/kendo-angular-charts';
import {
  Border,
  SeriesLabels,
  ValueAxisLabels,
} from '@progress/kendo-angular-charts';
import { saveAs } from '@progress/kendo-file-saver';
import { FormatAmountPipe } from 'src/app/core/pipes/format-amount.pipe';
import { ChartData } from 'src/app/model/charts/chartdata';
import { ChartSeries } from 'src/app/model/charts/series';
import { SeriesColorPrimary } from 'src/app/model/constants/seriescolor';
import { SeriesColorSecondary } from 'src/app/model/constants/seriescolor';
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
  prefix = '';
  suffix = '';
  isStacked = false;
  showLabels = true;
  constructor(
    private dbService: WidgetService,
    private changeDetector: ChangeDetectorRef,
    @Inject(InjectToken) private input: WidgetInput,
    private formatPipe: FormatAmountPipe,
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
  seriesColors: string[] = [];//SeriesColorConst;

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

  public CategoryLabelContent = (e: AxisLabelContentArgs): string => {
    let str = e.value.split(" ");
    console.log(this.input.WidgetHeader)
    console.log(str.length)
    let newStr = ""
    let halfLength  = Math.round(str.length/2)
    console.log(halfLength)
    if(str.length > 4){
      //console.log("More length string")
      let count = 0;
      str.forEach((element:any) => {
        count++;
        // console.log(count/2)
        // console.log(count%2)
        // if(count%2 == 0){
        //   newStr+= element + "\n"
        // }
        if(count == halfLength){
          newStr+= element + "\n"
        }
        else {
          newStr+= element + " "
        }
      });
    }
    else 
      newStr = e.value;
    console.log(newStr)
    return newStr;
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
  ApplySettings() {
    if (this.input.Settings != null) {
      if (this.input.Settings.DataType != null) {
        this.dataType = this.input.Settings.DataType;
      }
      if (this.input.Settings.ShowLabels != null) {
        this.showLabels = this.input.Settings.ShowLabels;
      }
      if (this.input.Settings.Stack != null) {
        this.isStacked = this.input.Settings.Stack;
      }
      if (this.input.Settings.SeriesColor != null) {
        if(this.input.Settings.SeriesColor == "Primary")
          this.seriesColors = SeriesColorPrimary
        else if(this.input.Settings.SeriesColor == "Secondary") 
          this.seriesColors = SeriesColorSecondary
        else
          this.seriesColors = SeriesColorPrimary
      }
      else
        this.seriesColors = SeriesColorPrimary
      console.log(this.dataType)
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
}
