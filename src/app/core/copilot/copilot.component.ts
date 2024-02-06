import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { ChatModule, Message, SendMessageEvent, User } from '@progress/kendo-angular-conversational-ui';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { UploadsModule,FileSelectModule,FileRestrictions  } from '@progress/kendo-angular-upload';
import { Observable, Subject, from, map, merge, scan } from 'rxjs';
import { UploadFile } from 'src/app/model/common/uploadfile';
import { ChatService } from 'src/app/services/common/chat.service';
@Component({
  selector: 'app-copilot',
  templateUrl: './copilot.component.html',
  styleUrls: ['./copilot.component.scss'],
  // standalone: true,
  // imports: [CommonModule,FormsModule,MatButtonModule, MatDialogModule, UploadsModule ,
  //   FileSelectModule,LayoutModule,ButtonModule,ChatModule  ],
})
// export class DialogContentExample {
  
// }
export class CopilotComponent {
  isMaximized: boolean = false;
  // originalWidth: string = '70rem';
  // originalHeight: string = '80%';

  originalWidth: string; 
originalHeight: string; 

  private inMemoryFile: string | null = null;
  public uploadedFiles: File[];
  uploadSaveUrl = "saveUrl"; // should represent an actual API endpoint
  uploadRemoveUrl = "removeUrl"; // should represent an actual API endpoint
  messageGuid : string = "guid";

  public readonly user: User = {
    id: 1,
  };

  public readonly bot: User = {
    id: 0,
  };
  public feed: Observable<Message[]>;
  private local: Subject<Message> = new Subject<Message>();
  public restrictions: FileRestrictions = {
    allowedExtensions: [],
  };

  constructor(private svc: ChatService, private dialog: MatDialog) {
    const hello: Message = {
      author: this.bot,
      suggestedActions: [
        // {
        //   type: "reply",
        //   value: "Neat!",
        // },
        // {
        //   type: "reply",
        //   value: "Thanks, but this is boring.",
        // },
      ],
      timestamp: new Date(),
      text: "CogniSure Copilot",
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

  ngOnInit(): void {
    // Store the original dimensions when the component is initialized
    this.originalWidth = '400px'; // Set the initial width as per your requirement
    this.originalHeight = '300px'; // Set the initial height as per your requirement
  }

  public sendMessage(e: SendMessageEvent): void {
    this.local.next(e.message);

    this.local.next({
      author: this.bot,
      typing: true,
    });

    this.svc.submit(e.message.text!,this.messageGuid);
  }
  public clearModel(): void {
    this.uploadedFiles = [];
  }
  Upload(){
    let uplfile : UploadFile;
    let reader = new FileReader();
    if(this.uploadedFiles && this.uploadedFiles.length > 0) {
      let file = this.uploadedFiles[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        uplfile = {
          FileName : file.name,
          FileGUID : "",
          FileSize : file.size,
          FileType: file.type,
          FileContent: reader.result as string
        }
        this.svc.uploadCopilotFiles(uplfile).subscribe((res:any)=>{
          this.messageGuid = res.value;
        })
      };
     
    }

    
  }


  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];

  //   if (file) {
  //     this.readFileAsBase64(file);
  //   }
  // }

  private readFileAsBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      // Now you can use the base64String as needed (e.g., send it to the server)
      console.log(base64String);
    };

    reader.readAsDataURL(file);
  }
  

  toggleMaximize(): void {
    if (this.isMaximized) {
      this.dialog.open(CopilotComponent, {
        width: this.originalWidth,
        maxHeight: this.originalHeight,
      });
    } else {
      this.dialog.open(CopilotComponent, {
        width: '100vw', 
        height: '100vh', 
      });
    }
    this.isMaximized = !this.isMaximized; 
  }


  
//   // Save to local storage
// localStorage.setItem('fileData', base64String);

// // Retrieve from local storage
// const storedData = localStorage.getItem('fileData');

onFileSelected(event: any): void {
  const files: FileList = event.target.files;
  if (files && files.length > 0) {
    // Clear previous files
    this.uploadedFiles = [];

    // Iterate through selected files and add them
    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push(files[i]);
    }
  }
}

}
