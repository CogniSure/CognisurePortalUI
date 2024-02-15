import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/model/profile/userprofile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/common/global.service';

@Component({
  selector: 'app-risk-insights',
  templateUrl: './risk-insights.component.html',
  styleUrls: ['./risk-insights.component.scss']
})
export class RiskInsightsComponent implements OnInit, OnDestroy{
  public userDetail: UserProfile = {
    UserID: 0,
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Password: '',
    PhoneNumber: '',
    Email: '',
    ClientID: 0,
    ClientName: '',
    UserTypeName: '',
    UserTypeID: 0,
    ClientCode: '',
    IsAdmin: false,
    UserImage: '',
  };
  embedURL = '';
  redirectURL =
    'https://accounts.zohoportal.com/accounts/p/10065241642/signin/jwt/auth?jwt=Zohotoken&return_to=returnURL';
  returnURL = `https://analytics.cognisure.ai/open-view/2701274000004285753?ZOHO_CRITERIA=SUB_SUBMISSIONMETADATA.SUBMISSIONGUID='{GUID}'`;
  constructor(
    private authService: AuthService,
    private globalService: GlobalService
  ) {
    
  }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.userDetail = this.globalService.getUserProfile();
    this.authService.getZOHOToken(this.userDetail.Email).subscribe((token) => {
      console.log('token');

      this.globalService.getCurrentSubmissionId().subscribe((subInfo) => {
        let GUID = subInfo.SubmissionGUID;
        this.embedURL = this.returnURL.replace("{GUID}",GUID);
        this.redirectURL = this.redirectURL
          .replace('Zohotoken', token.value)
          .replace(
            'returnURL',
            this.embedURL
          );

          window.open(this.redirectURL, "_blank");
      })
    })
  }

}
