import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  Renderer2,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FileService } from 'src/app/services/common/filelist.service';
import { FileRestrictions } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-fileviewer',
  templateUrl: './fileviewer.component.html',
  styleUrls: ['./fileviewer.component.scss']
})
export class FileviewerComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('fileviewer') fileViewer?: ElementRef<HTMLIFrameElement>;
  @Input() files: any[] = [];
  @Output() selectedFilesEvent = new EventEmitter<any>();
  
  selectedPdf: SafeResourceUrl | null = null;
  invalidPreview = false;
  jsonView = false;
  jsonPreviewData: any;
  preloadFiles: any[] = [];
  uploadFiles: any[] = [];

  public restrictions: FileRestrictions = {
    allowedExtensions: [],
  };

  constructor(
    private sanitizer: DomSanitizer,
    private fileService: FileService,
    private renderer: Renderer2,
    private changeDetactor : ChangeDetectorRef
  
  ) {}
  ngAfterViewInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
   
  }

  ngOnInit(): void {
    this.preloadFiles = this.files;
  }

  PreviewSubmissionFiles(selectedFile:any,index: number): void {
    let isSelected = !selectedFile.isSelected;
    this.uploadFiles.forEach(x=>{
      x.isSelected = false
    })
    this.preloadFiles.forEach((x, i)=>{
      if(i==index){
        x.isSelected = !x.isSelected;
      }
      else {
        x.isSelected = false;
      }
    })
    this.jsonView = false;
    this.invalidPreview = false;

    if(isSelected){
      this.CustomizeSelection(index);

    const fileExt = this.preloadFiles[index].name.split('.').pop();
    const contentType = this.getMimeType(fileExt.toLowerCase());

    if (this.invalidPreview) {
      this.selectedPdf = '';
      const base64UrlData =
        'data:' + contentType + ';base64,' + this.preloadFiles[index].base64Data;
      this.selectedFilesEvent.emit({
        name: this.preloadFiles[index].name,
        uid: this.preloadFiles[index].uid,
        mimeType: contentType,
        base64Data: base64UrlData,
      });
      this.download(this.preloadFiles[index].name, base64UrlData);
    } else if (contentType == 'application/json') {
      this.jsonView = true;
      this.selectedFilesEvent.emit({
        name: this.preloadFiles[index].name,
        uid: this.preloadFiles[index].uid,
        mimeType: contentType,
        base64Data: this.preloadFiles[index].base64Data as string,
      });
      let data = JSON.parse(this.preloadFiles[index].base64Data as string);
      this.jsonPreviewData = data;
    } else {
      const base64UrlData =
        'data:' + contentType + ';base64,' + this.preloadFiles[index].base64Data;
      this.selectedFilesEvent.emit({
        name: this.preloadFiles[index].name,
        uid: this.preloadFiles[index].uid,
        mimeType: contentType,
        base64Data: base64UrlData,
      });
      const blobUrl = this.createBlobUrl(this.preloadFiles[index], contentType);
      const iframe = this.fileViewer?.nativeElement;
      this.selectedPdf = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
      if (iframe) {
        iframe.src = blobUrl;
        iframe.onload = () => {
          const iframeDocument =
            iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDocument) {
            const toolbarElement = iframeDocument.getElementById('toolbar');
            if (toolbarElement) {
              toolbarElement.style.display = 'none';
            }
          }
        };
      }
    }
    }
    else{
      this.selectedPdf = null
    }
    this.changeDetactor.detectChanges() 
  }

  CustomizeSelection(index: any) {
    this.adjustHeightToFitContent();
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

  previewUploadedFile(selectedFile: any, index: number): void {
    
    let isSelected = !selectedFile.isSelected;
    this.preloadFiles.forEach(x=>{
      x.isSelected = false
    })
    this.uploadFiles.forEach((x, i)=>{
      if(i==index){
        x.isSelected = !x.isSelected;
      }
      else {
        x.isSelected = false;
      }
    })

    this.jsonView = false;
    this.invalidPreview = false;

    if(isSelected){
      this.CustomizeSelection(index);

    const fileExt = this.uploadFiles[index].name.split('.').pop();
    const contentType = this.getMimeType(fileExt.toLowerCase());

    if (this.invalidPreview) {
      this.selectedPdf = '';
      const base64UrlData =
        'data:' + contentType + ';base64,' + this.uploadFiles[index].base64Data;
      this.selectedFilesEvent.emit({
        name: this.uploadFiles[index].name,
        uid: this.uploadFiles[index].uid,
        mimeType: contentType,
        base64Data: base64UrlData,
      });
      this.download(this.uploadFiles[index].name, base64UrlData);
    } else if (contentType == 'application/json') {
      this.jsonView = true;
      this.selectedFilesEvent.emit({
        name: this.uploadFiles[index].name,
        uid: this.uploadFiles[index].uid,
        mimeType: contentType,
        base64Data: this.uploadFiles[index].base64Data as string,
      });
      let data = JSON.parse(this.uploadFiles[index].base64Data as string);
      this.jsonPreviewData = data;
    } else {
      const base64UrlData =
        'data:' + contentType + ';base64,' + this.uploadFiles[index].base64Data;
      this.selectedFilesEvent.emit({
        name: this.uploadFiles[index].name,
        uid: this.uploadFiles[index].uid,
        mimeType: contentType,
        base64Data: base64UrlData,
      });
      const blobUrl = this.createBlobUrl(this.uploadFiles[index], contentType);
      const iframe = this.fileViewer?.nativeElement;
      this.selectedPdf = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
      if (iframe) {
        iframe.src = blobUrl;
        iframe.onload = () => {
          const iframeDocument =
            iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDocument) {
            const toolbarElement = iframeDocument.getElementById('toolbar');
            if (toolbarElement) {
              toolbarElement.style.display = 'none';
            }
          }
        };
      }
    }
    }
    else{
      this.selectedPdf = null
    }
    this.changeDetactor.detectChanges() 
  }
  fileSelected(event:any){
    let base64Val = ""
    event.files.forEach((file:any)=>{
      if(file.extension == '.json'){
        const reader = new FileReader();
        reader.readAsText(file.rawFile, 'UTF-8');
        reader.onload = () => {
          const result = reader.result;
          if (result) {
            base64Val = result as string
            let tempFile = {
              name: file.name,
              uid: file.uid,
              base64Data: base64Val, 
              isSelected : false 
            }
            this.uploadFiles.push(tempFile)
          }
        }
      }
      else{
        const reader = new FileReader();
        reader.readAsDataURL(file.rawFile);
        reader.onload = () => {
          const result = reader.result;
          if (result) {
            base64Val = result as string
            let tempFile = {
              name: file.name,
              uid: file.uid,
              base64Data: base64Val.split(',')[1], 
              isSelected : false }
              this.uploadFiles.push(tempFile)
          }
        }
      }
      
    })
    
  }
  private adjustHeightToFitContent(): void {
    setTimeout(() => {
      if (this.fileViewer && this.fileViewer.nativeElement) {
        const iframe = this.fileViewer.nativeElement as HTMLIFrameElement;
        iframe.onload = () => {
          const contentHeight =
            iframe.contentWindow?.document.body.scrollHeight + 'px';
          iframe.style.height = contentHeight;
        };
      }
    });
  }
  private getMimeType(mimeType: string): string {
    if (mimeType == 'pdf') return 'application/pdf';
    else if (mimeType == 'xls') {
      this.invalidPreview = true;
      return 'application/vnd.ms-excel';
    } else if (mimeType == 'xlsx') {
      this.invalidPreview = true;
      return 'vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (mimeType == 'doc') {
      this.invalidPreview = true;
      return 'application/msword';
    } else if (mimeType == 'docx') {
      this.invalidPreview = true;
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (mimeType == 'ppt') {
      this.invalidPreview = true;
      return 'application/vnd.ms-powerpoint';
    } else if (mimeType == 'docx') {
      this.invalidPreview = true;
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    } else if (mimeType == 'svg') return 'image/svg+xml';
    else if (mimeType == 'png') return 'image/png';
    else if (mimeType == 'jpg' || mimeType == 'jpeg') return 'image/jpeg';
    else if (mimeType == 'json') return 'application/json';
    else return '';
  }
  download(fileName: any, fileBase64: any) {
    if (fileBase64 != null) {
      const source = fileBase64; //`data:application/pdf;base64,${fileBase64}`;
      const downloadLink = document.createElement('a');
      downloadLink.href = source;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  }
}
