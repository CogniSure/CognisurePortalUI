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
import { ChartComponent } from '@progress/kendo-angular-charts';
import { Border, SeriesLabels, ValueAxisLabels } from '@progress/kendo-angular-charts';
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
  // public chartData: number[] = [];
  @ViewChild('chart', { static: true }) 
  public categories: number[] = [];
  public YbarChart: ChartComponent;

  constructor(
    private dbService: WidgetService,
    private changeDetector: ChangeDetectorRef,
    @Inject(InjectToken) private input: WidgetInput
  ) {
    // const minNumber = 1;
    // const maxNumber = 1;
    // const newData = [];

    // for (let i = minNumber; i <= maxNumber; i++) {
    //   newData.push(i);
    // }
  //  this.barChart.chartData = newData;
  }
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

    if (this.input.DataSubject != null ){ //&& this.input.Data.length > 0) {
      this.input.DataSubject.subscribe((inputData:any[])=>{
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
            this.valueAxisMax.max = maxVal+6
         }
         else 
            this.valueAxisMax.max = 6
        
        }
        // if(data!=null && data.length>0){
          // const hideRightSideLabels = true; 
          // this.chartData = this.transformChartData(data[0]);

        this.changeDetector.detectChanges();
      })
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

// private transformChartData(seriesData: any): ChartData {
//   const transformedData = seriesData.Data.map((item: { Data: any[]; Labels?: any[] }, index: number) => {
//     const series = Array.from({ length: item.Data.length }, (_, i) => i + 5);
//     const labels = series.map(value => value.toString());

//     if (index === seriesData.Data.length - 1) {
     
//       return {
//         ...item,
//         Data: series,
//         Labels: labels,
//         isBottomSeries: true,
//       };
//     }

//     return {
//       ...item,
//       Data: series,
//       Labels: labels,
//       isBottomSeries: false,
//     };
//   });

//   return {
//     ...seriesData,
//     Data: transformedData,
//   };
// }

valueAxis: {
  labels: {
    format: "{0:0}"
  }
}




// onLabelContent(e: any): string {
//   if (e.dataItem.isBottomSeries && e.axis.options.position !== "right") {
//     return `Bottom-${e.value}`;
//   } else {
//     return e.value.toString();
//   }
// }
  

  public valueAxisLabels: ValueAxisLabels = {
    //font: "bold 16px Arial, sans-serif",
    font: "12px Arial, sans-serif",
  };


}
