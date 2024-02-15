import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/model/profile/userprofile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/common/global.service';

@Component({
  selector: 'app-risk-clearance',
  templateUrl: './risk-clearance.component.html',
  styleUrls: ['./risk-clearance.component.scss'],
})
export class RiskClearanceComponent implements OnInit, OnDestroy {

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
    localStorage.setItem('zohotoken', '');
  }
  ngOnDestroy(): void {
    //this.http.post("https://analytics.cognisure.ai")
  }
  ngOnInit(): void {
    this.userDetail = this.globalService.getUserProfile();this.userDetail = this.globalService.getUserProfile();
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
            console.log(this.redirectURL)
          window.open(this.redirectURL, "_blank");
      })
    })
  }
  
}
