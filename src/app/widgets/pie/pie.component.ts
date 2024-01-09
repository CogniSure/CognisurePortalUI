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
import { ChartComponent, SeriesLabelsContentArgs, SeriesType } from '@progress/kendo-angular-charts';
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
export class PieComponent implements OnInit, OnDestroy, OnChanges {
  piechartData: any;
  ChartType: SeriesType = 'donut';
  marker : any = 'square'
  public data: any[];
  constructor(
    private dbService: WidgetService,
    private changeDetector: ChangeDetectorRef,
    @Inject(InjectToken) private input: WidgetInput
  ) {}
  @ViewChild('chart')
  private chart: ChartComponent;
  seriesColors: string[] = SeriesColorConst;
  public chartData: any[];
  filter: DashboardFilter;
  legendPos :any = "bottom"
  legendOrientation : any = "horizontal"
  dataType :string = "percentage";
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.ApplySettings();
    // if (this.input.Data != null && this.input.Data.length > 0) {
    //   this.chartData = this.input.Data;
    // } 
    if (this.input.DataSubject != null){ //&& this.input.Data.length > 0) {
      this.input.DataSubject.subscribe((data:any[])=>{
        if(data!=null && data.length > 0){
          this.chartData = data;
        }
        // else {
        //   this.dbService.getDashboard(this.input, this.filter).subscribe((res) => {
        //     this.chartData = res;
        //     this.changeDetector.detectChanges();
        //   });
        // }
        this.changeDetector.detectChanges();
      })
    }
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changed Data")
    console.log(changes);
  }
  ApplySettings(){
    this.ChartType = this.input.WidgetType == "pie"? "pie" : "donut";
    if(this.input.Settings !=null){
      if(this.input.Settings.LegendPosition!=null){
        this.legendPos = "right";
        this.legendOrientation = "vertical"
      }
      if(this.input.Settings.DataType!=null){
        this.dataType = this.input.Settings.DataType
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
  pieLabelContent(e: any): string {
    console.log("Pie Label")
    console.log(this.dataType)
    // if(this.dataType == "number")
    //   return e.value;
    // else if(this.dataType == "percentage")
    //   return e.value + '%';
    // else if(this.dataType == "dollar")
    //   return "$" + e.value;
    return e.value + '%';
  }
  public labelContent = (e: SeriesLabelsContentArgs): string => {
    if(this.dataType == "Number")
      return e.value;
    else if(this.dataType == "Percentage")
      return e.value + '%';
    else if(this.dataType == "Dollar")
      return "$" + e.value;
    return e.value + "%";
  };
  processDataForXbarChart(data: any[]): void {
    // this.chartData = data.map(item => ({
    //   category: item['category'],
    //   value: item['value'],
    // }));
  }
}
