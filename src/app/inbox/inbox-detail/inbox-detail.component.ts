import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartData } from 'src/app/model/charts/chartdata';
import { SubmissionInfo } from 'src/app/model/inbox/SubmissionInfo';
import { CacheService } from 'src/app/services/common/cache.service';
import { GlobalService } from 'src/app/services/common/global.service';
import { InboxService } from 'src/app/services/inbox/inbox.service';

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

  setLossSummary() {
    let clientId:string = "1074"
    let submissionId: string = "a55523ff-1c8e-446a-843f-e51b6a2c4d61"
    let email:string = "QBEsub@gmail.com"

    this.inboxService.getLossSummary("loss_claimsbyLOBbyyear",clientId,submissionId,email).subscribe(res=>{
      console.log('sampleData ClaimsbyLOBbyYear');
      
      let cdata: ChartData[] =[{
        Categories: [],
        Data: [
          {
            Name: '',
            Data: [],
          },
        ],
      }];
      if (res != null && res.value != null && res.value.length > 0) {
        res.value.forEach((data: any) => {
          if (data.dimension && data.measure) {
            cdata[0].Categories.push(data.dimension);
            cdata[0].Data[0].Data.push(data.measure);
          }
        });
        console.log(cdata)
        this.cacheService.setLossSummary('ClaimsbyLOBbyYear',cdata);
       
      } else {
        this.cacheService.setLossSummary('ClaimsbyLOBbyYear', cdata);
      }
    })
    
    this.inboxService.getLossSummary("loss_incurredbyLOBbyyear",clientId,submissionId,email).subscribe(res=>{
      let cdata: ChartData[] =[{
        Categories: [],
        Data: [
          {
            Name: '',
            Data: [],
          },
        ],
      }];
      if(res!=null && res.value != null && res.value.length > 0)
      {
        res.value.forEach((data: any) => {
          if (data.dimension && data.measure) {
            cdata[0].Categories.push(data.dimension);
            cdata[0].Data[0].Data.push(data.measure);
          }
        });
        this.cacheService.setLossSummary('IncurredbyLOBbyYear',cdata);
        //this.cacheService.setLossSummary('IncurredbyLOBbyYear',mappedArr)
      }
      else
      {
        this.cacheService.setLossSummary('IncurredbyLOBbyYear', cdata);
      }
    })

    this.inboxService.getLossSummary("loss_incurredrangecount",clientId,submissionId,email).subscribe(res=>{
      let cdata: ChartData[] =[{
        Categories: [],
        Data: [
          {
            Name: '',
            Data: [],
          },
        ],
      }];
      if(res!=null && res.value != null && res.value.length > 0)
      {
        res.value.forEach((data: any) => {
          if (data.dimension && data.measure) {
            cdata[0].Categories.push(data.dimension);
            cdata[0].Data[0].Data.push(data.measure);
          }
        });
        this.cacheService.setLossSummary('IncurredRangeCount',cdata);
        //this.cacheService.setLossSummary('IncurredRangeCount',mappedArr)
      }
      else
      {
        this.cacheService.setLossSummary('IncurredRangeCount', cdata);
      }
    })

    this.inboxService.getLossSummary("loss_claimbyclaimtypebyyear",clientId,submissionId,email).subscribe(res=>{
      let cdata: ChartData[] =[{
        Categories: [],
        Data: [
          {
            Name: '',
            Data: [],
          },
        ],
      }];
      if(res!=null && res.value != null && res.value.length > 0)
      {
        res.value.forEach((data: any) => {
          if (data.dimension && data.measure) {
            cdata[0].Categories.push(data.dimension);
            cdata[0].Data[0].Data.push(data.measure);
          }
        });
        this.cacheService.setLossSummary('ClaimbyClaimTypebyYear',cdata);
        //this.cacheService.setLossSummary('ClaimbyClaimTypebyYear',mappedArr)
      }
      else
      {
        this.cacheService.setLossSummary('ClaimbyClaimTypebyYear', cdata);
      }
    })

    this.inboxService.getLossSummary("loss_incurredbyclaimtypebyyear",clientId,submissionId,email).subscribe(res=>{
      let cdata: ChartData[] =[{
        Categories: [],
        Data: [
          {
            Name: '',
            Data: [],
          },
        ],
      }];
      if(res!=null && res.value != null && res.value.length > 0)
      {
        res.value.forEach((data: any) => {
          if (data.dimension && data.measure) {
            cdata[0].Categories.push(data.dimension);
            cdata[0].Data[0].Data.push(data.measure);
          }
        });
        this.cacheService.setLossSummary('IncurredbyClaimTypebyYear',cdata);
        //this.cacheService.setLossSummary('IncurredbyClaimTypebyYear',mappedArr)
      }
      else
      {
        this.cacheService.setLossSummary('IncurredbyClaimTypebyYear', cdata);
      }
    })
 
    this.inboxService.getLossSummary("loss_claimsbyclaimtype",clientId,submissionId,email).subscribe(res=>{
      let cdata: ChartData[] =[{
        Categories: [],
        Data: [
          {
            Name: '',
            Data: [],
          },
        ],
      }];
      if(res!=null && res.value != null && res.value.length > 0)
      {
        res.value.forEach((data: any) => {
          if (data.dimension && data.measure) {
            cdata[0].Categories.push(data.dimension);
            cdata[0].Data[0].Data.push(data.measure);
          }
        });
        this.cacheService.setLossSummary('ClaimsbyClaimType',cdata);
        //this.cacheService.setLossSummary('ClaimsbyClaimType',mappedArr)
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
        //this.cacheService.setLossSummary('ClaimStatus',mappedArr)
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
        //this.cacheService.setLossSummary('TotalIncurred',mappedArr)
      }
      else
      {
        this.cacheService.setLossSummary('TotalIncurred', cdata);
      }
    })

    this.inboxService.getLossSummary("loss_toplocations",clientId,submissionId,email).subscribe(res=>{
      let cdata: ChartData[] =[{
        Categories: [],
        Data: [
          {
            Name: '',
            Data: [],
          },
        ],
      }];    
      if(res!=null && res.value != null && res.value.length > 0)
      {
        res.value.forEach((data: any) => {
          if (data.dimension && data.measure) {
            cdata[0].Categories.push(data.dimension);
            cdata[0].Data[0].Data.push(data.measure);
          }
        });
        this.cacheService.setLossSummary('TopLocations',cdata);
        //this.cacheService.setLossSummary('TopLocations', mappedArr);
      }
      else {
        this.cacheService.setLossSummary('TopLocations', cdata);
      }
    })

  }
}
