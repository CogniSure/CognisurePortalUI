import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { InboxService } from 'src/app/services/inbox/inbox.service';


@Component({
  selector: 'app-emailpopup',
  templateUrl: './emailpopup.component.html',
  styleUrls: ['./emailpopup.component.scss']
})
export class EmailpopupComponent implements OnInit{
  
  @Input() SubmissionId : any =  "0"
constructor(private inboxService : InboxService, private changedetector: ChangeDetectorRef){
  
}
  ngOnInit(): void {
    console.log("Submission Merssgae Body");
    console.log(this.SubmissionId)
    this.inboxService.getSubmissionEmailMessage(this.SubmissionId).subscribe(msg=>{
      console.log("Submission Merssgae Body");
      console.log(msg.value);
      this.htmlData = msg.value;
      this.changedetector.detectChanges();
    })
  }
  
  htmlData = ''
 

}
