import { Component, ElementRef, Input, OnInit, SecurityContext, ViewChild, Renderer2 } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { FileService } from 'src/app/services/common/filelist.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FileService } from 'src/app/services/common/filelist.service';
import { FileRestrictions  } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-fileviewer',
  templateUrl: './fileviewer.component.html',
  styleUrls: ['./fileviewer.component.scss']
})
export class FileviewerComponent {
  selectedFileIndex: number | null = null;
  activePdfIndex: number | null = null;
  selectedpdf: any; 
  @ViewChild('fileviewer') fileViewer?: ElementRef<HTMLIFrameElement>; 
  @Input() showSubmissionId: boolean = true;
  @Input() files: any[] = [];
  showToolbar: boolean = true;
  uploadedFiles: File[] = []; 
  previewurl: SafeResourceUrl[] = [];
  // documents: any[];
  // selectedDocumentContent: any;

  selectedPdf: SafeResourceUrl | undefined;
  public restrictions: FileRestrictions = {
    allowedExtensions: [],
  };

  constructor(private sanitizer:DomSanitizer, private fileService: FileService, private renderer: Renderer2) { 
    
  }

  ngOnInit(): void {
    this.changePreview(0);
  }

  changePreview(index: number): void {
    this.activePdfIndex = index;
    
    //const pdfUrl = this.createPdfUrl(selectedPdfData);
    console.log("Preview FIle")
    console.log(this.files[index])
    const blobUrl = this.createBlobUrl(this.files[index])
    this.selectedPdf = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
    const iframe = this.fileViewer?.nativeElement;
    this.selectedPdf = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
    this.adjustHeightToFitContent();

    const buttons = document.querySelectorAll('.file-button');
    const divs = document.querySelectorAll('.file-div');
    buttons.forEach((button: any) => {
      button.style.backgroundColor = '#00B6AD';
    });
    divs.forEach((div: any) => {
      div.style.backgroundColor = '#00B6AD';
    });
  
    const selectedButton = document.getElementById('file-button-' + index);
    const selectedDiv = document.getElementById('file-div-' + index);
    if (selectedButton && selectedDiv) {
      selectedButton.style.backgroundColor = '#009cc1';
      selectedDiv.style.backgroundColor = '#009cc1';
    }

    if (iframe) {
      iframe.src = blobUrl;
      iframe.onload = () => {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDocument) {
          const toolbarElement = iframeDocument.getElementById('toolbar');
          if (toolbarElement) {
            toolbarElement.style.display = 'none';
          }
        }
      };
    }
  }

  createBlobUrl(file : any){
    const selectedPdfData = file.base64Data;
    const b64toBlob = (b64Data:any, contentType='', sliceSize=512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];
    
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
    
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
    
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
        
      const blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }
    const fileExt = file.name.split('.').pop();
    const contentType = this.getMimeType(fileExt.toLowerCase());
    const blob = b64toBlob(selectedPdfData, contentType);
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  }
  previewSelectedFile(file: File, index: number): void {
    this.selectedFileIndex = index;
    const buttons = document.querySelectorAll('.file-button');
    const divs = document.querySelectorAll('.file-div');
    buttons.forEach((button: any) => {
      button.style.backgroundColor = '#00B6AD';
    });
    divs.forEach((div: any) => {
      div.style.backgroundColor = '#00B6AD';
    });
    console.log("Preview FIle Upload")
    console.log(file)
    this.selectedPdf = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
    // if (file.type === 'application/pdf') {
    //   this.selectedPdf = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
    // } else {
    //   console.log('File preview not supported for this file type.');
    // }
  }


  private createPdfUrl(base64Data: string): string {
    // Assuming the base64Data is prefixed with 'data:application/pdf;base64,'
    return 'data:application/pdf;base64,' + base64Data;
  }

  private adjustHeightToFitContent(): void {
    setTimeout(() => {
      if (this.fileViewer && this.fileViewer.nativeElement) {
        const iframe = this.fileViewer.nativeElement as HTMLIFrameElement;
        iframe.onload = () => {
          const contentHeight = iframe.contentWindow?.document.body.scrollHeight + 'px';
          iframe.style.height = contentHeight;
        };
      }
    });
  }

  private getMimeType(mimeType: string): string {
    if(mimeType == 'pdf')
      return "application/pdf"
    else if(mimeType == "xls")
      return "application/vnd.ms-excel"
    else if(mimeType == 'xlsx')
      return "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    else if(mimeType == "doc")
      return "application/msword"
    else if(mimeType == "docx")
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    else if(mimeType == "ppt")
      return "application/vnd.ms-powerpoint"
    else if(mimeType == "docx")
      return "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    else if(mimeType == "svg")
      return "image/svg+xml"
    else if(mimeType == "png")
      return "image/png"
    else if(mimeType == "jpg" || mimeType == "jpeg")
      return "image/jpeg"
    else if(mimeType == 'json')
      return "application/json"
    else 
      return ""
  }

}
