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
      console.log('Account Information');
      console.log(sub.value);
      }
    });


  //   this.globalService.getCurrentSubmission().subscribe((sub) => {
  //     if(sub!=null && sub.value!= null)
  //     {
  //     this.accountInformation = sub.value.NamedInsured_MailingAddress_LineOne[0]
  //     this.accountInformation = sub.value.NamedInsured_MailingAddress_CityName[0]
  //     this.accountInformation = sub.value.NamedInsured_MailingAddress_StateOrProvinceCode[0]
  //     this.accountInformation = sub.value.NamedInsured_MailingAddress_PostalCode[0]
  //     console.log('Account Information');
  //     console.log(sub.value);
  //     }
  //   });


  //   this.globalService.getCurrentSubmission().subscribe((sub) => {
  //     if(sub!=null && sub.value!= null)
  //     {
  //     this.accountInformation = sub.value.CommercialPolicy_OperationsDescription[0]
  //     console.log('Account Information');
  //     console.log(sub.value);
  //     }
  //   });
  


  // this.globalService.getCurrentSubmission().subscribe((sub) => {
  //   if(sub!=null && sub.value!= null)
  //   {
  //   this.accountInformation = sub.value.account_Level_Info[0]
  //   console.log('Account Information');
  //   console.log(sub.value);
  //   }
  // });

  // this.globalService.getCurrentSubmission().subscribe((sub) => {
  //   if(sub!=null && sub.value!= null)
  //   {
  //   this.accountInformation = sub.value.NamedInsured_LegalEntity_CorporationIndicator[0]
  //   this.accountInformation = sub.value.NamedInsured_LegalEntity_IndividualIndicator[0]
  //   this.accountInformation = sub.value.NamedInsured_LegalEntity_JointVentureIndicator[0]
  //   this.accountInformation = sub.value.NamedInsured_LegalEntity_LimitedLiabilityCorporationIndicator[0]
  //   this.accountInformation = sub.value.NamedInsured_LegalEntity_MemberManagerCount[0]
  //   this.accountInformation = sub.value.NamedInsured_LegalEntity_NotForProfitIndicator[0]
  //   this.accountInformation = sub.value.NamedInsured_LegalEntity_PartnershipIndicator[0]
  //   this.accountInformation = sub.value.NamedInsured_LegalEntity_SubchapterSCorporationIndicator[0]
  //   this.accountInformation = sub.value.NamedInsured_LegalEntity_TrustIndicator[0]
  //   this.accountInformation = sub.value.NamedInsured_LegalEntity_OtherIndicator[0]
  //   this.accountInformation = sub.value.NamedInsured_LegalEntity_OtherDescription[0]
  //   console.log('Account Information');
  //   console.log(sub.value);
  //   }
  // });


  // this.globalService.getCurrentSubmission().subscribe((sub) => {
  //   if(sub!=null && sub.value!= null)
  //   {
  //   this.accountInformation = sub.value.Property_Policy_Info[0]
  //   console.log('Account Information');
  //   console.log(sub.value);
  //   }
  // });


  // this.globalService.getCurrentSubmission().subscribe((sub) => {
  //   if(sub!=null && sub.value!= null)
  //   {
  //   this.accountInformation = sub.value.NamedInsured_SICCode[0]
  //   console.log('Account Information');
  //   console.log(sub.value);
  //   }
  // });

  // this.globalService.getCurrentSubmission().subscribe((sub) => {
  //   if(sub!=null && sub.value!= null)
  //   {
  //   this.accountInformation = sub.value.NamedInsured_TaxIdentifier[0]
  //   console.log('Account Information');
  //   console.log(sub.value);
  //   }
  // });


  // this.globalService.getCurrentSubmission().subscribe((sub) => {
  //   if(sub!=null && sub.value!= null)
  //   {
  //   this.accountInformation = sub.value.NamedInsured_Primary_PhoneNumber[0]
  //   console.log('Account Information');
  //   console.log(sub.value);
  //   }
  // });
  

}
}