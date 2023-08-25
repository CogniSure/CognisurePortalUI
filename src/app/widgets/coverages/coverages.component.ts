import { Component } from '@angular/core';
import { CoveragesService } from '../../services/inbox/coverages.service';
import { CoveragesData } from '../../model/summary/coveragesdata';
import { GlobalService } from 'src/app/services/common/global.service';

@Component({
  selector: 'app-coverages',
  templateUrl: './coverages.component.html',
  styleUrls: ['./coverages.component.scss']
})
export class CoveragesComponent {
  totalincurred: string = 'Total Losses';
  totalincurredvalue: string = '';
  totallosses: any = '$75,000';
  coveragesdata: CoveragesData[] = [];
  summary : any={};


  constructor(private coveragesService: CoveragesService, private globalService : GlobalService) {}

  ngOnInit(): void {
    //this.getCoveragesData();

    this.globalService.getCurrentSubmission().subscribe((sub) => {
      if(sub!=null && sub!= null)
      {
      // this.summary = sub.Account_Level_Info[0]
    
      }
    });

  }


  getCoveragesData(): void {
    this.coveragesService.getCoveragesData()
      .subscribe(data => {
        this.coveragesdata = data;
      });
  }

}
