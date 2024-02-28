import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InboxService } from 'src/app/services/inbox/inbox.service';


@Component({
  selector: 'app-emailpopup',
  templateUrl: './emailpopup.component.html',
  styleUrls: ['./emailpopup.component.scss']
})
export class EmailpopupComponent implements OnInit{
  
  @Input() SubmissionId : any =  "0"
constructor(private inboxService : InboxService, private changedetector: ChangeDetectorRef,
  private dialog: MatDialog,
    public dialogRef: MatDialogRef<EmailpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
  this.SubmissionId = data.SubmissionID
}
  ngOnInit(): void {
    this.inboxService.getSubmissionEmailMessage(this.SubmissionId).subscribe(msg=>{
      if(msg!=null && msg.value !=null){
        this.htmlData = msg.value.messageBody;
        this.senderEmail = msg.value.messageReceivedFromEmail
        this.messgageSubject = msg.value.messageSubject
        this.receivedOn = msg.value.messageReceivedOn
        this.changedetector.detectChanges();
      }
      
    })
  }
  
  htmlData = ''
  senderEmail = ""
  messgageSubject = ""
  receivedOn = ""
}
