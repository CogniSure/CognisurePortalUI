import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  Message,
  SendMessageEvent,
  User,
} from '@progress/kendo-angular-conversational-ui';
import { Observable, Subject, Subscription, from, map, merge, scan } from 'rxjs';
import { UploadFile } from 'src/app/model/common/uploadfile';
import { ChatService } from 'src/app/services/common/chat.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InboxService } from 'src/app/services/inbox/inbox.service';
import { ChatMessage } from 'src/app/model/common/chatmessage';

@Component({
  selector: 'app-copilot',
  templateUrl: './copilot.component.html',
  styleUrls: ['./copilot.component.scss'],
})
export class CopilotComponent implements OnInit,OnDestroy {
  accountName: string = '';
  submissionId: string = '';
  showSubmissionId: boolean = false;
  isMaximized: boolean = false;
  originalWidth: string;
  originalHeight: string;
  subscription: Subscription;
  messageGuid: string = 'guid';

  messageArr : any[]= [];
  searchableFiles: { name: string;uid: string; base64Data: string, isSelected : boolean }[] = [];
  public readonly user: User = {
    id: 1,
    avatarUrl : "assets/images/defaultprofilepic.png"
  };

  public readonly bot: User = {
    id: 0,
    avatarUrl : "../../../assets/icons/Copilot.svg"
  };
  public feed: Observable<Message[]>;
  private local: Subject<Message> = new Subject<Message>();
  
  // Merge local and remote messages into a single stream
  
  constructor(
    private svc: ChatService,
    private inboxService: InboxService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CopilotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  log(str : string)
  {
    console.log("Response")
    this.local.subscribe(x=>{

      console.log(x)
    })
    console.log(str)
    return false;
  }
  ngOnInit(): void {
    this.toggleMaximize();
    if (this.data.SubmissionID != null) {
      this.showSubmissionId = true;
      this.submissionId = this.data.SubmissionID;
      this.accountName = this.data.AccountName;
      const hello: Message = {
        author: this.bot,
        suggestedActions: [
        ],
        timestamp: new Date(),
        text: 'CogniSure Copilot',
      };
      this.feed = merge(
        from([hello]),
        this.local,
        this.svc.responses.pipe(
          map(
            (response): Message => ({
              author: this.bot,
              text: response.trim(),
              typing : this.log(response)
            })
          )
        )
      ).pipe(scan((acc: Message[], x: Message) => [...acc, x], []));
      
      this.inboxService
        .getSubmissionFilesFromDB('0', this.data.SubmissionID, '0',true)
        .subscribe((res) => {
          if (res != null && res.value != null && res.value.length > 0) {
            res.value.forEach((file: any) => {
              this.searchableFiles.push({
                name: file.fileOriginalName,
                uid : file.fileGUID,
                base64Data: file.fileData,
                isSelected : false
              });
            });
          }
        });
    }

  }

  ResetChatHistory(){
    const hello: Message = {
      author: this.bot,
      suggestedActions: [
      ],
      timestamp: new Date(),
      text: 'CogniSure Copilot',
    };
   this.svc.responses = new Subject<string>()

    //  this.feed = merge(from([hello]),this.local,[]).pipe(scan((acc: Message[], x: Message) => [...acc, x], []));
    // this.feed.subscribe(x=>{
    //   console.log("Message Array")
    //   console.log(this.messageArr)
    //   this.messageArr.push(x);
    // })
    // this.svc.responses = new Subject<string>()
    this.feed = merge(
      from([hello]),
      this.local,
      this.svc.responses.pipe(
        map(
          (response): Message => ({
            author: this.bot,
            text: response.trim(),
            typing : this.log(response)
          })
        )
      )
    ).pipe(scan((acc: Message[], x: Message) => [...acc, x], []));
  }
  public sendMessage(e: SendMessageEvent): void {
    this.local.next(e.message);

    this.local.next({
      author: this.bot,
      typing: true,
    });
    // console.log("Ask Questions")
    // this.local.subscribe(x=>
      
    //   {
    //     console.log(x)
    //   })
    this.svc.submit(e.message.text!, this.messageGuid);
  }

  Upload(selectedFile : any) : any {
    let uplfile: UploadFile;
    //this.preventDefault
    
    this.ResetChatHistory();
    console.log("Selected File for copilot")
    console.log(selectedFile)
    if(selectedFile != null){
      uplfile = {
        FileName: selectedFile.name,
        FileGUID: selectedFile.uid,
        FileSize: 0,
        FileType: selectedFile.mimeType,
        FileContent: selectedFile.base64Data
      };
      console.log("copilot files")
      console.log(selectedFile)
      console.log(uplfile)
      return this.svc.uploadCopilotFiles(uplfile).subscribe((res: any) => {
        this.messageGuid = res.value;
      });
    }
    else {
      this.messageGuid = "guid"
    }
  }
  
  toggleMaximize() {
    console.log("Toggle SIze Before : " + this.isMaximized)
    if (this.isMaximized) {
      this.minimize();
    } else {
      this.maximize();
    }
    console.log("Toggle SIze After : " + this.isMaximized)
  }

  maximize() {
    this.dialogRef.updateSize('90%', '88%');
    this.isMaximized = true;
  }

  minimize() {
    this.dialogRef.updateSize('75%', 'auto');
    this.isMaximized = false;
  }
 
  
}
