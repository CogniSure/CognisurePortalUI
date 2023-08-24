import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/common/global.service';
import { InboxService } from 'src/app/services/inbox/inbox.service';

@Component({
  selector: 'app-inbox-detail',
  templateUrl: './inbox-detail.component.html',
  styleUrls: ['./inbox-detail.component.scss']
})
export class InboxDetailComponent implements OnInit,OnDestroy {
  subscription: Subscription;
  constructor(private inboxService : InboxService,private globalService : GlobalService){

  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  submissionData :any
  ngOnInit(): void {
    this.subscription = this.globalService.getCurrentSubmissionId().subscribe(subId=>{
     
      this.inboxService.getSubmissionData(
        subId
        // "AAMkADU1NjU3NzEyLWMxZTItNDA5Yy04N2E0LTkzYWNjNTc3ZWVlMQBGAAAAAABFiQ8wy3CORZrMw-rLQJlFBwCM8fwoQTOCSY_HjadmsuvGAAAAAAEMAACM8fwoQTOCSY_HjadmsuvGAAKVXoPlAAA="
        ).subscribe(res=>{
        this.submissionData = res.value;
        this.globalService.setCurrentSubmission(res)
      })
    })
    
    
  }

}
