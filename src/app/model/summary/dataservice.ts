import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataFilter } from '../../model/summary/datafilter';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private totalLosses: string[] = ['$75,000', '$25,000', '$15,000', '$5,000'];

  // constructor() { }

  // getTotalLosses(): string[] {
  //   return this.totalLosses;
  // }

  TotalYearData = new BehaviorSubject<DataFilter>({
    Yeardata: '$75,000',
  });
}
