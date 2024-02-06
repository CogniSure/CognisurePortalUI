import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartComponent, Margin, SeriesLabelsContentArgs, SeriesType } from '@progress/kendo-angular-charts';
import { saveAs } from '@progress/kendo-file-saver';
import { ChartData } from 'src/app/model/charts/chartdata';
import { SeriesColorPrimary } from 'src/app/model/constants/seriescolor';
import { SeriesColorSecondary } from 'src/app/model/constants/seriescolor';
import { DashboardFilter } from 'src/app/model/dashboard/dashboardfilter';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { WidgetService } from 'src/app/services/widget/widget.service';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent implements OnInit, OnDestroy, OnChanges {
  prefix = '';
  suffix = '';
  isStacked = false;
  showLabels = true;
  piechartData: any;
  ChartType: SeriesType = 'donut';
  marker : any = 'square'
  public data: any[];
  showSpinner = false;
  noDataAvailble = false;
  chartData: ChartData = {
    Dimension: [],
    Data: [],
  };
  @ViewChild('chart')
  private chart: ChartComponent;
  seriesColors: string[] = [];
  CenterValue = 0;
  filter: DashboardFilter;
  legendPos :any = "bottom"
  legendOrientation : any = "horizontal"
  dataType :string = "percentage";

  constructor(
    private dbService: WidgetService,
    private changeDetector: ChangeDetectorRef,
    @Inject(InjectToken) private input: WidgetInput
  ) {}

  labelMargin : Margin={
    top:0,
    right:15,
    bottom:0,
    left:0,

  }
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.showSpinner = true;
    this.ApplySettings();
    if (this.input.DataSubject != null){ 
      this.input.DataSubject.subscribe((data:any[])=>{
        if(data!=null && data.length > 0){
          this.chartData = data[0];
          if(data[0] !=null && data[0].Dimension!=null && data[0].Dimension[0]!=null)
          {
            this.CenterValue = data[0].Dimension[0].value;
            //this.noDataAvailble = false;
          }
          if(data[0] !=null && data[0].Data!=null && data[0].Data.length > 0){
            this.noDataAvailble = false;
          }
          else 
            this.noDataAvailble = true;
        } 
        else {
          this.noDataAvailble = true;
        }
        this.showSpinner = false;
        this.changeDetector.detectChanges();
      })
    }
    else
      this.showSpinner=false;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changed Data")
    console.log(changes);
  }
  ApplySettings(){
    this.ChartType = this.input.WidgetType == "pie"? "pie" : "donut";
    if(this.input.Settings !=null){
      if(this.input.Settings.LegendPosition!=null){
        this.legendPos = this.input.Settings.LegendPosition;
        this.legendOrientation = "vertical"
      }
      else{
        this.legendPos = "bottom";
        this.legendOrientation = "horizontal"
      }
      if(this.input.Settings.DataType!=null){
        this.dataType = this.input.Settings.DataType
      }
      if (this.input.Settings.NumberType != null) {
        this.dataType = this.input.Settings.NumberType;
      }
      if (this.input.Settings.ShowLabels != null) {
        this.showLabels = this.input.Settings.ShowLabels;
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
  public labelContent = (e: SeriesLabelsContentArgs): string => {
    if(this.dataType == "Number")
      return e.value;
    else if(this.dataType == "Percentage")
      return e.value + '%';
    else if(this.dataType == "Dollar")
      return "$" + e.value;
    return e.value;
  };
  
}
