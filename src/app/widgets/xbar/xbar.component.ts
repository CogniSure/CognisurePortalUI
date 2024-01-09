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
    Measure: [],
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
    if (this.input.DataSubject != null){ //&& this.input.Data.length > 0) {
      this.input.DataSubject.subscribe((inputData:any[])=>{
        console.log("Dashboard Latest X Bar")
          console.log(inputData)
        if(inputData!=null && inputData.length>0){
          
          this.chartData = inputData[0];
        }
        // else{
        //   this.dbService.getDashboard(this.input, this.filter).subscribe((res) => {
        //     this.chartData = res;
        //     console.log(this.input.WidgetName + '-Start');
        //     console.log(res);
        //     console.log(this.input.WidgetName + '-End');
        //       this.changeDetector.detectChanges();
        //   });
        // }
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
