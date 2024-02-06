import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileService } from 'src/app/services/common/filelist.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.scss']
})
export class FilelistComponent {
  @Input() pdfSrc: string | undefined;
  @Input() pdfName: string | undefined;

  documents: any[];
  selectedDocumentContent: string | null = null;

  constructor(private http: HttpClient, private fileService: FileService, private sanitizer: DomSanitizer) {
    // this.documents = this.fileService.getDocuments();
  }

  // onDocumentClick(content: string): void {
  //   this.selectedDocumentContent = content;
  //   this.fileService.getDocumentContent(content).subscribe(
  //     (content) => (this.selectedDocumentContent = content)
  //   );
  // }

  isImage(src: string): boolean {
    // Implement your logic to determine if it's an image
    return src.startsWith('data:image/');
  }

  isPdf(src: string): boolean {
    // Implement your logic to determine if it's a PDF
    return src.endsWith('.pdf');
  }

}
