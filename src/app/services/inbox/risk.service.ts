import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RiskService {
  getRiskData() {
    return {
      ofaccheckvalue: 'No',
      sicvalue: 7234,
      statesvalue: 'NJ',
      statesvalue1: 'PA',
      statesvalue2: 'WA',
      tivvalue: '< $30 M',
      largeloss: ''
    };
  }
}
