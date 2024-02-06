
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
    // private documents: any[] = [
    //     { name: 'Document 1', content: 'assets/documents/document1.txt.assets /documents' },
    //     { name: 'Document 2', content: 'assets/documents/document2.txt' },
    //     { name: 'Document 3', content: 'assets/documents/document3.txt' },
    //     { name: 'Document 4', content: 'assets/documents/document4.txt' },
    //     { name: 'Document 5', content: 'assets/documents/document5.txt' },
    //     { name: 'Document 6', content: 'assets/documents/document6.txt' },
    //     { name: 'Document 7', content: 'assets/documents/document7.txt' },
    //     { name: 'Document 8', content: 'assets/documents/document8.txt' },
    //     { name: 'Document 9', content: 'assets/documents/document9.txt' },
    //     { name: 'Document 10', content: 'assets/documents/document10.txt' },
    //     { name: 'Document 11', content: 'assets/documents/document11.txt.assets /documents' },
    //     { name: 'Document 12', content: 'assets/documents/document12.txt' },
    //     { name: 'Document 13', content: 'assets/documents/document13.txt' },
    //     { name: 'Document 14', content: 'assets/documents/document14.txt' },
    //     { name: 'Document 15', content: 'assets/documents/document15.txt' },
    //   ];
    
    // private documents: any[] = []; 
    
    constructor(private http: HttpClient) {}
    
    //   getDocuments(): any[] {
    //     return this.documents;
    //   }
    
    //   getDocumentContent(content: string): Observable<string> {
    //     return this.http.get(content, { responseType: 'text' });
    //   }

    // getDocuments(): any[] {
    //     return this.documents;
    //   }


    // getDocumentContent(content: string): Observable<any> {
    //     const fileType = this.getFileType(content);
    
    //     if (fileType === 'pdf') {
    //       return this.http.get(content, { responseType: 'arraybuffer' });
    //     } else if (fileType === 'excel') {
    //       return this.http.get(content, { responseType: 'blob' });
    //     } else {
    //       return this.http.get(content, { responseType: 'text' });
    //     }
    //   }

    //   getFileType(content: string): string {
    //     if (content.endsWith('.pdf')) {
    //       return 'pdf';
    //     } else if (content.endsWith('.xlsx') || content.endsWith('.xls')) {
    //       return 'excel';
    //     } else {
    //       return 'text';
    //     }
    //   }
    
    //   private getFileType(content: string): string {
    //     if (content.endsWith('.pdf')) {
    //       return 'pdf';
    //     } else if (content.endsWith('.xlsx') || content.endsWith('.xls')) {
    //       return 'excel';
    //     } else {
    //       return 'text';
    //     }
    //   }

    //   async convertToBase64(pdfFile: File): Promise<string> {
    //     return new Promise((resolve, reject) => {
    //       const reader = new FileReader();
    //       reader.onloadend = () => resolve(reader.result as string);
    //       reader.onerror = (error) => reject(error);
    //       reader.readAsDataURL(pdfFile);
    //     });
    //   }
     
}
