import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../common/http.service';
import { Observable } from 'rxjs';

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
  constructor(private httpService: HttpService,private http: HttpClient) {}
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

  getSubmissionData(submissionId: string):Observable<any> {

    var apiUrl = this.env.baseUrl + "Submission?"
    var apiUrl = this.env.baseUrl + "Submission?"
    //return this.httpService.getData(,submis)
    var result;
    let hParams = new HttpParams();
    hParams = hParams.set('submissionid', submissionId);
    return this.httpService
    .getData(
      //this.env.apiUrl+"login?username="+email+"&password="+JSON.stringify(password),
      apiUrl,
      hParams
    )
  }
}
