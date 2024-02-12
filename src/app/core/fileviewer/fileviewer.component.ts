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
    const selectedPdfData = this.files[index].base64Data;
    const pdfUrl = this.createPdfUrl(selectedPdfData);
    const iframe = this.fileViewer?.nativeElement;
    this.selectedPdf = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
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
      iframe.src = pdfUrl;
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
    

    if (file.type === 'application/pdf') {
      this.selectedPdf = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
    } else {
      console.log('File preview not supported for this file type.');
    }
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



}
