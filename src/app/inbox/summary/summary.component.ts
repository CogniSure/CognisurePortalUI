import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { DataComponent } from 'src/app/model/samples/data';
import { WidgetComponentInfo } from 'src/app/model/widgets/widgetComponentInfo';
import {
  BoxDetails,
  ComponentDetails,
} from 'src/app/model/constants/widgetinfo';
import { DashboardService } from 'src/app/services/dashboard/dashboardservice';
import { GlobalService } from 'src/app/services/common/global.service';
import { SVGIcon, downloadIcon } from '@progress/kendo-svg-icons';
import { Subscription, of } from 'rxjs';
import { SubmissionInfo } from 'src/app/model/inbox/SubmissionInfo';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit,OnDestroy {
  subscription: Subscription;  
  summaryComponentOrder: any;
  public summaryComponents: WidgetComponentInfo[] = [];
  propertyComponentOrder: any;
  public propertyComponents: WidgetComponentInfo[] = [];
  reloadReq = true;
  public downloadIcon:SVGIcon = downloadIcon;
  @Input() collapsed = false;
  isFullScreen = false;
  widgetTemp: any;
  constructor(
    private injector: Injector,
    private globalService: GlobalService,
    private dbService: DashboardService
  ) {
    //this.globalService.setDashboardReload(true);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    console.log("Summary Destroyed")
  }
  animationClass = 'slide-effect-x1';
  ngAfterViewInit() {
    // this.globalService.dashboardFilter$.subscribe(x=>{
    //   if(x.ReloadRequired){

    //     this.globalService.setDashboardReload(false);
    //   }
    // })
    this.globalService.animationClass$.next('');
  }

  ngOnInit(): void {
    console.log("Summary Started")
    this.globalService.animationClass$.next('slide-effect-x1');
    this.getSummaryWidgets();
    this.getPropertyWidgets();
  }
  getSummaryWidgets(){
    this.summaryComponentOrder = DataComponent.Summaryhub;
    this.summaryComponents = [];
    var i = 1;
    this.summaryComponentOrder.forEach((entry: any) => {
      this.summaryComponents.push({
        //ColWidth: BoxDetails.get(entry.BoxType)!,
        Widget: ComponentDetails.get(entry.WidgetType)![0],
        WidgetName: entry.WidgetName,
        WidgetType: entry.WidgetType,
        Header: entry.Header,
        //BoxClass: entry.BoxType,
        //Fullscreen: entry.Fullscreen,
        ColumnId: entry.ColumnId,
        ColumnSpan: entry.ColumnSpan,
        RowSpan: entry.RowSpan,
        HeaderColor: entry.HeaderColor,
        FontColor: entry.FontColor,
      });
      i++;
    });
  }
  getPropertyWidgets(){
    this.propertyComponentOrder = DataComponent.Propertyhub;
    this.propertyComponents = [];
    var i = 1;
    this.propertyComponentOrder.forEach((entry: any) => {
      this.propertyComponents.push({
        //ColWidth: BoxDetails.get(entry.BoxType)!,
        Widget: ComponentDetails.get(entry.WidgetType)![0],
        WidgetName: entry.WidgetName,
        WidgetType: entry.WidgetType,
        Header: entry.Header,
        //BoxClass: entry.BoxType,
        //Fullscreen: entry.Fullscreen,
        ColumnId: entry.ColumnId,
        ColumnSpan: entry.ColumnSpan,
        RowSpan: entry.RowSpan,
        HeaderColor: entry.HeaderColor,
        FontColor: entry.FontColor,
      });
      i++;
    });
  }
  getBodyClassBox(bodyClass: string): string {
    return bodyClass;
  }
  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this.globalService.setDashboardReload(false);
  }
  createInjector(header: string, widgetType: string): any {
    var myInjector: Injector;
    let widgetInput: WidgetInput = {
      WidgetName: header,
      WidgetType: widgetType,
      Settings : {}, 
      Data : [],
      DataSubject : of([])
    };
    myInjector = Injector.create({
      providers: [{ provide: InjectToken, useValue: widgetInput }],
      parent: this.injector,
      name: header,
    });
    //this.reloadReq = false;
    return myInjector;
  }
  download(){
    // var submissionId = "AAMkADU1NjU3NzEyLWMxZTItNDA5Yy04N2E0LTkzYWNjNTc3ZWVlMQBGAAAAAABFiQ8wy3CORZrMw-rLQJlFBwCM8fwoQTOCSY_HjadmsuvGAAAAAAEMAACM8fwoQTOCSY_HjadmsuvGAAKVXoPlAAA=";
    this.subscription = this.globalService.getCurrentSubmissionId().subscribe((submissionId:SubmissionInfo)=>{
      this.dbService.downloadSubmission360(submissionId.MessageId).subscribe(downloadRes=>{
        const source = `data:application/pdf;base64,${downloadRes.value.data}`;
        const downloadLink = document.createElement('a');
        const fileName = downloadRes.value.fileName;
    
        downloadLink.href = source;
        downloadLink.download = fileName;
        downloadLink.click();
      });
      
      
    })
  }
}
