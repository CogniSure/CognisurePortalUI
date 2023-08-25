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
    this.getCoveragesData();

    this.globalService.getCurrentSubmission().subscribe((sub) => {
      if(sub!=null && sub.value!= null)
      {
      this.summary = sub.value.Account_Level_Info[0]
      console.log('Summary');
      console.log(sub.value);
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
