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

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit,OnDestroy {
  subscription: Subscription;  
  summaryComponentOrder: any;
  widgetComponents:WidgetComponent[] = []

  public summaryComponents: WidgetComponentInfo[] = [];
  propertyComponentOrder: any;
  //public propertyComponents: WidgetComponentInfo[] = [];
  reloadReq = true;
  public downloadIcon:SVGIcon = downloadIcon;
  @Input() collapsed = false;
  isFullScreen = false;
  widgetTemp: any;
  constructor(
    private injector: Injector,
    private globalService: GlobalService,
    private dbService: DashboardService,
    private inboxService : InboxService,
    private cacheService: CacheService,
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
    this.globalService.animationClass$.next('');
  }

  ngOnInit(): void {
    console.log("Summary Started")
    this.globalService.animationClass$.next('slide-effect-x1');
    
    this.getWidgets();
  }
  getWidgets(){
     
    // this.getPropertyWidgets();
    
    this.cacheService.getAccountInformation().subscribe((info:any)=>{
      console.log("LOB List");
      let lobs = info.LOB;
      this.getSummaryWidgets();
      this.getSummaryWidgetsData();
      // if(lobs!=null && lobs!="" ){
      //   let lobArr = lobs.split(",")
      //   lobArr.forEach((lob:any)=>{
      //     console.log(lob);
      //     let widgetData = this.getWidgetData(lob.replace(" ", "") );
      //     if(widgetData!=null && widgetData.length>0){
      //       this.widgetComponents.push({Header : lob, Widget : widgetData})
      //     }
          
      //   })
      // }
    })
    // this.widgetComponents.push({Header : "Property", Widget : this.getPropertyWidgets()})
    // this.widgetComponents.push({Header : "Workers Compensastion", Widget : this.getPropertyWidgets()})
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
  getWidgetData(lob:any){
    switch(lob.toLowerCase()){
      case "property":{
        this.getPropertyWidgetConfigs();
        return this.getPropertyWidgetData();
      }
        
      case "generalliability":
        return this.getPropertyWidgetData();
      default :
        return null;
    }
  }
  getPropertyWidgetData(){


  }
  getSummaryWidgetsData(){
    const topNumber = '10';
    const clientId = '1074';
    const userEmailId = 'QBEsub@gmail.com';
    const startDate = '01/01/2023';
    const endDate = '9/30/2024';
    const submissionId = "a44413ee-1c8e-446a-843f-e51b6a2c4c51"
    let data:any = {}
    //let data = this.getPropertyWidgetConfigs();
    this.inboxService.getSummaryByLOB("sub_agencies_all",clientId,submissionId,userEmailId).subscribe(res=>{
      
      let cdata : any = {
        AgencyName: "NA",
        AgencyCode: "NA",
        Producer: "NA",
        ProducerEmail: "NA",
        ProducerPhoneNo: "NA",
        ActivityRank: "NA",
      };
      if (res != null && res.value != null && res.value.agency != null) {
        
        let tempData  = res.value.agency;
        cdata.AgencyName = tempData.agencyName != null ? tempData.agencyName:"NA"
        cdata.AgencyCode = tempData.agencyCode != null ? tempData.agencyCode:"NA"
        cdata.Producer = tempData.producer != null ? tempData.producer:"NA"
        cdata.ProducerEmail = tempData.producerEmail != null ? tempData.producerEmail:"NA"
        cdata.ProducerPhoneNo = tempData.producerPhoneNo != null ? tempData.producerPhoneNo:"NA"
        cdata.ActivityRank = tempData.activityRank != null ? tempData.activityRank:"NA"

        
       // console.log(cdata)
        this.cacheService.setSummaryByLOB('Agency',[cdata]);
       
      } else {
        this.cacheService.setSummaryByLOB('Agency', []);
      }
    })
    this.inboxService.getSummaryByLOB("sub_businessoperations_all",clientId,submissionId,userEmailId).subscribe(res=>{
      let cdata : any = {
        SIC: "NA",
        Naics: "NA",
        Descriptions: "NA"
      };
      console.log("Widget Data : "+ "Business Operations Before")
        console.log(res)
      if (res != null && res.value != null) {
        let tempData = res.value.businessOperation;
        cdata.SIC = tempData.sic != null ? tempData.sic:"NA"
        cdata.Naics = tempData.naics != null ? tempData.naics:"NA"
        cdata.Descriptions = tempData.descriptions != null ? tempData.descriptions:"NA"
        this.cacheService.setSummaryByLOB('BusinessOperations',[cdata]);
       
      } else {
        this.cacheService.setSummaryByLOB('BusinessOperations', []);
      }
    })

    // this.cacheService.getSummaryByLOB("Agency").subscribe(x=>{
    //   console.log("Widget Data : "+ "Agency")
    //   console.log(x)
    //  })
    // this.inboxService.getSummaryByLOB("sub_totallosses_all",clientId,submissionId,userEmailId).subscribe(res=>{
    //   let cdata: ChartData[] =[
    //     {
    //       Dimension:[],
    //       Data:[]
    //     }
    //   ]
    //   if (res != null && res.value != null && res.value.length > 0) {
    //     cdata = this.getTranformedData(res);
    //     this.cacheService.setLossSummary('Totallosses',cdata);
       
    //   } else {
    //     this.cacheService.setLossSummary('Totallosses', cdata);
    //   }
    // })
    return data;
  }
  getPropertyWidgetConfigs(){
    this.propertyComponentOrder = DataComponent.Propertyhub;
    let propertyComponents:any[] = [];
    var i = 1;
    this.propertyComponentOrder.forEach((entry: any) => {
      propertyComponents.push({
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

    
    return propertyComponents;
  }
  getBodyClassBox(bodyClass: string): string {
    return bodyClass;
  }
  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this.globalService.setDashboardReload(false);
  }
  createInjector(widgetName: string, widgetType: string): any {
    var myInjector: Injector;
    let widgetInput: WidgetInput = {
      WidgetName: widgetName,
      WidgetType: widgetType,
      Settings : {}, 
      Data : [],
      DataSubject : this.cacheService.getSummaryByLOB(widgetName)
    };
   
    myInjector = Injector.create({
      providers: [{ provide: InjectToken, useValue: widgetInput }],
      parent: this.injector,
      name: widgetName,
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
