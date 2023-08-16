import { Component } from '@angular/core';
import { CoveragesService } from '../../services/inbox/coverages.service';
import { CoveragesData } from '../../model/summary/coveragesdata';

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

  constructor(private coveragesService: CoveragesService) {}

  ngOnInit(): void {
    this.getCoveragesData();
  }


  getCoveragesData(): void {
    this.coveragesService.getCoveragesData()
      .subscribe(data => {
        this.coveragesdata = data;
      });
  }

}
