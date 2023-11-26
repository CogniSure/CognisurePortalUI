import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "@progress/kendo-angular-charts";
import { saveAs } from "@progress/kendo-file-saver";
import { ChartData } from 'src/app/model/charts/chartdata';
import { SeriesColorConst } from 'src/app/model/constants/seriescolor';
import { DashboardFilter } from 'src/app/model/dashboard/dashboardfilter';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { WidgetService } from 'src/app/services/widget/widget.service';
@Component({
  selector: 'app-xbar',
  templateUrl: './xbar.component.html',
  styleUrls: ['./xbar.component.scss']
})
export class XBarComponent implements OnInit, OnDestroy {
  xbarData:any;


  constructor(
    private dbService: WidgetService,
    private changeDetector: ChangeDetectorRef,
    @Inject(InjectToken) private input: WidgetInput
  ) {}

  chartData: ChartData = {  
    Categories : [],
    Data : [
      {
        Name:"",
        Data : []
      }
    ]};

  @ViewChild('chart')
  downloadMode = true;
  private chart: ChartComponent;
  seriesColors: string[] = SeriesColorConst;
  filter: DashboardFilter;
  ngOnDestroy(): void {
   
  }
  ngOnInit(): void {
    this.dbService.getDashboard(this.input, this.filter).subscribe((res) => {
      this.chartData = res;
      console.log(this.input);
      console.log(res);
    });

    // this.dbService.getData().subscribe(data => {
    //   this.xbarData = data;
    //   this.processDataForXbarChart(this.xbarData);
    // });

    // const dummyCategories = ['Category A', 'Category B', 'Category C'];
    // const dummyData = [10, 20, 30];
    // this.dbService.setChartData(dummyCategories, dummyData);

    // this.dbService.getChartData().subscribe((chartData) => {
    //   console.log(chartData);
    // });



  }


  // processDataForXbarChart(data: any[]): void {

  //   this.chartData = data.map(item => ({
  //     stat: item['Categories'],
  //     count: item['Data'],
  //     // color: item['Color'], 
  //   }));
  // }

  public exportChart(): void {
    this.chart
      .exportImage({
        width: 1200,
        height: 800,
      })
      .then((dataURI) => {
        saveAs(dataURI, "chart-large.png");
      });
  }
}
