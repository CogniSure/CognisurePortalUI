import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CoveragesData } from '../../model/summary/coveragesdata';

@Injectable({
  providedIn: 'root'
})
export class CoveragesService {
  getCoveragesData(): Observable<CoveragesData[]> {
    return of([
      { coveragename: 'Building', coveragevalue: '$2,000,000', businessincome: 'Blanket' },
      { coveragename: 'Contents', coveragevalue: '$2,000,000', businessincome: 'Blanket' },
      { coveragename: 'Business Incomes', coveragevalue: '$2,000,000', businessincome: 'Blanket' },
      // Add more coverages data as needed
    ]);
  }
}
