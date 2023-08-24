import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../common/http.service';
import { Observable, map, of } from 'rxjs';
import { Submission } from 'src/app/model/inbox/Submission';

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  env = environment;
  // //baseurl = 'https://csbbenqa.cognisure.ai:1089';
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   }),
  // };
  // httpOption1 = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   }),
  // };
  notificationCount = 20;

  headerImageURL = '../../../assets/images/logo.png';
  topbarIconURL = '../../../assets/images/topbar_icon.svg';
  notificationIconURL = '../../../assets/images/notification.png';
  profileImageURL = '../../../assets/images/profile.png';
  defaultIconURL = '../../../assets/images/dropup_icon.png';
  alternateIconURL = '../../../assets/images/dropdown_icon.png';

  idToDisplay = 1;
  constructor(private httpService: HttpService, private http: HttpClient) {}
  // constructor(private http: HttpClient, private globalService:GlobalService) {}

  private dropdownOptions: { label: string; link: string }[] = [
    { label: 'My Profile', link: '/my-profile' },
    { label: 'Change Password', link: '/change-password' },
    { label: 'Notifications Settings', link: '/notifications-settings' },
    { label: 'Sign Out', link: '/sign-out' },
  ];

  getDropdownOptions(): { label: string; link: string }[] {
    return this.dropdownOptions;
  }

  getSubmissionData(submissionId: string): Observable<any> {
    var apiUrl = this.env.baseUrl + 'Submission?';
    var result;
    let hParams = new HttpParams();
    hParams = hParams.set('submissionid', submissionId);
    return this.httpService.getData(apiUrl, hParams);
  }
  getAllSubmissionData(): Observable<any> {
    var submissions: Submission[] = [];
    var apiUrl = this.env.baseUrl + 'api/AllSubmission';
    var result;
    let hParams = new HttpParams();
    return this.httpService.postData(apiUrl, '', '').pipe(
      map((result: any) => {
        result.value.forEach((res: any) => {
          var sub = {
            Id: res['submissionId'],
            SubmissionID: res['submissionId'],
            AccountName: res['accountName']!=""?res['accountName']:"NA",
            EffectiveDate: res['effectiveDate']!=""?res['effectiveDate']:"NA",
            Type: "New Submission",
            AgencyName: res['agencyName']!=""?res['agencyName']:"NA",
            LOB: res['lineOfBusiness']!=""?res['lineOfBusiness']:"NA",
            Priority: res['priority']!=""?res['priority']:"NA",
            Status: res['submissionStatusName']!=""?res['submissionStatusName']:"NA",
            AssignedBy: res['addedByName']!=""?res['addedByName']:"NA",
            NewStatus: true,
            MessageId: res['messageId']!=""?res['messageId']:"NA",
          };
          submissions.push(sub);
        });

        return submissions;
      })
    );
  }
}
