import { Component } from '@angular/core';
import { AccountInformation } from 'src/app/model/inbox/AccountInformation';
import { GlobalService } from 'src/app/services/common/global.service';

@Component({
  selector: 'app-account-information-data',
  templateUrl: './account-information-data.component.html',
  styleUrls: ['./account-information-data.component.scss'],
})
export class AccountInformationDataComponent {
  accountInformation: AccountInformation = {
    NamedinsuredFullname: 'NA',
    FullAddress: 'NA',
    BusinessDescription: 'NA',
    BusinessType: 'NA',
    EffectiveDate: 'NA',
    OrganizationType: 'NA',
    YearStarted: 'NA',
    NumberOfEmployees: 'NA',
    SICCode: 'NA',
    Taxidentifier: 'NA',
    ContactName: 'NA',
    PhoneNumber: 'NA',
    Email: 'NA',
  };
  propertyInformation: any = {};

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.getCurrentSubmission().subscribe((sub) => {
      if (sub != null && sub.value != null) {
        let accInfo = sub.value.account_Level_Info[0];
        let propertyInfo = sub.value.property_Policy_Info_Premises_Information[0];
        this.accountInformation = {
          NamedinsuredFullname: this.getConcatenateString([
            accInfo.namedinsured_Fullname,
          ]),
          FullAddress: this.getConcatenateString([
            accInfo.namedInsured_MailingAddress_LineOne,
            accInfo.namedInsured_MailingAddress_CityName,
            accInfo.namedInsured_MailingAddress_StateOrProvinceCode,
            accInfo.namedInsured_MailingAddress_PostalCode,
          ]),
          BusinessDescription: this.getConcatenateString([
            accInfo.commercialPolicy_OperationsDescription,
          ]),
          BusinessType: this.getConcatenateString([
            accInfo.namedInsured_LegalEntity_CorporationIndicator,
            accInfo.namedInsured_LegalEntity_IndividualIndicator,
            accInfo.namedInsured_LegalEntity_JointVentureIndicator,
            accInfo.namedInsured_LegalEntity_LimitedLiabilityCorporationIndicator,
            accInfo.namedInsured_LegalEntity_MemberManagerCount,
            accInfo.namedInsured_LegalEntity_NotForProfitIndicator,
            accInfo.namedInsured_LegalEntity_PartnershipIndicator,
            accInfo.namedInsured_LegalEntity_SubchapterSCorporationIndicator,
            accInfo.namedInsured_LegalEntity_TrustIndicator,
            accInfo.namedInsured_LegalEntity_OtherIndicator,
            accInfo.namedInsured_LegalEntity_OtherDescription,
          ]),
          EffectiveDate: this.getConcatenateString([propertyInfo.policy_Effectivedate]),
          OrganizationType: 'NA',
          YearStarted: 'NA',
          NumberOfEmployees: 'NA',
          SICCode: this.getConcatenateString([propertyInfo.namedInsured_SICCode]),
          Taxidentifier: this.getConcatenateString([propertyInfo.namedinsured_Taxidentifier]),
          ContactName: 'NA',
          PhoneNumber: this.getConcatenateString([propertyInfo.namedInsured_Primary_PhoneNumber]),
          Email: 'NA',
        };
        //this.accountInformation = sub.value.account_Level_Info[0];
        //this.propertyInformation = sub.value.property_Policy_Info_Premises_Information[0];
      }
    });
  }

  getConcatenateString(elements: string[]) {
    let concatenatedString = '';
    if (elements != null && elements != undefined && elements.length > 0) {
      for (let i = 0; i <= elements.length; i++) {
        let element = elements[i];
        if (element != undefined && element != '') {
          let separator: string = '';
          if (element != '' && i <= elements.length) separator = ',';
          concatenatedString += element + separator;
        }
      }
    }
    if (
      concatenatedString == null ||
      concatenatedString == '' ||
      concatenatedString.trim() === '' ||
      concatenatedString == 'undefined'
    )
      concatenatedString = 'NA';
    else if (concatenatedString.endsWith(','))
      concatenatedString = concatenatedString.slice(0, -1);

    return concatenatedString;
  }
}
