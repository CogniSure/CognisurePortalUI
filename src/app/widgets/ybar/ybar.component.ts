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

  // valueAxisMax:any = {
  //   max : 1000,
  //   min : 0
  // }

  @ViewChild('chart')
  downloadMode = true;
  private chart: ChartComponent;
  seriesColors: string[] = SeriesColorConst;
  
  filter: DashboardFilter;
  ngOnDestroy(): void {}
  ngOnInit(): void {

    if (this.input.DataSubject != null ){ //&& this.input.Data.length > 0) {
      this.input.DataSubject.subscribe((data:any[])=>{
        if(data!=null && data.length>0){
          // const hideRightSideLabels = true; 
          this.chartData = this.transformChartData(data[0]);

        //   let sumArr: number[] = [];
        //   this.chartData.Data.forEach(data=>{
        //     let sum: number = 0;
        //     data.Data.forEach(a => sum += Number(a));
        //     sumArr.push(sum)
        //   })
        //  let maxVal = sumArr.reduce((a, b)=>Math.max(a, b));
        
        // if(maxVal>5){
        //     this.valueAxisMax.max = maxVal
        //  }
         
        //  else 
        //     this.valueAxisMax.max = 3

        }
        // else {
        //   this.dbService.getDashboard(this.input, this.filter).subscribe((res) => {
        //     this.chartData = res;
        //     console.log(this.input.WidgetName + '-Start');
        //     console.log(res);
        //     console.log(this.input.WidgetName + '-End');
        //     this.changeDetector.detectChanges();
        //   });
        // }
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


  // onYAxisLabelContent(e: any): string {
  //     if (e.value >= 0.2
  //       ) {
  //       return '0';
  //     }

  //       return `${Math.round(e.value + 1)}`;
     
    // return `${e.value + 1}`;
      // return `${Math.floor(e.value) + 1}`;

  // }


//  onYAxisLabelContent(e: any): string {
//     if (e.value >= 0) {
//       return '0';
//     }
    // return `${e.value++}`;
    // return `${this.labelCounter++}`;
      // return `${e.value + 1}`;
  // }

// private transformChartData(seriesData: any): ChartData {
//     const transformedData = seriesData.Data.map((item: { Data: any[]; }) => {
//       const transformedItem = {
//         ...item,
//         Data: item.Data.map((value: number) => value + 1), 
//       };
//       return transformedItem;
//     });

//     return {
//       ...seriesData,
//       Data: transformedData,
//     };
//   }


// private transformChartData(seriesData: any): ChartData {
//   const transformedData = seriesData.Data.map((item: { Data: any[]; Labels?: any[] }, index: number) => {
//     const series = Array.from({ length: item.Data.length }, (_, i) => i + 5);
//     const labels = series.map(value => index === seriesData.Data.length - 1 ? `Bottom-${value.toString()}` : value.toString());

//     return {
//       ...item,
//       Data: series,
//       Labels: labels,
//     };
//   });

//   return {
//     ...seriesData,
//     Data: transformedData,
//   };
// }



private transformChartData(seriesData: any): ChartData {
  const transformedData = seriesData.Data.map((item: { Data: any[]; Labels?: any[] }, index: number) => {
    const series = Array.from({ length: item.Data.length }, (_, i) => i + 5);
    const labels = series.map(value => value.toString());

    if (index === seriesData.Data.length - 1) {
      // Add an identifier for the bottom series
      return {
        ...item,
        Data: series,
        Labels: labels,
        isBottomSeries: true,
      };
    }

    return {
      ...item,
      Data: series,
      Labels: labels,
      isBottomSeries: false,
    };
  });

  return {
    ...seriesData,
    Data: transformedData,
  };
}



valueAxis: {
  labels: {
    format: "{0:0}"
  }
}


onLabelContent(e: any): string {
  if (e.dataItem.isBottomSeries) {
    return `Bottom-${e.value}`;
  } else {
    return e.value.toString();
  }
}

// onLabelContent(e: any): string {
//   if (e.dataItem.isBottomSeries && e.axis.options.position !== "right") {
//     return `Bottom-${e.value}`;
//   } else {
//     return e.value.toString();
//   }
// }





// private transformChartData(seriesData: any, shouldHideLabelsDynamically: boolean = false): ChartData {
//   const transformedData = seriesData.Data.map((item: { Data: any[]; Labels?: any[] }) => {
//     const series = Array.from({ length: item.Data.length }, (_, index) => index + 5);
//     return {
//       ...item,
//       Data: series,
//       Labels: series.map((value: number) => value.toString()),
//     };
//   });

//   const chartOptions = {
//     seriesDefaults: {
//       labels: {
//         template: (e: any) => shouldHideLabelsDynamically ? "" : e.value, 
//         // visible: !shouldHideLabelsDynamically,
//         format: "{0:0}",
//       },
//     },
//     valueAxis: {
//       labels: {
//         template: (e: any) => shouldHideLabelsDynamically ? "" : e.value, 
//         // visible: !shouldHideLabelsDynamically,
//         format: "{0:0}",
//       },
//     },
//   };

//   return {
//     ...seriesData,
//     Data: transformedData,
//     options: {
//       ...seriesData.options,
//       ...chartOptions,
//     },
//   };
// }


  // onYAxisLabelContent(e: any): string {
  //   return `${e.value}`;
  // }


  // seriesData = [
  //   { name: 'Series1', min: 0, max: 100 },
  //   { name: 'Series2', min: -50, max: 50 },
  // ];

  // public chartOptions: any = {
  //   seriesDefaults: {
  //     // Your series configuration here
  //   },
  //   categoryAxis: {
  //     labels: {
        
  //       template: (e: any) => {
         
  //         return `Label ${e.value}`; 
  //       },
  //     },
  //   },
  //   valueAxis: {
  //     labels: {
  //       visible: false,
  //     },
  //   },
  //   series: this.generateSeriesConfig(),
  // };

  
  //  private generateSeriesConfig(): any[] {
  //   return this.seriesData.map((data: { name: any; min: any; max: any; }) => ({
  //     name: data.name,
  //     min: data.min,
  //     max: data.max,
    
  //   }));
  // }


  // ngAfterViewInit() {
  //   const rightAxisLabels = this.chart.wrapper.nativeElement.querySelectorAll('.k-axis-labels.k-right');
  //   rightAxisLabels.forEach((label: { style: { display: string; }; }) => label.style.display = 'none');

  //   // Dynamically update bottom axis labels
  //   const categoriesCount = this.chart.wrapper.nativeElement.querySelector('.k-axis-labels.k-bottom').children.length;
  //   const bottomAxisLabels = this.chart.wrapper.nativeElement.querySelector('.k-axis-labels.k-bottom').children;

  //   for (let i = 0; i < categoriesCount; i++) {
  //     bottomAxisLabels[i].textContent = `${i + 1}`;
  //   }
  // }


    // const adjustedValue = Math.floor(e.value - 0.2);
    // return `${adjustedValue}`;
      // return `${Math.floor(e.value) + 1}`;
      // return e.value >= 0 ? `${Math.floor(e.value)- 1}` : '';
  //     if (e.value === 0) {
  //       return '0';
  //     }
  //     else{
  //     return `${Math.floor(e.value + 1)}`;
  // }
  
  // onYAxisLabelContent(e: any): string {
  // //   const index = Math.floor(e.value);
  // if (index >= 0 && index < this.chartData.Data.length) {
  //   return `${index + 1}`;
  // } else {
  //   return ''; 
  // }
  //  }

  public valueAxisLabels: ValueAxisLabels = {
    //font: "bold 16px Arial, sans-serif",
    font: "12px Arial, sans-serif",
  };


}
