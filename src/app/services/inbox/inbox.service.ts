import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';
import { Observable, map, of } from 'rxjs';
import { Submission } from 'src/app/model/inbox/Submission';
import { AppConfigService } from 'src/app/app-config-service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  env = this.configService.settings;
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
  notificationIconURL = '../../../assets/images/Notification.svg';
  profileImageURL = '../../../assets/images/profile.png';
  defaultIconURL = '../../../assets/images/dropup_icon.png';
  alternateIconURL = '../../../assets/images/dropdown_icon.png';

  idToDisplay = 1;
  private apiUrl = 'api/AllSubmission';
  constructor(private httpService: HttpService, private configService:AppConfigService, private datePipe: DatePipe, private http: HttpClient) {}
  // constructor(private http: HttpClient, private globalService:GlobalService) {}

  private getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return this.datePipe.transform(date, 'MM/dd/yyyy') || 'NA';
    }
    return 'NA';
  }

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
    var apiUrl = this.configService.settings.baseUrl + 'api/Submission';
    var result;
    let hParams = new HttpParams();
    hParams = hParams.set('submissionid', submissionId);
    return this.httpService.getData(apiUrl, hParams);
  }
  getAllSubmissionData(): Observable<any> {
    var submissions: Submission[] = [];
    var apiUrl = this.configService.settings.baseUrl + 'api/AllSubmission';
    var result;
    let hParams = new HttpParams();
    return this.httpService.postData(apiUrl, '', '').pipe(
      map((result: any) => {
        result.value.forEach((res: any) => {
          var sub = {
            Id: res['submissionId'],
            SubmissionID: res['submissionId'],
            AccountName: res['accountName']!=""?res['accountName']:"NA",
            // EffectiveDate: res['effectiveDate']!=""?res['effectiveDate']:"NA",
            EffectiveDate: this.getFormattedDate(res['effectiveDate']),
            Type: "New Submission",
            AgencyName: (res['agencyName']==null || res['agencyName']=="")?"NA":this.getConcatenateString(res['agencyName'].split(",")),
            LOB: (res['lineOfBusiness']==null || res['lineOfBusiness']=="")?"NA":this.getConcatenateString(res['lineOfBusiness'].split(",")),
            Priority: "High",//res['priority']!=""?res['priority']:"NA",
            QualityScore: res['riskScore']!=""?res['riskScore']:"NA",
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
  getConcatenateString(elements: string[],defaultValue:string="NA") {
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
      concatenatedString = defaultValue;
    else if (concatenatedString.endsWith(','))
      concatenatedString = concatenatedString.slice(0, -1);

    return concatenatedString;
  }
  sendToGuidewire(submissionId : string) : Observable<any>{
    var apiUrl = this.env.baseUrl + 'api/SendtoGuidewire';
    var result;
    let hParams = new HttpParams();
    hParams = hParams.set('submissionid', submissionId);
    return this.httpService.postData(apiUrl,"", hParams);
  }

  saveChanges(data: any[]): Observable<any> {
    // return this.http.post(`${this.apiUrl}/saveChanges`, data);
    // return this.httpService.postData("saveChanges", '', data)
    console.log(data);
    return of('')

  }

}
