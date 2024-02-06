import { Component, Input, OnInit, SecurityContext } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { FileService } from 'src/app/services/common/filelist.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FileService } from 'src/app/services/common/filelist.service';

@Component({
  selector: 'app-fileviewer',
  templateUrl: './fileviewer.component.html',
  styleUrls: ['./fileviewer.component.scss']
})
export class FileviewerComponent {
  uploadedFiles: File[] = []; 
  previewurl: SafeResourceUrl[] = [];
  // documents: any[];
  // selectedDocumentContent: any;
  pdfList: { name: string, base64Data: string }[] = [
    { name: 'Sample PDF 4', base64Data: 'base64_encoded_data_2' },
    { name: 'Sample PDF 5', base64Data: 'base64_encoded_data_2' },
    { name: 'Sample PDF 6', base64Data: 'base64_encoded_data_2' },
    { name: 'Sample PDF 7', base64Data: 'base64_encoded_data_2' },
    { name: 'Sample PDF 8', base64Data: 'base64_encoded_data_2' },

  ];

  selectedPdf: SafeResourceUrl | undefined;

  constructor(private sanitizer:DomSanitizer, private fileService: FileService) { 
  }

  ngOnInit(): void {
    // Display preview of the first file by default
    this.changePreview(0);
  }

  changePreview(index: number): void {
    const selectedPdfData = this.pdfList[index].base64Data;
    const pdfUrl = this.createPdfUrl(selectedPdfData);
    this.selectedPdf = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }

  private createPdfUrl(base64Data: string): string {
    // Assuming the base64Data is prefixed with 'data:application/pdf;base64,'
    return 'data:application/pdf;base64,' + base64Data;
  }




}