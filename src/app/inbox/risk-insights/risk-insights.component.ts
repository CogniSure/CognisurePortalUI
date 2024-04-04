import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/model/profile/userprofile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/common/global.service';

@Component({
  selector: 'app-risk-insights',
  templateUrl: './risk-insights.component.html',
  styleUrls: ['./risk-insights.component.scss'],
})
export class RiskInsightsComponent implements OnInit, OnDestroy {
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
  redirectURL = '';
  returnURL = ``;

  params = `?ZOHO_CRITERIA=SUB_SUBMISSIONMETADATA.SUBMISSIONGUID='{GUID}'`;
  constructor(
    private authService: AuthService,
    private globalService: GlobalService
  ) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.userDetail = this.globalService.getUserProfile();
    this.getEmbededURL();
  }

  getRedirectURL() {
    this.authService.getZOHOToken(this.userDetail.Email).subscribe((token) => {
      console.log('token');

      this.globalService.getCurrentSubmissionId().subscribe((subInfo) => {
        let GUID = subInfo.SubmissionGUID;
        this.embedURL = this.returnURL.replace('{GUID}', GUID);
        this.redirectURL = this.redirectURL
          .replace('Zohotoken', token.value)
          .replace('returnURL', this.embedURL);
        console.log(this.redirectURL);
        window.open(this.redirectURL, '_blank');
      });
    });
  }
  getEmbededURL() {
    this.globalService.getCurrentSubmissionId().subscribe((subInfo) => {
      let GUID = subInfo.SubmissionGUID;
      this.authService.getZOHOAPIToken(GUID).subscribe((res) => {
        console.log('Embeded URL');
        console.log(res);
        if (res != null) {
          this.embedURL = res.value;
        }

        // this.params = this.params.replace("{GUID}",GUID);
        // this.embedURL = this.embedURL + this.params
        console.log(this.embedURL);
        //window.open(this.redirectURL, "_blank");
      });
    });
  }
}
