import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  getAgencyData() {
    return {
      agencyName: 'ACE Insurance',
      agencyCode: 'A548889',
      producer: 'John Kelly',
      producerEmail: 'jkelly@aceinsurance.com',
      phone: '312-987-3456',
      activityRank: '234 / 4389'
    };
  }
}
