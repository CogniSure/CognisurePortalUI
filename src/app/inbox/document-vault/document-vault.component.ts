import { Component, OnInit } from '@angular/core';
import { SubmissionFile } from 'src/app/model/inbox/SubmissionFile';
import { ColumnSample } from 'src/app/model/samples/columnSample';
import { CacheService } from 'src/app/services/common/cache.service';

@Component({
  selector: 'app-document-vault',
  templateUrl: './document-vault.component.html',
  styleUrls: ['./document-vault.component.scss']
})
export class DocumentVaultComponent implements OnInit {
  constructor(
    private cacheService: CacheService) {}
  submissionFiles: SubmissionFile[] = [];
  public columns: any = ColumnSample.SubmissionFileColumns;
  noDataAvailble = false;
  ngOnInit(): void {
    this.cacheService.getSubmissionFiles().subscribe((docs: any) => {
      
      if(docs!=null && docs.length>0){
        this.submissionFiles = docs;
        this.noDataAvailble = false
      }
      else 
        this.noDataAvailble = true;
        
    })
  }
  DownloadSumissionFile(rowItem:any){
    console.log("Files for download")
    console.log(rowItem)

    const source = `data:application/pdf;base64,${rowItem.FileData}`;
    const downloadLink = document.createElement('a');
    const fileName = rowItem.FileName;

    downloadLink.href = source;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}
