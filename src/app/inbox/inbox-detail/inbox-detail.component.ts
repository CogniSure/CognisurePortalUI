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
    this.inboxService.getSubmissionData("AAMkADU1NjU3NzEyLWMxZTItNDA5Yy04N2E0LTkzYWNjNTc3ZWVlMQBGAAAAAABFiQ8wy3CORZrMw-rLQJlFBwCM8fwoQTOCSY_HjadmsuvGAAAAAAEMAACM8fwoQTOCSY_HjadmsuvGAAKVXoPlAAA=").subscribe(res=>{
      console.log("Test");
      this.submissionData = res.value;
      console.log(res)
      this.globalService.setCurrentSubmission(res)
    })
    
  }

}
