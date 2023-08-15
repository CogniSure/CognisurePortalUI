import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ExposureData } from '../../model/summary/exposuredata';

@Injectable({
  providedIn: 'root'
})
export class ExposureService {
  getExposureData(): Observable<ExposureData[]> {
    return of([
      { numberoflocations: 6, numberofbuildings: 14, states: 3 },
    ]);
  }
}