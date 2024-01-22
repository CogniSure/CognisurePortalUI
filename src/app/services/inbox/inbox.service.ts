import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';
import { Observable, map, of } from 'rxjs';
import { Submission } from 'src/app/model/inbox/Submission';
import { AppConfigService } from 'src/app/app-config-service';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AccountInformation } from 'src/app/model/inbox/AccountInformation';
import { CacheService } from 'src/app/services/common/cache.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  env = this.configService.settings;
  private accountInformationSubject = new BehaviorSubject<AccountInformation| null>(null);
  accountInformation$ = this.accountInformationSubject.asObservable();
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
  constructor(private httpService: HttpService, private configService:AppConfigService, private datePipe: DatePipe, private http: HttpClient, private cacheService: CacheService) {}
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
    console.log("Inbox Http Call");
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
            MessageId: res['messageId']!=""?res['messageId']:"NA"
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
  getExposureSummary(type:string,clientId:string,submissionId: string,email:string): Observable<any> {
    var apiUrl = this.configService.settings.baseUrl + 'api/submissionbyid';
    let hParams = new HttpParams();
    hParams = hParams.set('type', type);
    hParams = hParams.set('clientid', clientId);
    hParams = hParams.set('submissionid', submissionId);
    hParams = hParams.set('email', email);
    return this.httpService.getData(apiUrl, hParams);
  }

  getLossSummary(type:string,clientId:string,submissionId: string,email:string): Observable<any> {
    var apiUrl = this.configService.settings.baseUrl + 'api/losssummarybyid';
    let hParams = new HttpParams();
    hParams = hParams.set('type', type);
    hParams = hParams.set('clientid', clientId);
    hParams = hParams.set('submissionid', submissionId);
    hParams = hParams.set('email', email);
    return this.httpService.getData(apiUrl, hParams);
    let sampleData = {
      value:[
        {
          category : "WC",
          dimension:"2018",
          measure:"100"
       },
       {
         category : "WC",
         dimension:"2019",
         measure:"200"
      },
      {
       category : "WC",
       dimension:"2020",
       measure:"300"
       }
      ]
    }
    return of(sampleData);
  }
  getSummaryByLOB(type:string,clientId:string,submissionId: string,email:string): Observable<any> {
    var apiUrl = this.configService.settings.baseUrl + 'api/submissionsummarybylobbyid';
    let hParams = new HttpParams();
    hParams = hParams.set('type', type);
    hParams = hParams.set('clientid', clientId);
    hParams = hParams.set('submissionid', submissionId);
    hParams = hParams.set('email', email);
    return this.httpService.getData(apiUrl, hParams);
  }


  // setAccountInformation(accountInformation: AccountInformation | null): void {
  //   this.accountInformationSubject.next(accountInformation);
  // }

  // getAccountInformation(): AccountInformation | null {
  //   return this.accountInformationSubject.value;
  // }


  getAccountInformationfromDB(type: string, clientId: string, submissionId: string, email: string): Observable<any> {
    var apiUrl = this.configService.settings.baseUrl + 'api/submissionheadersbyid';
    let hParams = new HttpParams();
    hParams = hParams.set('type', type);
    hParams = hParams.set('clientid', clientId);
    hParams = hParams.set('submissionid', submissionId);
    hParams = hParams.set('email', email);
    return this.httpService.getData(apiUrl, hParams);
    // const accountInformation: AccountInformation = {
    //   NamedinsuredFullname: 'Dante Mason',
    //   FullAddress: '885 Street, Warrnville, Illinois 60555',
    //   BusinessDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //   BusinessType: 'Property',
    //   EffectiveDate: '03/01/2023',
    //   OrganizationType: '',
    //   YearStarted: '',
    //   NumberOfEmployees: '',
    //   ProducerFullname: '',
    //   SICCode: '',
    //   Taxidentifier: '',
    //   ContactName: '',
    //   PhoneNumber: '8143-03312302301',
    //   Email: '',
    // };

    
    // return of(accountInformation);
  }
  
}
