import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SecurityContext,
  ViewChild,
  Renderer2,
  Output,
  EventEmitter,
} from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { FileService } from 'src/app/services/common/filelist.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FileService } from 'src/app/services/common/filelist.service';
import { FileRestrictions } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-fileviewer',
  templateUrl: './fileviewer.component.html',
  styleUrls: ['./fileviewer.component.scss'],
})
export class FileviewerComponent {
  selectedFileIndex: number | null = null;
  activePdfIndex: number | null = null;
  selectedpdf: any;
  invalidPreview = false;
  @ViewChild('fileviewer') fileViewer?: ElementRef<HTMLIFrameElement>;
  @Input() showSubmissionId: boolean = true;
  @Input() files: any[] = [];

  @Output() selectedFilesEvent = new EventEmitter<any>();

  showToolbar: boolean = true;
  uploadedFiles: File[] = [];
  previewurl: SafeResourceUrl[] = [];
  jsonView = false;
  jsonPreviewData: any;
  selectedPdf: SafeResourceUrl | undefined;
  public restrictions: FileRestrictions = {
    allowedExtensions: [],
  };

  constructor(
    private sanitizer: DomSanitizer,
    private fileService: FileService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // this.changePreview(0);
  }

  changePreview(index: number): void {
    this.jsonView = false;
    this.invalidPreview = false;
    this.selectedFileIndex = index;
    // this.activePdfIndex = index;
    this.CustomizeSelection(index);

    // if (this.files[index].size === 0) {
    //   console.log("File is empty");
    //   return; 
    // }

    const fileExt = this.files[index].name.split('.').pop();
    const contentType = this.getMimeType(fileExt.toLowerCase());

    if (this.invalidPreview) {
      this.selectedPdf = '';
      const base64UrlData =
        'data:' + contentType + ';base64,' + this.files[index].base64Data;
      this.selectedFilesEvent.emit({
        name: this.files[index].name,
        mimeType: contentType,
        base64Data: base64UrlData,
      });
      this.download(this.files[index].name, base64UrlData);
    }
    else if (contentType == 'application/json') {
      console.log("application/json")
      this.jsonView = true;
        this.selectedFilesEvent.emit({
          name: this.files[index].name,
          mimeType: contentType,
          base64Data: this.files[index].base64Data as string,
        });
        console.log(this.files[index].base64Data)
        let data = JSON.parse(this.files[index].base64Data as string);
        this.jsonPreviewData = data;
    } 
    else {
      const base64UrlData =
        'data:' + contentType + ';base64,' + this.files[index].base64Data;
      this.selectedFilesEvent.emit({
        name: this.files[index].name,
        mimeType: contentType,
        base64Data: base64UrlData,
      });
      const blobUrl = this.createBlobUrl(this.files[index], contentType);
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
  CustomizeSelection(index: any) {
    this.adjustHeightToFitContent();

    const buttons = document.querySelectorAll('.file-button');
    const divs = document.querySelectorAll('.file-div');
    buttons.forEach((button: any) => {
      button.style.backgroundColor = '#fff';
      button.style.color = '#909090';
    });
    divs.forEach((div: any) => {
      div.style.backgroundColor = '#fff';
    });

    const selectedButton = document.getElementById('file-button-' + index);
    const selectedDiv = document.getElementById('file-div-' + index);
    if (selectedButton && selectedDiv) {
      selectedButton.style.backgroundColor = '#009cc1';
      selectedDiv.style.backgroundColor = '#009cc1';
      selectedButton.style.color = '#fff';
    }
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

  previewSelectedFile(file: File, index: number): void {
    this.jsonView = false;
    this.invalidPreview = false;
    this.selectedFileIndex = index;
    const buttons = document.querySelectorAll('.file-button');
    const divs = document.querySelectorAll('.file-div');
    buttons.forEach((button: any) => {
      button.style.backgroundColor = '#fff';
    });
    divs.forEach((div: any) => {
      div.style.backgroundColor = '#fff';
    });
    const fileExt = file.name.split('.').pop();
    const contentType = this.getMimeType(fileExt!.toLowerCase());

    if (this.invalidPreview) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFilesEvent.emit({
          name: file.name,
          mimeType: contentType,
          base64Data: reader.result,
        });
        this.download(file.name, reader.result);
      };
    } else if (contentType == 'application/json') {
      this.jsonView = true;
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = () => {
        this.selectedFilesEvent.emit({
          name: file.name,
          mimeType: contentType,
          base64Data: reader.result,
        });
        let data = JSON.parse(reader.result as string);
        this.jsonPreviewData = data;
      };
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFilesEvent.emit({
          name: file.name,
          mimeType: contentType,
          base64Data: reader.result,
        });
      };
      this.selectedPdf = this.sanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(file)
      );
    }
  }

  resetSelectedFileIndex(): void {
    this.selectedFileIndex = null;
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
