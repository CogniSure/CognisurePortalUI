import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { UploadsModule,FileSelectModule } from '@progress/kendo-angular-upload';
@Component({
  selector: 'app-copilot',
  templateUrl: './copilot.component.html',
  styleUrls: ['./copilot.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, UploadsModule ,
    FileSelectModule,LayoutModule,ButtonModule ],
})
// export class DialogContentExample {
  
// }
export class CopilotComponent {
  public uploadedFiles: Array<File>;
  uploadSaveUrl = "saveUrl"; // should represent an actual API endpoint
  uploadRemoveUrl = "removeUrl"; // should represent an actual API endpoint

  public clearModel(): void {
    this.uploadedFiles = [];
  }
  Upload(){
    
  }
}
