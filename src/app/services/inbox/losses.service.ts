import { Injectable } from '@angular/core';
import { LossesData } from '../../model/summary/lossesdata';

@Injectable({
  providedIn: 'root'
})
export class LossesService {
  private lossesData: LossesData[] = [];

  constructor() {
    this.lossesData = [
      { numberofclaims: 27, numberofopenclaims: 4, highestclaim: '$10,000' },
    ];
  }

  getLossesData(): LossesData[] {
    return this.lossesData;
  }
}
