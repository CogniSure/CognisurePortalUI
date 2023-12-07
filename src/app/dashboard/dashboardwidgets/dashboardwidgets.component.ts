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
   const topNumber = '10';
   const clientId = '1075';
const userEmailId = 'Jhon@gmail.com';
const startDate = '01/01/2023';
const endDate = '11/28/2023';
// const type = '';

    this.widgetService.getTopLocationsFromDB(clientId, userEmailId, startDate, endDate, "countbycity").subscribe(topLocationSubject=>{
      console.log("TopLocation");
      console.log(topLocationSubject);
      if(topLocationSubject!=null && topLocationSubject.success)
      {
        this.globalService.setTopLocation(topLocationSubject)
      }
      else{
        this.globalService.setTopLocation([])
      }
      
 
    })

    this.widgetService.getTopLocationsbyStateFromDB(clientId, userEmailId, startDate, endDate, "countbystate").subscribe(topLocationbyStateSubject=>{
      console.log("TopLocation-1");
      console.log(topLocationbyStateSubject);
      if(topLocationbyStateSubject!=null && topLocationbyStateSubject.success)
      {
        this.globalService.setTopLocation(topLocationbyStateSubject)
      }
      else{
        this.globalService.setTopLocation([])
      }
      
      // this.globalService.setTopLocationbyState(topLocationbyStateSubject)
 
    })


    this.widgetService.getTopBrokersFromDB(topNumber,clientId, userEmailId, startDate, endDate, "countbybroker").subscribe(topBrokerSubject=>{
      console.log("TopBroker");
      console.log(topBrokerSubject);
      if(topBrokerSubject!=null && topBrokerSubject.success)
      {
        this.globalService.setTopBroker(topBrokerSubject)
      
      }
      else{
        this.globalService.setTopBroker([])
      }
      
      // this.globalService.setTopBroker(topBrokerSubject)
    
    })

    this.widgetService.getTopIndustriesFromDB(topNumber,clientId, userEmailId, startDate, endDate, "countbyindustries").subscribe(topIndustrySubject=>{
      console.log("TopIndustry");
      console.log(topIndustrySubject);
      if(topIndustrySubject!=null && topIndustrySubject.success)
      {
        this.globalService.setTopIndustry(topIndustrySubject)
      }
      else{
        this.globalService.setTopIndustry([])
      }
      // this.globalService.setTopIndustry(topIndustrySubject)
    
    })

    this.widgetService.getSubmissionTurnaroundTimeFromDB(topNumber,clientId, userEmailId, startDate, endDate, "Countbystate").subscribe(submissionTurnaroundTimeSubject=>{
      console.log("SubmissionTurnaroundTime");
      console.log(submissionTurnaroundTimeSubject);
      if(submissionTurnaroundTimeSubject!=null && submissionTurnaroundTimeSubject.success)
      {
        this.globalService.setSubmissionTurnaroundTime(submissionTurnaroundTimeSubject)
      }
      else{
        this.globalService.setSubmissionTurnaroundTime([])
      }
      // this.globalService.setSubmissionTurnaroundTime(submissionTurnaroundTimeSubject)
    
    })

    this.widgetService.getCoverageDistributionFromDB(topNumber,clientId, userEmailId, startDate, endDate, "countbylob").subscribe(coverageDistributionsSubject=>{
      console.log("CoverageDistributions");
      console.log(coverageDistributionsSubject);
      if(coverageDistributionsSubject!=null && coverageDistributionsSubject.success)
      {
        this.globalService.setCoverageDistributions(coverageDistributionsSubject.value)
      }
      else{
        this.globalService.setCoverageDistributions([])
      }
      // this.globalService.setCoverageDistributions(coverageDistributionsSubject.value)
    
    })

    // this.widgetService.getTopLocationsFromDB().subscribe(topLocationSubject=>{
    //   console.log("TopLocation");
    //   console.log(topLocationSubject);
    //   this.globalService.setTopLocation(topLocationSubject)
    
    // })


    this.widgetService.getSubmissionConversionsFromDB(topNumber,clientId, userEmailId, startDate, endDate, "").subscribe(submissionConversionsSubject=>{
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