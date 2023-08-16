import { Component } from '@angular/core';
import {ExposureData} from '../../model/summary/exposuredata';
import { ExposureService } from '../../services/inbox/exposure.service';

@Component({
  selector: 'app-exposure',
  templateUrl: './exposure.component.html',
  styleUrls: ['./exposure.component.scss']
})
export class ExposureComponent {
  totalinsuredvalue: string = 'Total Insured Value';
  totalincurredvalue: string = ''
  exposurelosses: any = '$27,654,321';
  exposuredata: ExposureData[] = [];
     constructor(private exposureService: ExposureService) {}

  ngOnInit(): void {

    this.getExposureData();

  }

  getExposureData(): void {
    this.exposureService.getExposureData()
      .subscribe(data => {
        this.exposuredata = data;
      });
  }
  
  
    
}
