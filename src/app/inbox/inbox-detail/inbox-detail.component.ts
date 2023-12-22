import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  }
  setExposureSummary() {
    let type:string ="exposure_tiv"
    let clientId:string = "1074"
    let submissionId: string = "a55523ff-1c8e-446a-843f-e51b6a2c4d61"
    let email:string = "QBEsub@gmail.com"

    this.inboxService.getExposureSummary("exposure_tiv",clientId,submissionId,email).subscribe(res=>{
      console.log("TIV API Data")
      console.log(res);
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
      console.log("NoOfLocations API Data")
      console.log(res.value[0].measure);
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
      console.log("NoOfBuildings API Data")
      console.log(res.value);
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

    // this.cacheService.setExposureSummary('OccupancyType', [
    //   { category: 'Frame', value: '25' },
    //   { category: 'Joisted Masonary', value: '25' },
    //   { category: 'Non Combustible', value: '25' },
    //   { category: 'Modified Non Combustable', value: '25' },
    // ]);
  }
}
