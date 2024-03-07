import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { SubmissionFile } from 'src/app/model/inbox/SubmissionFile';
import { ColumnSample } from 'src/app/model/samples/columnSample';
import { CacheService } from 'src/app/services/common/cache.service';
import { InboxService } from 'src/app/services/inbox/inbox.service';
import { FileComparerComponent } from '../file-comparer/file-comparer.component';

@Component({
  selector: 'app-document-vault',
  templateUrl: './document-vault.component.html',
  styleUrls: ['./document-vault.component.scss']
})
export class DocumentVaultComponent implements OnInit {
  constructor(
    private cacheService: CacheService,
    private inboxService : InboxService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    ) {

    }
    
  submissionFiles: SubmissionFile[] = [];
  public columns: any = ColumnSample.SubmissionFileColumns;
  noDataAvailble = false;
  ngOnInit(): void {
    this.cacheService.getSubmissionFiles().subscribe((docs: any) => {
      console.log("Download Result")
        console.log(docs)
      // if(docs!=null && docs.length>0){
      //   this.submissionFiles = docs;
      //   this.noDataAvailble = false
      // }
      // else 
      //   this.noDataAvailble = true;

      if (docs != null && docs.length > 0) {
        this.submissionFiles = docs.map((doc: SubmissionFile, index: number) => {
          doc.SlNo = index + 1;
          return doc;
        });
        this.noDataAvailble = false;
      } else {
        this.noDataAvailble = true;
      }
        
    })
  }
  DownloadSumissionFile(rowItem:any){
    let submissionId = rowItem.value.FileGUID;
    let format = rowItem.options.Format;
    let downloadCode = rowItem.options.DownloadCode
    let extension = rowItem.options.Extension

    this.inboxService.downloadFiles(submissionId,rowItem.value.FileOriginalName,format,downloadCode,extension).subscribe(res=>{
      
    let contentType = this.getMimeType(extension)
    

    const byteCharacters = atob(res.value.base64Result);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = res.value.fileName;
    link.click();
    window.URL.revokeObjectURL(url);
    })
  }
  private getMimeType(mimeType: string): string {
    if (mimeType == 'pdf') return 'application/pdf';
    else if (mimeType == 'xls') {
      return 'application/vnd.ms-excel';
    } else if (mimeType == 'xlsx') {
      return 'vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (mimeType == 'doc') {
      return 'application/msword';
    } else if (mimeType == 'docx') {
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (mimeType == 'ppt') {
      return 'application/vnd.ms-powerpoint';
    } else if (mimeType == 'docx') {
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    } else if (mimeType == 'svg') return 'image/svg+xml';
    else if (mimeType == 'png') return 'image/png';
    else if (mimeType == 'jpg' || mimeType == 'jpeg') return 'image/jpeg';
    else if (mimeType == 'json') return 'application/json';
    else return '';
  }
  createBlobUrl(file: any, contentType: any) {
    const selectedPdfData = file.base64Data;
    const b64toBlob = (b64Data: any, contentType = '', sliceSize = 512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    };

    if (contentType == 'Invalid') {
      return 'data:application/pdf;base64,' + selectedPdfData;
    }
    const blob = b64toBlob(selectedPdfData, contentType);
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  }
  Icon_Clicked(rowItem : any){
   
    
    if(rowItem.options == "preview"){
      let dataVal:any = null
      

      let submissionId = rowItem.value.FileGUID;
    let format = "json";
    let downloadCode = "carrierjson"
    let extension = "json"

    this.inboxService.downloadFiles(submissionId,rowItem.value.FileOriginalName,format,downloadCode,extension,"json").subscribe(res=>{
      dataVal = {
        LHS : rowItem.value.FileData,
        RHS : res.value.base64Result
      }
      let dialogRef = this.dialog.open(FileComparerComponent,{
        data:dataVal
      });
  
      dialogRef.afterClosed().subscribe((result) => {
       
      });
    })
    }
    
    
  }
 
}
