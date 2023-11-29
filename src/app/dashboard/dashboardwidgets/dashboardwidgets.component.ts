import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Injector,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DataComponent } from '../../model/samples/data';
import { WidgetComponentInfo } from '../../model/widgets/widgetComponentInfo';
import { BoxDetails, ComponentDetails } from '../../model/constants/widgetinfo';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { GlobalService } from 'src/app/services/common/global.service';
import { DashboardService } from 'src/app/services/dashboard/dashboardservice';
import { WidgetService } from 'src/app/services/widget/widget.service';


// Injectable()
@Component({
  selector: 'app-dashboardwidgets',
  templateUrl: './dashboardwidgets.component.html',
  styleUrls: ['./dashboardwidgets.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardwidgetsComponent implements OnInit,AfterViewInit, OnDestroy{

  public custComponents: WidgetComponentInfo[] = [];
  reloadReq = true;
  @Input() collapsed = false;
  componentOrder: any;
  isFullScreen = false;
  widgetTemp:any;
  constructor( private injector: Injector,private widgetService:WidgetService,private globalService:GlobalService,private dbService : DashboardService) {
    //this.globalService.setDashboardReload(true);
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.globalService.clearDashboardSession()
  }
  ngAfterViewInit() {
    // this.globalService.dashboardFilter$.subscribe(x=>{
    //   if(x.ReloadRequired){
        
    //     this.globalService.setDashboardReload(false);
    //   }
    // })
    //this.globalService.setDashboardReload(false);
  }

  ngOnInit(): void {
   // this.globalService.setDashboardReload(true);
   

    this.widgetService.getTopLocationsFromDB().subscribe(topLocationSubject=>{
      console.log("TopLocation");
      console.log(topLocationSubject);
      this.globalService.setTopLocation(topLocationSubject)
    
    })

    this.widgetService.getTopBrokersFromDB().subscribe(topBrokerSubject=>{
      console.log("TopBroker");
      console.log(topBrokerSubject);
      this.globalService.setTopBroker(topBrokerSubject)
    
    })

    this.widgetService.getTopIndustriesFromDB().subscribe(topIndustrySubject=>{
      console.log("TopIndustry");
      console.log(topIndustrySubject);
      this.globalService.setTopIndustry(topIndustrySubject)
    
    })

    this.widgetService.getSubmissionTurnaroundTimeFromDB().subscribe(submissionTurnaroundTimeSubject=>{
      console.log("SubmissionTurnaroundTime");
      console.log(submissionTurnaroundTimeSubject);
      this.globalService.setSubmissionTurnaroundTime(submissionTurnaroundTimeSubject)
    
    })

    this.widgetService.getCoverageDistributionFromDB().subscribe(coverageDistributionsSubject=>{
      console.log("CoverageDistributions");
      console.log(coverageDistributionsSubject);
      this.globalService.setCoverageDistributions(coverageDistributionsSubject)
    
    })

    this.widgetService.getTopLocationsFromDB().subscribe(topLocationSubject=>{
      console.log("TopLocation");
      console.log(topLocationSubject);
      this.globalService.setTopLocation(topLocationSubject)
    
    })


    this.widgetService.getSubmissionConversionsFromDB().subscribe(submissionConversionsSubject=>{
      console.log("SubmissionConversions");
      console.log(submissionConversionsSubject);
      this.globalService.setSubmissionConversions(submissionConversionsSubject) 
    })


   
    this.componentOrder = DataComponent.Dashboardhub;
    this.custComponents = [];
    var i = 1;
    this.componentOrder.forEach((entry: any) => {
      this.custComponents.push({
        //ColWidth: BoxDetails.get(entry.BoxType)!,
        Widget: ComponentDetails.get(entry.WidgetType)![0],
        WidgetName: entry.WidgetName,
        WidgetType : entry.WidgetType,
        Header: entry.Header,
        //BoxClass: entry.BoxType,
        //Fullscreen : entry.Fullscreen,
        ColumnId :  entry.ColumnId,
        ColumnSpan :  entry.ColumnSpan,
        RowSpan :  entry.RowSpan,
        HeaderColor : entry.HeaderColor,
        FontColor : entry.FontColor
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
  createInjector(header:string,widgetType:string):any {
    var myInjector: Injector;
    let widgetInput:WidgetInput =
    {
      WidgetName : header,
      Api : "",
      ReloadRequired:this.reloadReq,
      WidgetType: widgetType
    }
    myInjector = Injector.create(
      {
        providers: [{provide: InjectToken, useValue: widgetInput}], 
        parent: this.injector,
        name : header
        }
      );

    return myInjector;
      }
}
