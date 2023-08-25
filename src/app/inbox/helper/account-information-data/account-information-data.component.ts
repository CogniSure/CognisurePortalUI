import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/common/global.service';

@Component({
  selector: 'app-account-information-data',
  templateUrl: './account-information-data.component.html',
  styleUrls: ['./account-information-data.component.scss']
})
export class AccountInformationDataComponent {
  // accountName: string = 'Duke & Duke';

  // businessAddress: string = '885 Street, Illinois 60555';

  // descriptionBusiness: string = 'Description of Business';

  // businessType: string = 'Business Type';

  // proposedEffectiveDate: string = '04/01/2023';

  organizationType: string = 'Organization Type';

  yearStarted: string = 'Year Started';

  numberofEmployees: string = 'Nor. of Employees';

  // sicCode: string = '7011 (Hotels & Motels)';

  // fein: string = 'FEIN';

  contactName: string = 'Name';

  // phone: string = 'Phone';

  email: string = 'Email';


  accountInformation : any={};
  propertyInformation : any={};

  constructor(private globalService : GlobalService) {}

  ngOnInit(): void {
    this.globalService.getCurrentSubmission().subscribe((sub) => {
      if(sub!=null && sub.value!= null)
      {
      this.accountInformation = sub.value.account_Level_Info[0]
      this.accountInformation = sub.value.property_Policy_Info_Blanket_Summary[0]
      this.accountInformation = sub.value.property_Policy_Info_Premises_Information[0]
      
      }
    });

}
}