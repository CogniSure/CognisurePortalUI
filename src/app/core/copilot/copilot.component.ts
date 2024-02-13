import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import {
  ChatModule,
  Message,
  SendMessageEvent,
  User,
} from '@progress/kendo-angular-conversational-ui';
import { LayoutModule } from '@progress/kendo-angular-layout';
import {
  UploadsModule,
  FileSelectModule,
  FileRestrictions,
} from '@progress/kendo-angular-upload';
import { Observable, Subject, from, map, merge, scan } from 'rxjs';
import { UploadFile } from 'src/app/model/common/uploadfile';
import { ChatService } from 'src/app/services/common/chat.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { InboxService } from 'src/app/services/inbox/inbox.service';

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
  showSubmissionId: boolean = true;
  isMaximized: boolean = false;
  // originalWidth: string = '70rem';
  // originalHeight: string = '80%';

  originalWidth: string;
  originalHeight: string;

  private inMemoryFile: string | null = null;
  public uploadedFiles: File[];
  uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
  messageGuid: string = 'guid';

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

  constructor(
    private svc: ChatService,
    private inboxService: InboxService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CopilotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const hello: Message = {
      author: this.bot,
      suggestedActions: [
      ],
      timestamp: new Date(),
      text: 'CogniSure Copilot',
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
    ).pipe(scan((acc: Message[], x: Message) => [...acc, x], []));
  }

  ngOnInit(): void {
    console.log('Copilot Data');
    console.log(this.data);
    if (this.data.SubmissionID != null) {
      this.inboxService
        .getSubmissionFilesFromDB('0', this.data.SubmissionID, '0')
        .subscribe((res) => {
          if (res != null && res.value != null && res.value.length > 0) {
            res.value.forEach((file: any) => {
              this.pdfList.push({
                name: file.fileName,
                base64Data: file.fileData,
              });
            });
          }
        });
    }
  }

  public sendMessage(e: SendMessageEvent): void {
    this.local.next(e.message);

    this.local.next({
      author: this.bot,
      typing: true,
    });

    this.svc.submit(e.message.text!, this.messageGuid);
  }
  public clearModel(): void {
    this.uploadedFiles = [];
  }
  Upload(selectedFile : any) {
    let uplfile: UploadFile;
    if(selectedFile != null){
      uplfile = {
        FileName: selectedFile.name,
        FileGUID: '',
        FileSize: 0,
        FileType: selectedFile.mimeType,
        FileContent: selectedFile.base64Data
      };
      this.svc.uploadCopilotFiles(uplfile).subscribe((res: any) => {
        this.messageGuid = res.value;
      });
    }
  }

  private readFileAsBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      console.log(base64String);
    };

    reader.readAsDataURL(file);
  }

  
  toggleMaximize() {
    if (this.isMaximized) {
      this.minimize();
    } else {
      this.maximize();
    }
  }

  maximize() {
    this.dialogRef.updateSize('90%', '88%');
    this.isMaximized = true;
  }

  minimize() {
    this.dialogRef.updateSize('auto', 'auto');
    this.isMaximized = false;
  }
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.uploadedFiles = [];

      // Iterate through selected files and add them
      for (let i = 0; i < files.length; i++) {
        this.uploadedFiles.push(files[i]);
      }
    }
  }
  pdfList: { name: string; base64Data: string }[] = [];
}
