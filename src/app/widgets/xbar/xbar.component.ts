import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Border, ChartComponent, SeriesLabels, ValueAxisLabels } from '@progress/kendo-angular-charts';
import { saveAs } from '@progress/kendo-file-saver';
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
  xbarData: any;
  majorUnit: number;
  showSpinner = false;
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
  valueAxisMax:any = {
    max : 1000,
    min : 0
  }
  public seriesLabels: SeriesLabels = {
    visible: true, // Note that visible defaults to false
    font: "bold 12px Arial, sans-serif",
    background:"transparent",
    position :"center",
    color:"white"

  };

  public valueAxisLabels: ValueAxisLabels = {
    font: "12px Arial, sans-serif",
  };
  public seriesBorder:Border={
  }
  @ViewChild('chart')
  downloadMode = true;
  private chart: ChartComponent;
  seriesColors: string[] = SeriesColorConst;
  filter: DashboardFilter;
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.showSpinner = true;
    if (this.input.DataSubject != null){ //&& this.input.Data.length > 0) {
      this.input.DataSubject.subscribe((inputData:any[])=>{
        
        if(this.input.Settings!=null && this.input.Settings.ShowLabels!=null)
        {
          this.seriesLabels.visible = this.input.Settings.ShowLabels;
        }
        if(inputData!=null && inputData.length>0){
          
          this.chartData = inputData[0];
          
          let sumArr: number[] = [];
          this.chartData.Data.forEach(data=>{
            let sum: number = 0;
            data.Data.forEach(a => sum += Number(a));
            sumArr.push(sum)
          })
         let maxVal = sumArr.reduce((a, b)=>Math.max(a, b));
         if(maxVal>10){
            this.valueAxisMax.max = maxVal
         }
         else 
            this.valueAxisMax.max = maxVal
            this.majorUnit = maxVal > 10 ? Math.ceil(maxVal / 10) : 1;
          // this.valueAxisMax = maxVal>10? maxVal+10:10//this.people.reduce((a, b)=>Math.max(a, b));;
          // console.log(inputData[0].Data)
        }
        this.showSpinner = false;
        this.changeDetector.detectChanges();
      })
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
}
