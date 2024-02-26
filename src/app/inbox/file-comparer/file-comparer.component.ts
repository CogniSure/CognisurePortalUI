import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-file-comparer',
  templateUrl: './file-comparer.component.html',
  styleUrls: ['./file-comparer.component.scss'],
})
export class FileComparerComponent implements OnInit {
  LHS: SafeResourceUrl | undefined;
  RHS: any;
  jsonPreviewData : any;
  @ViewChild('fileviewer') fileViewer?: ElementRef<HTMLIFrameElement>;
  @ViewChild('jsonviewer') jsonViewer?: ElementRef<HTMLIFrameElement>;

  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<FileComparerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    
    this.PreviewSumissionFile();
    this.PreviewSumissionJSON();
  }
  PreviewSumissionFile() {
    const blobUrl = this.createBlobUrl(this.data.LHS, 'application/pdf');
    this.LHS = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
  }
  PreviewSumissionJSON() {
    // let jsonPreviewStr = this.createBlobData(this.data.RHS,"application/json")
    // let jsonPreviewStr1 = atob(this.data.RHS)
    // let jsonPreviewStr2 = this.b64DecodeUnicode(this.data.RHS);
    // console.log('Item Clicked');
    // console.log(jsonPreviewStr2);
    this.jsonPreviewData = JSON.parse(this.data.RHS)
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
   b64DecodeUnicode(str:any) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}
  createBlobData(selectedPdfData : any,contentType : any) : any{
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

    return blob;
  }
  createBlobUrl(file: any, contentType: any) {
    let blob = this.createBlobData(file,contentType);
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  }
}
