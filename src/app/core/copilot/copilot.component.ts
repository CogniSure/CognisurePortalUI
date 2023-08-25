import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { ChatModule, Message, SendMessageEvent, User } from '@progress/kendo-angular-conversational-ui';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { UploadsModule,FileSelectModule } from '@progress/kendo-angular-upload';
import { Observable, Subject, from, map, merge, scan } from 'rxjs';
import { ChatService } from 'src/app/services/common/chat.service';
@Component({
  selector: 'app-copilot',
  templateUrl: './copilot.component.html',
  styleUrls: ['./copilot.component.scss'],
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatDialogModule, UploadsModule ,
    FileSelectModule,LayoutModule,ButtonModule,ChatModule  ],
})
// export class DialogContentExample {
  
// }
export class CopilotComponent {
  public uploadedFiles: Array<File>;
  uploadSaveUrl = "saveUrl"; // should represent an actual API endpoint
  uploadRemoveUrl = "removeUrl"; // should represent an actual API endpoint

  ;

  public readonly user: User = {
    id: 1,
  };

  public readonly bot: User = {
    id: 0,
  };
  public feed: Observable<Message[]>;
  private local: Subject<Message> = new Subject<Message>();


  constructor(private svc: ChatService) {
    const hello: Message = {
      author: this.bot,
      suggestedActions: [
        {
          type: "reply",
          value: "Neat!",
        },
        {
          type: "reply",
          value: "Thanks, but this is boring.",
        },
      ],
      timestamp: new Date(),
      text: "Hello, this is a demo bot. I don`t do much, but I can count symbols!",
    };

    // Merge local and remote messages into a single stream
    this.feed = merge(
      from([hello]),
      this.local,
      this.svc.responses.pipe(
        map(
          (response): Message => ({
            author: this.bot,
            text: response,
          })
        )
      )
    ).pipe(
      // ... and emit an array of all messages
      scan((acc: Message[], x: Message) => [...acc, x], [])
    );
  }

  public sendMessage(e: SendMessageEvent): void {
    this.local.next(e.message);

    this.local.next({
      author: this.bot,
      typing: true,
    });

    this.svc.submit(e.message.text!);
  }
  public clearModel(): void {
    this.uploadedFiles = [];
  }
  Upload(){

  }
}
