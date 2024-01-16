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
  private labelCounter: number = 1;

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
          this.chartData = data[0];
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


 onYAxisLabelContent(e: any): string {
    if (e.value >= 0) {
      return '0';
    }
    // return `${e.value++}`;
    return `${this.labelCounter++}`;
  }



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


}
