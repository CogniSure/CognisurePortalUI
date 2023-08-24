import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/common/global.service';
import { InboxService } from 'src/app/services/inbox/inbox.service';

@Component({
  selector: 'app-inbox-detail',
  templateUrl: './inbox-detail.component.html',
  styleUrls: ['./inbox-detail.component.scss']
})
export class InboxDetailComponent implements OnInit {
  constructor(private inboxService : InboxService,private globalService : GlobalService){

  }
  submissionData :any
  ngOnInit(): void {
    this.globalService.CurrentSubmissionId$.subscribe(subId=>{
      this.inboxService.getSubmissionData(
        //subId
        "AAMkADU1NjU3NzEyLWMxZTItNDA5Yy04N2E0LTkzYWNjNTc3ZWVlMQBGAAAAAABFiQ8wy3CORZrMw-rLQJlFBwCM8fwoQTOCSY_HjadmsuvGAAAAAAEMAACM8fwoQTOCSY_HjadmsuvGAAKVXoPlAAA="
        ).subscribe(res=>{
        this.submissionData = res.value;
        this.globalService.setCurrentSubmission(res)
      })
    })
    
    
  }

}
