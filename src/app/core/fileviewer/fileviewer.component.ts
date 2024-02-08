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
    // Display preview of the first file by default
    this.changePreview(0);
  }

  changePreview(index: number): void {
    const selectedPdfData = this.files[index].base64Data;
    const pdfUrl = this.createPdfUrl(selectedPdfData);
    const iframe = this.fileViewer?.nativeElement;
    this.selectedPdf = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
    this.adjustHeightToFitContent();

    if (iframe) {
      // Set the src attribute of the iframe
      iframe.src = pdfUrl;

      // Wait for iframe content to load
      iframe.onload = () => {
        // Inject CSS to hide the toolbar
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

  
  previewSelectedFile(file: File): void {
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
