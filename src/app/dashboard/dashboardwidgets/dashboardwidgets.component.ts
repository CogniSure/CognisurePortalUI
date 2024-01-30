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
import { of } from 'rxjs';
import { CacheService } from 'src/app/services/common/cache.service';
import { ChartData } from 'src/app/model/charts/chartdata';
import { DashboardFilter } from 'src/app/model/dashboard/dashboardfilter';
import { YBarComponent } from 'src/app/widgets/ybar/ybar.component';

// Injectable()
@Component({
  selector: 'app-dashboardwidgets',
  templateUrl: './dashboardwidgets.component.html',
  styleUrls: ['./dashboardwidgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardwidgetsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public custComponents: WidgetComponentInfo[] = [];
  public YbarChart: YBarComponent;
  reloadReq = true;
  @Input() collapsed = false;
  componentOrder: any;
  isFullScreen = false;
  widgetTemp: any;
  constructor(
    private injector: Injector,
    private widgetService: WidgetService,
    private globalService: GlobalService,
    private dbService: DashboardService,
    private cacheService: CacheService
  ) {}
  ngOnDestroy(): void {
    this.globalService.clearDashboardSession();
  }
  ngAfterViewInit() {}

  ngOnInit(): void {
    this.componentOrder = DataComponent.Dashboardhub;
    this.custComponents = [];
    var i = 1;
    this.componentOrder.forEach((entry: any) => {
      this.custComponents.push({
        Widget: ComponentDetails.get(entry.WidgetType)![0],
        WidgetName: entry.WidgetName,
        WidgetType: entry.WidgetType,
        Header: entry.Header,
        ColumnId: entry.ColumnId,
        ColumnSpan: entry.ColumnSpan,
        RowSpan: entry.RowSpan,
        HeaderColor: entry.HeaderColor,
        FontColor: entry.FontColor,
        CustomInjector :  this.createInjector(entry)
      });
      i++;
    });
    this.getDataFromDB();
  }

  getDataFromDB() {
    const user = this.globalService.getUserProfile();

    console.log("User Details")
    console.log(user)
    const topNumber = '10';
    const startDate = '01/01/2023';
    const endDate = '9/30/2024';
    const clientId = user.ClientCode;
    const userEmailId = user.Email;//'submissiontesting@cognisure.ai';

    this.getSubmissionProfile(topNumber, clientId, userEmailId, startDate, endDate);
    this.getSubmissionTurnAroundTime(topNumber,clientId,userEmailId,startDate,endDate);
    this.getCoverageDistribution(topNumber,clientId,userEmailId,startDate,endDate);
    this.getTopBrokers(topNumber, clientId, userEmailId, startDate, endDate);
    this.getTopIndustries(topNumber, clientId, userEmailId, startDate, endDate);
    this.getTopLocations(topNumber, clientId, userEmailId, startDate, endDate);
    this.getTopLocationsbyState(topNumber,clientId,userEmailId,startDate,endDate);
    
    // this.getSubmissionConversions(topNumber,clientId,userEmailId,startDate,endDate);
    
  }
  getSubmissionProfile(
    topNumber: any,
    clientId: any,
    userEmailId: any,
    startDate: any,
    endDate: any
  ){
    this.widgetService.getSubmissionProfileFromDB( topNumber,
      clientId,
      userEmailId,
      startDate,
      endDate,
      'countofsubmissionprofileandvolume').subscribe(res=>{
        let cdata: ChartData = {
          Dimension: [],
          Data: [],
        };
      if(res!=null && res.value != null && res.value.length > 0)
      {
        let dataArr = res.value;
        const mappedArr = dataArr.map((x:any)=>{
          return {
            category:x.dimension,
            value:x.measure
          }
        })
        cdata.Dimension = mappedArr.filter((f:any)=>f.category == 'SubmissionIdCount');
        cdata.Data = mappedArr.filter((f:any)=>f.category != 'SubmissionIdCount');
        
        this.cacheService.setDashboard('SubmissionProfile',[cdata])
      }
      else 
      {
        this.cacheService.setDashboard('SubmissionProfile', []);
      }
    })
  }
  getTopLocations(
    topNumber: any,
    clientId: any,
    userEmailId: any,
    startDate: any,
    endDate: any
  ) {
    let cdata: ChartData[] = [{
      Dimension: [],
      Data: [
        {
          Name: '',
          Data: [],
        },
      ],
    }];
    this.widgetService
      .getTopLocationsFromDB(
        topNumber,
        clientId,
        userEmailId,
        startDate,
        endDate,
        'countbycity'
      )
      .subscribe((res) => {
        if (res != null && res.success) {
          if(res.value!=null){
            res.value.forEach((data: any) => {
              if (data.dimension && data.measure) {
                cdata[0].Dimension.push(data.dimension);
                cdata[0].Data[0].Data.push(data.measure);
              }
            });
          }
          this.cacheService.setDashboard('TopLocationsByCity',cdata);
        } else {
          this.cacheService.setDashboard('TopLocationsByCity', cdata);
        }
      });
  }
  getTopLocationsbyState(
    topNumber: any,
    clientId: any,
    userEmailId: any,
    startDate: any,
    endDate: any
  ) {
    let cdata: ChartData[] = [{
      Dimension: [],
      Data: [
        {
          Name: '',
          Data: [],
        },
      ],
    }];
    this.widgetService
      .getTopLocationsbyStateFromDB(
        topNumber,
        clientId,
        userEmailId,
        startDate,
        endDate,
        'countbystate'
      )
      .subscribe((res) => {
        if (res != null && res.success) {
          if(res.value!=null){
            res.value.forEach((data: any) => {
              if (data.dimension && data.measure) {
                cdata[0].Dimension.push(data.dimension);
                cdata[0].Data[0].Data.push(data.measure);
              }
            });
          }
          this.cacheService.setDashboard('TopLocationsByState',cdata);
        } else {
          this.cacheService.setDashboard('TopLocationsByState', cdata);
        }
      });
  }
  getTopIndustries(
    topNumber: any,
    clientId: any,
    userEmailId: any,
    startDate: any,
    endDate: any
  ) {
    let cdata: ChartData[] = [{
      Dimension: [],
      Data: [
        {
          Name: '',
          Data: [],
        },
      ],
    }];
    this.widgetService
      .getTopIndustriesFromDB(
        topNumber,
        clientId,
        userEmailId,
        startDate,
        endDate,
        'countbyindustries'
      )
      .subscribe((res) => {
        if (res != null && res.success) {
          if(res.value!=null){
            res.value.forEach((data: any) => {
              if (data.dimension && data.measure) {
                cdata[0].Dimension.push(data.dimension);
                cdata[0].Data[0].Data.push(data.measure);
              }
            });
          }
          this.cacheService.setDashboard('TopIndustries',cdata);
        } else {
          this.cacheService.setDashboard('TopIndustries', cdata);
        }
      });
  }
  //Done
  getCoverageDistribution(
    topNumber: any,
    clientId: any,
    userEmailId: any,
    startDate: any,
    endDate: any
  ) {
    let cdata: ChartData = {
      Dimension: [],
      Data: [],
    };
    this.widgetService
      .getCoverageDistributionFromDB(
        topNumber,
        clientId,
        userEmailId,
        startDate,
        endDate,
        'countbylob'
      )
      .subscribe((res) => {
        if (
          res != null &&
          res.success
        ) {
          if(res.value!=null){
            const mappedArr : any[] = [];
            res.value.forEach((data: any)=>{
              let piechartdata={category: data.dimension, value: data.measure}
              mappedArr.push(piechartdata)
            })
            cdata.Data = mappedArr;
        }
          this.cacheService.setDashboard('CoverageDistribution',[cdata]);
        } else {
          this.cacheService.setDashboard('CoverageDistribution',[]);
        }
      });
  }
  getSubmissionConversions(
    topNumber: any,
    clientId: any,
    userEmailId: any,
    startDate: any,
    endDate: any
  ) {
    this.widgetService
      .getSubmissionConversionsFromDB(
        topNumber,
        clientId,
        userEmailId,
        startDate,
        endDate,
        ''
      )
      .subscribe((submissionConversionsSubject) => {
        this.globalService.setSubmissionConversions(
          submissionConversionsSubject
        );
      });
  }
  //Done
  getSubmissionTurnAroundTime(
    topNumber: any,
    clientId: any,
    userEmailId: any,
    startDate: any,
    endDate: any
  ) {
    let cdata: ChartData[] =[
      {
        Dimension:[],
        Data:[]
      }
    ]
    this.widgetService
      .getSubmissionTurnaroundTimeFromDB(
        topNumber,
        clientId,
        userEmailId,
        startDate,
        endDate,
        'countbyturnaroundtime'
      )
      .subscribe((res) => {
        if (
          res != null &&
          res.success
        ) {
          if(res.value!=null){
            cdata = this.getTranformedData(res);
          }
          this.cacheService.setDashboard('SubmissionTurnaroundTime',cdata);
        } else {
          this.cacheService.setDashboard('SubmissionTurnaroundTime', cdata);
        }
      });
  }
  //Done
  getTopBrokers(
    topNumber: any,
    clientId: any,
    userEmailId: any,
    startDate: any,
    endDate: any
  ) {
    let cdata: ChartData[] = [{
      Dimension: [],
      Data: [
        {
          Name: '',
          Data: [],
        },
      ],
    }];
    this.widgetService
      .getTopBrokersFromDB(
        topNumber,
        clientId,
        userEmailId,
        startDate,
        endDate,
        'countbybroker'
      )
      .subscribe((res) => {
        if (res != null && res.success) {
          if(res.value!=null){
            res.value.forEach((data: any) => {
              if (data.dimension && data.measure) {
                cdata[0].Dimension.push(data.dimension);
                cdata[0].Data[0].Data.push(data.measure);
              }
            });
          }
          this.cacheService.setDashboard('TopBrokers',cdata);
        } else {
          this.cacheService.setDashboard('TopBrokers', cdata);
        }
      });
  }

  getBodyClassBox(bodyClass: string): string {
    return bodyClass;
  }
  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this.globalService.setDashboardReload(false);
  }

  createInjector(config:any): any {
    var myInjector: Injector;
    let widgetInput: WidgetInput = {
      WidgetName: config.WidgetName,
      WidgetType: config.WidgetType,
      WidgetHeader : config.Header,
      Settings: {
        "DataType" : config.DataType!=null?config.DataType : ""
      },
      Keys: [],
      DataSubject: of([]),
    };

    widgetInput.DataSubject = this.cacheService.getDashboard(config.WidgetName);
    
    myInjector = Injector.create({
      providers: [{ provide: InjectToken, useValue: widgetInput }],
      parent: this.injector,
      name: config.WidgetName,
    });

    return myInjector;
  }
  getTranformedData(res:any){
    let cdata: ChartData[] =[
      {
        Dimension:[],
        Data:[]
      }
    ]
       let distDimension = [...new Set(res.value.map((item:any) => item.dimension))] as []
        let distCategory = [...new Set(res.value.map((item:any) => item.category))] as []
        cdata[0].Dimension = distDimension
        let tempResult = res.value;
       
        distCategory.forEach(x=>{
          
          let categoryGroup = tempResult.filter((rr:any)=> rr.category==x);
          let tempCategory = categoryGroup[0].category;
          let tempData:any[] = [];
          distDimension.forEach(dmsn=>{
            
            let filterdData = categoryGroup.filter((f:any)=>f.dimension==dmsn);
            if(filterdData!=null && filterdData.length>0){
              tempData.push(filterdData[0].measure)
            }
            else{
              tempData.push('')
            }
          })
          cdata[0].Data.push({Name:tempCategory,Data:tempData})
          
        })
        return cdata;
  }
}
