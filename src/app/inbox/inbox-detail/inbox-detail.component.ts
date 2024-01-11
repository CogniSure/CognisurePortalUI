import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartData } from 'src/app/model/charts/chartdata';
import { SubmissionInfo } from 'src/app/model/inbox/SubmissionInfo';
import { CacheService } from 'src/app/services/common/cache.service';
import { GlobalService } from 'src/app/services/common/global.service';
import { InboxService } from 'src/app/services/inbox/inbox.service';
import { AccountInformation } from 'src/app/model/inbox/AccountInformation';

@Component({
  selector: 'app-inbox-detail',
  templateUrl: './inbox-detail.component.html',
  styleUrls: ['./inbox-detail.component.scss'],
})
export class InboxDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(
    private inboxService: InboxService,
    private globalService: GlobalService,
    private cacheService: CacheService
  ) {}
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.cacheService.clearSession();
    console.log('Inbox Detail Destroyed');
  }

  accountInformation: AccountInformation | null = null; 
  submissionData: any;
  ngOnInit(): void {
    console.log('Inbox Started');
    this.subscription = this.globalService
      .getCurrentSubmissionId()
      .subscribe((subId: any) => {
        this.inboxService
          .getSubmissionData(
            subId.MessageId
            // "AAMkADU1NjU3NzEyLWMxZTItNDA5Yy04N2E0LTkzYWNjNTc3ZWVlMQBGAAAAAABFiQ8wy3CORZrMw-rLQJlFBwCM8fwoQTOCSY_HjadmsuvGAAAAAAEMAACM8fwoQTOCSY_HjadmsuvGAAKVXoPlAAA="
          )
          .subscribe((res) => {
            this.submissionData = res.value;
            this.globalService.setCurrentSubmission(res);
          });
      });

    this.setExposureSummary();
    this.setLossSummary();
    this.getHeader();

    // this.accountInformation = {
    //   NamedinsuredFullname: 'Dante Mason',
    //   FullAddress: '885 Street, Warrnville, Illinois 60555',
    //   BusinessDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //   BusinessType: 'Property',
    //   EffectiveDate: '03/01/2023',
    //   OrganizationType: '',
    //   YearStarted: '',
    //   NumberOfEmployees: '',
    //   ProducerFullname: '',
    //   SICCode: '',
    //   Taxidentifier: '',
    //   ContactName: '',
    //   PhoneNumber: '8143-03312302301',
    //   Email: ''
    // };
    // this.inboxService.setAccountInformation(this.accountInformation);

  }

  setExposureSummary() {
    let type:string ="exposure_tiv"
    let clientId:string = "1074"
    let submissionId: string = "a55523ff-1c8e-446a-843f-e51b6a2c4d61"
    let email:string = "QBEsub@gmail.com"

    this.inboxService.getExposureSummary("exposure_tiv",clientId,"a88823ff-1c8e-667a-843f-f81b6a2c4d61",email).subscribe(res=>{
      if(res!=null && res.value != null && res.value.length > 0)
      {
        this.cacheService.setExposureSummary('TIV', [
          {
            ItemData: 'TIV',
            ItemValue: res.value[0].measure,
          },
        ]);
      }
      else 
      {
        this.cacheService.setExposureSummary('TIV', [
          {
            ItemData: 'TIV',
            ItemValue: '$0',
          },
        ]);
      }
    })
    
    this.inboxService.getExposureSummary("exposure_locationcount",clientId,submissionId,email).subscribe(res=>{
      if(res!=null && res.value != null && res.value.length > 0)
      {
        this.cacheService.setExposureSummary('NoOfLocations', [
          {
            ItemData: '# of Location',
            ItemValue: res.value[0].measure,
          },
        ]);
      }
      else 
      {
        this.cacheService.setExposureSummary('NoOfLocations', [
          {
            ItemData: '# of Location',
            ItemValue: '0',
          },
        ]);
      }
    })
    
    this.inboxService.getExposureSummary("exposure_locationcount",clientId,submissionId,email).subscribe(res=>{
      if(res!=null && res.value != null && res.value.length > 0)
      {
        this.cacheService.setExposureSummary('NoOfBuildings', [
          {
            ItemData: '# of Buildings',
            ItemValue: res.value[0].measure,
          },
        ]);
      }
      else 
      {
        this.cacheService.setExposureSummary('NoOfBuildings', [
          {
            ItemData: '# of Buildings',
            ItemValue: '0',
          },
        ]);
      }
    })
    
    this.inboxService.getExposureSummary("exposure_constructiontype",clientId,submissionId,email).subscribe(res=>{
      if(res!=null && res.value != null && res.value.length > 0)
      {
        let dataArr = res.value;
        const mappedArr = dataArr.map((x:any)=>{
          return {
            category:x.dimension,
            value:x.measure
          }
        })
        this.cacheService.setExposureSummary('ConstructionType',mappedArr)
      }
      else 
      {
        this.cacheService.setExposureSummary('ConstructionType', []);
      }
    })

    this.inboxService.getExposureSummary("exposure_occupancytype",clientId,submissionId,email).subscribe(res=>{
      if(res!=null && res.value != null && res.value.length > 0)
      {
        let dataArr = res.value;
        const mappedArr = dataArr.map((x:any)=>{
          return {
            category:x.dimension,
            value:x.measure
          }
        })
        this.cacheService.setExposureSummary('OccupancyType',mappedArr)
      }
      else 
      {
        this.cacheService.setExposureSummary('OccupancyType', []);
      }
    })

    this.inboxService.getExposureSummary("exposure_yearbuild",clientId,submissionId,email).subscribe(res=>{
      if(res!=null && res.value != null && res.value.length > 0)
      {
        let dataArr = res.value;
        const mappedArr = dataArr.map((x:any)=>{
          return {
            category:x.dimension,
            value:x.measure
          }
        })
        this.cacheService.setExposureSummary('YearBuild',mappedArr)
      }
      else 
      {
        this.cacheService.setExposureSummary('YearBuild', []);
      }
    })

    this.inboxService.getExposureSummary("exposure_protectionclass",clientId,submissionId,email).subscribe(res=>{
      if(res!=null && res.value != null && res.value.length > 0)
      {
        let dataArr = res.value;
        const mappedArr = dataArr.map((x:any)=>{
          return {
            category:x.dimension,
            value:x.measure
          }
        })
        this.cacheService.setExposureSummary('ProtectionClass',mappedArr)
      }
      else 
      {
        this.cacheService.setExposureSummary('ProtectionClass', []);
      }
    })
  }
  getHeader(){
    const type = 'account_information';
    const clientId = '1074';
    const submissionId = 'a55523ff-1c8e-446a-843f-e51b6a2c4d61';
    const email = 'QBEsub@gmail.com';

    this.inboxService.getAccountInformationfromDB(type, clientId, submissionId, email).subscribe(
      (accountInformation) => {
        this.cacheService.setAccountInformation(accountInformation);
        
      },
    );
    

  }
    
  setLossSummary() {
    let clientId:string = "1074"
    let submissionId: string = "a55523ff-1c8e-446a-843f-e51b6a2c4d61"
    let email:string = "QBEsub@gmail.com"

    this.inboxService.getLossSummary("loss_claimsbyLOBbyyear",clientId,submissionId,email).subscribe(res=>{
      console.log('sampleData ClaimsbyLOBbyYear');
      let cdata: ChartData[] =[
        {
          Dimension:[],
          Data:[]
        }
      ]
      // let cdata1: ChartData[] =[{
      //   Dimension: ['2018','2019','2020'],
      //   Data: [
      //     {
      //       Name: 'Wc',
      //       Data: [100,200,300],
      //     },
      //     {
      //       Name: 'Property',
      //       Data: [0,100,200],
      //     },
      //   ],
      // }];
      if (res != null && res.value != null && res.value.length > 0) {
        // res.value.forEach((data: any) => {
        //   if (data.dimension && data.measure) {
        //     cdata[0].Dimension.push(data.dimension);
        //     cdata[0].Data[0].Data.push(data.measure);
        //   }
        // });
        cdata = this.getTranformedData(res);
        this.cacheService.setLossSummary('ClaimsbyLOBbyYear',cdata);
       
      } else {
        this.cacheService.setLossSummary('ClaimsbyLOBbyYear', cdata);
      }
    })
    
    this.inboxService.getLossSummary("loss_incurredbyLOBbyyear",clientId,submissionId,email).subscribe(res=>{

      let cdata: ChartData[] =[
        {
          Dimension:[],
          Data:[]
        }
      ]
      if(res!=null && res.value != null && res.value.length > 0)
      {
        cdata = this.getTranformedData(res);
        this.cacheService.setLossSummary('IncurredbyLOBbyYear',cdata);
      }
      else
      {
        this.cacheService.setLossSummary('IncurredbyLOBbyYear', cdata);
      }
    })

    this.inboxService.getLossSummary("loss_incurredrangecount",clientId,submissionId,email).subscribe(res=>{
      let cdata: ChartData[] =[
        {
          Dimension:[],
          Data:[]
        }
      ]
      if(res!=null && res.value != null && res.value.length > 0)
      {
        cdata = this.getTranformedData(res);
        this.cacheService.setLossSummary('IncurredRangeCount',cdata);
      }
      else
      {
        this.cacheService.setLossSummary('IncurredRangeCount', cdata);
      }
    })

    this.inboxService.getLossSummary("loss_claimbyclaimtypebyyear",clientId,submissionId,email).subscribe(res=>{
      let cdata: ChartData[] =[
        {
          Dimension:[],
          Data:[]
        }
      ]
      if(res!=null && res.value != null && res.value.length > 0)
      {
        cdata = this.getTranformedData(res);
        this.cacheService.setLossSummary('ClaimbyClaimTypebyYear',cdata);
      }
      else
      {
        this.cacheService.setLossSummary('ClaimbyClaimTypebyYear', cdata);
      }
    })

    this.inboxService.getLossSummary("loss_incurredbyclaimtypebyyear",clientId,submissionId,email).subscribe(res=>{
      let cdata: ChartData[] =[
        {
          Dimension:[],
          Data:[]
        }
      ]
      if(res!=null && res.value != null && res.value.length > 0)
      {
        cdata = this.getTranformedData(res);
        this.cacheService.setLossSummary('IncurredbyClaimTypebyYear',cdata);
      }
      else
      {
        this.cacheService.setLossSummary('IncurredbyClaimTypebyYear', cdata);
      }
    })
 
    this.inboxService.getLossSummary("loss_claimsbyclaimtype",clientId,submissionId,email).subscribe(res=>{
      let cdata: ChartData[] =[
        {
          Dimension:[],
          Data:[]
        }
      ]
      if(res!=null && res.value != null && res.value.length > 0)
      {
        cdata = this.getTranformedData(res);
        this.cacheService.setLossSummary('ClaimsbyClaimType',cdata);
      }
      else
      {
        this.cacheService.setLossSummary('ClaimsbyClaimType', cdata);
      }
    })

    this.inboxService.getLossSummary("loss_claimstatus",clientId,submissionId,email).subscribe(res=>{
      let cdata=
        [
          {category: '', value: ''},
        ]
      if(res!=null && res.value != null && res.value.length > 0)
      {
        res.value.forEach((data: any) => {
          if (data.dimension && data.measure) {
            let piechartdata={category: data.dimension, value: data.measure}
            cdata.push(piechartdata)
          }
        });
        this.cacheService.setLossSummary('ClaimStatus',cdata);
      }
      else
      {
        this.cacheService.setLossSummary('ClaimStatus', cdata);
      }
    })

    this.inboxService.getLossSummary("loss_totalincurred",clientId,submissionId,email).subscribe(res=>{
      let cdata=
        [
          {category: '', value: ''},
        ]
      if(res!=null && res.value != null && res.value.length > 0)
      {
        res.value.forEach((data: any) => {
          if (data.dimension && data.measure) {
            let piechartdata={category: data.dimension, value: data.measure}
            cdata.push(piechartdata)
          }
        });
        this.cacheService.setLossSummary('TotalIncurred',cdata);
      }
      else
      {
        this.cacheService.setLossSummary('TotalIncurred', cdata);
      }
    })

    this.inboxService.getLossSummary("loss_toplocations",clientId,submissionId,email).subscribe(res=>{
      let cdata: ChartData[] =[{
        Dimension: [],
        Data: [
          {
            Name: '',
            Data: [],
          },
        ],
      }];    
      if(res!=null && res.value != null && res.value.length > 0)
      {
        cdata = this.getTranformedData(res);
        this.cacheService.setLossSummary('TopLocations',cdata);
      }
      else {
        this.cacheService.setLossSummary('TopLocations', cdata);
      }
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
