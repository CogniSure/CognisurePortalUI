import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/common/global.service';

@Component({
  selector: 'app-risk-clearance',
  templateUrl: './risk-clearance.component.html',
  styleUrls: ['./risk-clearance.component.scss'],
})
export class RiskClearanceComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private globalService: GlobalService
  ) {
    localStorage.setItem('zohotoken', '');
  }
  ngOnDestroy(): void {
    //this.http.post("https://analytics.cognisure.ai")
  }
  ngOnInit(): void {
    this.authService.getZOHOToken().subscribe((token) => {
      console.log('token');
      this.authService.zohotoken = token.value;

      this.globalService.getCurrentSubmissionId().subscribe((subInfo) => {
        let GUID = subInfo.SubmissionGUID;
        let tempReturnURL = this.returnURL.replace("{GUID}","'"+GUID+"'");
        console.log(GUID);
        
        console.log(tempReturnURL);
        console.log(tempReturnURL)
        this.embedURL = this.redirectURL
          .replace('Zohotoken', token.value)
          .replace(
            'returnURL',
            tempReturnURL
          );
        console.log(this.embedURL);
      });
    });
  }
  returnURL = "https://analytics.cognisure.ai/open-view/2701274000004004374?ZOHO_CRITERIA=(SUBMISSIONGUID={GUID})";
  embedURL = '';
  redirectURL =
    'https://accounts.zohoportal.com/accounts/p/10065241642/signin/jwt/auth?jwt=Zohotoken&return_to=returnURL';
}
