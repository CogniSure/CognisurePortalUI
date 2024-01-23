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
import { WidgetComponent } from 'src/app/model/widgets/widgetComponents';
import { CacheService } from 'src/app/services/common/cache.service';
import { ChartData } from 'src/app/model/charts/chartdata';
import { InboxService } from 'src/app/services/inbox/inbox.service';
import { AccountInformation } from 'src/app/model/inbox/AccountInformation';
import { AccountInfo } from 'src/app/model/inbox/AccountInfo';
import { CoverageData } from 'src/app/model/summary/CoverageData';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  summaryComponentOrder: any;
  widgetComponents: WidgetComponent[] = [];

  public summaryComponents: WidgetComponentInfo[] = [];
  propertyComponentOrder: any;
  public lobComponents: any[] = [];
  reloadReq = true;
  public downloadIcon: SVGIcon = downloadIcon;
  @Input() collapsed = false;
  isFullScreen = false;
  widgetTemp: any;
  constructor(
    private injector: Injector,
    private globalService: GlobalService,
    private dbService: DashboardService,
    private inboxService: InboxService,
    private cacheService: CacheService
  ) {
    //this.globalService.setDashboardReload(true);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  animationClass = 'slide-effect-x1';
  ngAfterViewInit() {
    this.globalService.animationClass$.next('');
  }

  ngOnInit(): void {
    this.globalService.animationClass$.next('slide-effect-x1');

    this.getWidgets();
  }
  getWidgets() {
    // this.getPropertyWidgets();

    this.cacheService.getAccountInformation().subscribe((info: any) => {
      //console.log('LOB List');
      let lobs = info.LOB;
      this.getSummaryWidgets();
      this.getSummaryWidgetsData();
      if(lobs!=null && lobs!="" ){
        let lobArr = lobs.split(",")
        lobArr.forEach((lob:any)=>{
          //console.log(lob);
          let currLob = lob.replace(" ", "") 
          let lobConfig = this.getWidgetConfigsForLOB(currLob);
          // let lobWidgets = [];
          // if(lobConfig!=null && lobConfig.length>0){
          //   lobConfig.forEach((widgetyConfig:any)=>{
          //     lobWidgets.push(widgetyConfig!)
          //   })

          // }
          this.getWidgetDataForLOB(currLob)
          //this.lobComponents.push(lobConfig!)
          // if(widgetData!=null && widgetData.length>0){
          //   this.widgetComponents.push({Header : lob, Widget : widgetData})
          // }

        })
      }
    });
  }

  getSummaryWidgets() {
    this.summaryComponentOrder = DataComponent.Summaryhub;
    this.summaryComponents = [];
    var i = 1;
    this.summaryComponentOrder.forEach((entry: any) => {
      this.summaryComponents.push({
        Widget: ComponentDetails.get(entry.WidgetType)![0],
        WidgetName: entry.WidgetName,
        WidgetType: entry.WidgetType,
        Header: entry.Header,
        ColumnId: entry.ColumnId,
        ColumnSpan: entry.ColumnSpan,
        RowSpan: entry.RowSpan,
        HeaderColor: entry.HeaderColor,
        FontColor: entry.FontColor,
      });
      i++;
    });
  }
  getSummaryWidgetsData() {
    const topNumber = '10';
    const clientId = '1074';
    const userEmailId = 'QBEsub@gmail.com';
    const startDate = '01/01/2023';
    const endDate = '9/30/2024';
    const submissionId = 'a44413ee-1c8e-446a-843f-e51b6a2c4c51';
    let data: any = {};
    //let data = this.getPropertyWidgetConfigs();
    this.inboxService
      .getSummaryByLOB('sub_agencies_all', clientId, submissionId, userEmailId)
      .subscribe((res) => {
        let cdata: any = {
          AgencyName: 'NA',
          AgencyCode: 'NA',
          Producer: 'NA',
          ProducerEmail: 'NA',
          ProducerPhoneNo: 'NA',
          ActivityRank: 'NA',
        };
        if (res != null && res.value != null && res.value.agency != null) {
          let tempData = res.value.agency;
          cdata.AgencyName =
            tempData.agencyName != null ? tempData.agencyName : 'NA';
          cdata.AgencyCode =
            tempData.agencyCode != null ? tempData.agencyCode : 'NA';
          cdata.Producer = tempData.producer != null ? tempData.producer : 'NA';
          cdata.ProducerEmail =
            tempData.producerEmail != null ? tempData.producerEmail : 'NA';
          cdata.ProducerPhoneNo =
            tempData.producerPhoneNo != null ? tempData.producerPhoneNo : 'NA';
          cdata.ActivityRank =
            tempData.activityRank != null ? tempData.activityRank : 'NA';

          // console.log(cdata)
          this.cacheService.setSummaryByLOB('Agency', [cdata]);
        } else {
          this.cacheService.setSummaryByLOB('Agency', []);
        }
      });
    this.inboxService
      .getSummaryByLOB(
        'sub_businessoperations_all',
        clientId,
        submissionId,
        userEmailId
      )
      .subscribe((res) => {
        let cdata: any = {
          SIC: 'NA',
          Naics: 'NA',
          Descriptions: 'NA',
        };
        if (res != null && res.value != null) {
          let tempData = res.value.businessOperation;
          cdata.SIC = tempData.sic != null ? tempData.sic : 'NA';
          cdata.Naics = tempData.naics != null ? tempData.naics : 'NA';
          cdata.Descriptions =
            tempData.descriptions != null ? tempData.descriptions : 'NA';
          this.cacheService.setSummaryByLOB('BusinessOperations', [cdata]);
        } else {
          this.cacheService.setSummaryByLOB('BusinessOperations', []);
        }
      });

    // this.cacheService.getSummaryByLOB("Agency").subscribe(x=>{
    //   console.log("Widget Data : "+ "Agency")
    //   console.log(x)
    //  })
    this.inboxService
      .getSummaryByLOB(
        'sub_totallosses_all',
        clientId,
        submissionId,
        userEmailId
      )
      .subscribe((res) => {
        let cdata: any[] = [];
        
        if (res != null && res.value != null) {
          let tempData = res.value.totalLosses;


          if (tempData != null && tempData.length > 0) {
            tempData.forEach((element: any) => {
              let cDataTemp: any = {
                Year: element.year != null ? element.year : '',
                GrossIncurred:
                  element.grossAmount != null ? element.grossAmount : '',
                TotalNoOfClaims:
                  element.totalNoOfClaims != null
                    ? element.totalNoOfClaims
                    : '',
                TotalNoOfOpenClaims:
                  element.noOfOpenClaims != null ? element.noOfOpenClaims : '',
              };
              cdata.push(cDataTemp);
            });
          }
          this.cacheService.setSummaryByLOB('Totallosses', cdata);
        } else {
          this.cacheService.setSummaryByLOB('Totallosses', []);
        }
      });
    return data;
  }
  getWidgetDataForLOB(lob: any) {
    switch (lob.toLowerCase()) {
      case 'property': {
        //this.getPropertyWidgetConfigs();
        return this.getPropertyWidgetData();
      }

      // case 'generalliability':
      //   return this.getPropertyWidgetData();
      default:
        return null;
    }
  }
  getPropertyWidgetData() {
    const topNumber = '10';
    const clientId = '1074';
    const userEmailId = 'submissiontesting@cognisure.ai';
    const startDate = '01/01/2023';
    const endDate = '9/30/2024';
    const submissionId = 'b66623ff-3c5e-887a-423f-f92b8a4c8d98';
    let data: any = {};
    
    this.inboxService
      .getSummaryByLOB('sub_exposure_property', clientId, submissionId, userEmailId)
      .subscribe((res) => {
        let cdata: any = {
          BuildingsCount: 'NA',
          LocationsCount: 'NA',
          StatesCount: 'NA',
          TIV: 'NA',
          
        };
        
        
        if (res != null && res.value != null && res.value.propertyExposure != null) {
          let tempData = res.value.propertyExposure;
         
          cdata.BuildingsCount =
            tempData.buildingsCount != null ? tempData.buildingsCount : 'NA';
          cdata.LocationsCount =
            tempData.locationsCount != null ? tempData.locationsCount : 'NA';
          cdata.StatesCount = tempData.statesCount != null ? tempData.statesCount : 'NA';
          cdata.TIV = tempData.tiv != null ? tempData.tiv : 'NA';
          
          this.cacheService.setSummaryByLOB('PropertyExposure', [cdata]);
        } else {
          this.cacheService.setSummaryByLOB('PropertyExposure', []);
        }
      });

      this.inboxService
      .getSummaryByLOB(
        'sub_coverage_property',
        clientId,
        submissionId,
        userEmailId
      )
      .subscribe((res) => {
        let cdata: any[] = [];
        //console.log("Property Exposure Before")
        if (res != null && res.value != null && res.value.propertyCoverages != null) {
          let tempData = res.value.propertyCoverages;

          
          if (tempData != null && tempData.length > 0) {
            tempData.forEach((element: any) => {
              let cDataTemp: CoverageData = {
                CoverageName: element.coverageName != null ? element.coverageName : '',
                CoverageValue: element.coverageValue != null ? element.coverageValue : '',
                CoverageType: element.CoverageType != null ? element.CoverageType : ''
              };
              cdata.push(cDataTemp);
            });
          }
          //console.log(cdata)
          this.cacheService.setSummaryByLOB('PropertyCoverages', cdata);
        } else {
          this.cacheService.setSummaryByLOB('PropertyCoverages', []);
        }
      });

      this.inboxService
      .getSummaryByLOB(
        'sub_losses_property',
        clientId,
        submissionId,
        userEmailId
      )
      .subscribe((res) => {
        let cdata: any[] = [];
        if (res != null && res.value != null && res.value.propertyLosses != null) {
          let tempData = res.value.propertyLosses;

          if (tempData != null && tempData.length > 0) {
            tempData.forEach((element: any) => {
              let cDataTemp: any = {
                Year: element.year != null ? element.year : '',
                GrossIncurred:
                  element.grossAmount != null ? element.grossAmount : '',
                TotalNoOfClaims:
                  element.totalNoOfClaims != null
                    ? element.totalNoOfClaims
                    : '',
                TotalNoOfOpenClaims:
                  element.noOfOpenClaims != null ? element.noOfOpenClaims : '',
              };
              cdata.push(cDataTemp);
            });
          }
          this.cacheService.setSummaryByLOB('PropertyLosses', cdata);
        } else {
          this.cacheService.setSummaryByLOB('PropertyLosses', []);
        }
      });
  }
  getWidgetConfigsForLOB (lob:string){
    switch (lob.toLowerCase()) {
      case 'property': {
        let lobConfig = this.getPropertyWidgetConfigs();
        if(lobConfig!=null && lobConfig.length>0){
          this.widgetComponents.push({Header : "Property", Widget : lobConfig})
        }
        break;
      }

      case 'auto':{
        let lobConfig =  this.getAutoWidgetConfigs();
        if(lobConfig!=null && lobConfig.length>0){
          this.widgetComponents.push({Header : "Auto Mobiles", Widget : lobConfig})
        }
        break;
      }
        
      default:
        break;
    }
  }
  getPropertyWidgetConfigs() {
    this.propertyComponentOrder = DataComponent.Propertyhub;
    let propertyComponents: any[] = [];
    var i = 1;
    this.propertyComponentOrder.forEach((entry: any) => {
      propertyComponents.push({
        Widget: ComponentDetails.get(entry.WidgetType)![0],
        WidgetName: entry.WidgetName,
        WidgetType: entry.WidgetType,
        Header: entry.Header,
        ColumnId: entry.ColumnId,
        ColumnSpan: entry.ColumnSpan,
        RowSpan: entry.RowSpan,
        HeaderColor: entry.HeaderColor,
        FontColor: entry.FontColor,
      });
      i++;
    });

    return propertyComponents;
  }
  getAutoWidgetConfigs() {
    this.propertyComponentOrder = DataComponent.Autohub;
    let propertyComponents: any[] = [];
    var i = 1;
    this.propertyComponentOrder.forEach((entry: any) => {
      propertyComponents.push({
        Widget: ComponentDetails.get(entry.WidgetType)![0],
        WidgetName: entry.WidgetName,
        WidgetType: entry.WidgetType,
        Header: entry.Header,
        ColumnId: entry.ColumnId,
        ColumnSpan: entry.ColumnSpan,
        RowSpan: entry.RowSpan,
        HeaderColor: entry.HeaderColor,
        FontColor: entry.FontColor,
      });
      i++;
    });

    return propertyComponents;
  }
  getBodyClassBox(bodyClass: string): string {
    return bodyClass;
  }
  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this.globalService.setDashboardReload(false);
  }
  getWidgetItemKeys(widgetName:string){
    let widgetKeys = [];
    if(widgetName == "PropertyExposure"){
      widgetKeys.push("Total Insured Value");
      widgetKeys.push("# of Locations");
      widgetKeys.push("# of Buildings");
      widgetKeys.push("States");
    }
    else if(widgetName == "AutoExposure"){
      widgetKeys.push("Total # of Vehicles");
      widgetKeys.push("Total # of Drivers");
      widgetKeys.push("Type of Body Type");
      widgetKeys.push("# of Body Type");
    }
    return widgetKeys;
  }
  createInjector(widgetName: string, widgetType: string,widgetHeader:string=""): any {
    var myInjector: Injector;
    let widgetInput: WidgetInput = {
      WidgetName: widgetName,
      WidgetType: widgetType,
      WidgetHeader :widgetHeader,
      Settings: {},
      Keys: this.getWidgetItemKeys(widgetName),
      DataSubject: this.cacheService.getSummaryByLOB(widgetName),
    };
    
    myInjector = Injector.create({
      providers: [{ provide: InjectToken, useValue: widgetInput }],
      parent: this.injector,
      name: widgetName,
    });
    //this.reloadReq = false;
    return myInjector;
  }
  download() {
    // var submissionId = "AAMkADU1NjU3NzEyLWMxZTItNDA5Yy04N2E0LTkzYWNjNTc3ZWVlMQBGAAAAAABFiQ8wy3CORZrMw-rLQJlFBwCM8fwoQTOCSY_HjadmsuvGAAAAAAEMAACM8fwoQTOCSY_HjadmsuvGAAKVXoPlAAA=";
    this.subscription = this.globalService
      .getCurrentSubmissionId()
      .subscribe((submissionId: SubmissionInfo) => {
        this.dbService
          .downloadSubmission360(submissionId.MessageId)
          .subscribe((downloadRes) => {
            const source = `data:application/pdf;base64,${downloadRes.value.data}`;
            const downloadLink = document.createElement('a');
            const fileName = downloadRes.value.fileName;

            downloadLink.href = source;
            downloadLink.download = fileName;
            downloadLink.click();
          });
      });
  }
  getTranformedData(res: any) {
    let cdata: ChartData[] = [
      {
        Dimension: [],
        Data: [],
      },
    ];
    let distDimension = [
      ...new Set(res.value.map((item: any) => item.dimension)),
    ] as [];
    let distCategory = [
      ...new Set(res.value.map((item: any) => item.category)),
    ] as [];
    cdata[0].Dimension = distDimension;
    let tempResult = res.value;

    distCategory.forEach((x) => {
      let categoryGroup = tempResult.filter((rr: any) => rr.category == x);
      let tempCategory = categoryGroup[0].category;
      let tempData: any[] = [];
      distDimension.forEach((dmsn) => {
        let filterdData = categoryGroup.filter((f: any) => f.dimension == dmsn);
        if (filterdData != null && filterdData.length > 0) {
          tempData.push(filterdData[0].measure);
        } else {
          tempData.push('');
        }
      });
      cdata[0].Data.push({ Name: tempCategory, Data: tempData });
    });
    return cdata;
  }
}
