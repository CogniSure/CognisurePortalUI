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
  @ViewChild('chart')
  downloadMode = true;
  private chart: ChartComponent;
  seriesColors: string[] = SeriesColorConst;
  filter: DashboardFilter;
  ngOnDestroy(): void {}
  ngOnInit(): void {
    if (this.input.DataSubject != null){ //&& this.input.Data.length > 0) {
      this.input.DataSubject.subscribe((inputData:any[])=>{
        
        if(inputData!=null && inputData.length>0){
          
          this.chartData = inputData[0];
          console.log("Dashboard Latest X Bar")
          
          let sumArr: number[] = [];
          this.chartData.Data.forEach(data=>{
            let sum: number = 0;
            data.Data.forEach(a => sum += Number(a));
          console.log(sum)
            sumArr.push(sum)
          })
         let maxVal = sumArr.reduce((a, b)=>Math.max(a, b));
         if(maxVal>10){
            this.valueAxisMax.max = maxVal+10
         }
         else 
            this.valueAxisMax.max = 10
          // this.valueAxisMax = maxVal>10? maxVal+10:10//this.people.reduce((a, b)=>Math.max(a, b));;
          // console.log(inputData[0].Data)
          console.log(this.valueAxisMax )
        }
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
  public seriesLabels: SeriesLabels = {
    visible: true, // Note that visible defaults to false
    font: "bold 8px Arial, sans-serif",
    background:"transparent",
    position :"center"
  };

  public valueAxisLabels: ValueAxisLabels = {
    font: "bold 16px Arial, sans-serif",
  };
  public seriesBorder:Border={
    //color:'red'
  }
}
