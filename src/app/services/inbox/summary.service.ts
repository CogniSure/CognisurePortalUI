import { Injectable } from '@angular/core';
import { TotalLossesData } from '../../model/summary/totallossesdata';

@Injectable({
  providedIn: 'root'
})
export class TotalLossesService {
  private totalLossesData: TotalLossesData[] = [];

  constructor() {
    this.totalLossesData = [
      { numberofclaims: 27, numberofopenclaims: 4, highestclaim: '$10,000' },
    ];
  }

  getTotalLossesData(): TotalLossesData[] {
    return this.totalLossesData;
  }
}
