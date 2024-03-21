import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { SubmissionInfo } from 'src/app/model/inbox/SubmissionInfo';
import { UserProfile } from '../../model/profile/userprofile';
import { Accounts } from 'src/app/model/profile/accounts';
import { ChartData } from 'src/app/model/charts/chartdata';
import { ForgotPassword } from '../../../app/model/common/forgotpassword';
import { LoginData } from 'src/app/model/common/logindata';
// import { WidgetService } from '../widget/widget.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  // password$: any;
  // loginDetails$: any;
  dashboardFilter$ = new BehaviorSubject<any>(null);
  jsonDataSubject: any;
  jsonData$: Observable<any[]>;
  piechartDataSubject: any;
  piechartData$: Observable<any[]>;
  setDashboardReload(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
  animationClass$ = new BehaviorSubject<string>('');


  password$ = new BehaviorSubject<ForgotPassword>({
    Email: '',
    OldPassword: '',
    NewPassword: '',
  });

  loginDetails$ = new BehaviorSubject<LoginData>({
    Email: '',
    Password: '',
  });
  forgotPassword$ = new BehaviorSubject<ForgotPassword>({
    Email: '',
    NewPassword: '',
    OldPassword: ''
  });

  private accounts$ = new BehaviorSubject<Accounts>({
    AccountID: 0,
    AccountName: '',
    BenPortalLinks: [],
  });

  private userProfile$ = new BehaviorSubject<UserProfile>({
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
  });

  constructor() {}
  public CurrentSubmissionId$ = new BehaviorSubject<any>({});
  public CurrentSubmission$ = new BehaviorSubject<any>({});

  setAccounts(account: Accounts[]) {
    localStorage.setItem('Accounts', JSON.stringify(account));
    this.setSelectedAccount(account[0]);
  }

  setSelectedAccount(account: Accounts) {
    localStorage.setItem('SelectedAccounts', JSON.stringify(account));
    this.accounts$.next(account);
    this.dashboardFilter$.next({
      ...this.dashboardFilter$.value,
      Account: account,
    });
  }

  setCurrentSubmission(submission: any) {
    localStorage.setItem('CurrentSubmission', JSON.stringify(submission));
  }
  getCurrentSubmission() {
    var submission =
      localStorage.getItem('CurrentSubmission') == null
        ? ''
        : localStorage.getItem('CurrentSubmission');
    return of(JSON.parse(submission!));
  }

  setCurrentSubmissionId(submission: SubmissionInfo) {
    // let subInfo : SubmissionInfo = {
    //   SubmissionId : "",
    //   SubmissionName : "",
    //   MessageId : "AAMkADU1NjU3NzEyLWMxZTItNDA5Yy04N2E0LTkzYWNjNTc3ZWVlMQBGAAAAAABFiQ8wy3CORZrMw-rLQJlFBwCM8fwoQTOCSY_HjadmsuvGAAAAAAEMAACM8fwoQTOCSY_HjadmsuvGAAKnp6z4AAA=",
    //   Status : submission.Status,
    //   Extraction : "",
    //   Completeness : "",
    //   RiskClearance : "",
    //   LOB:submission.LOB
    // }
    localStorage.setItem('CurrentSubmissionInfo', JSON.stringify(submission));
    //this.CurrentSubmission$.next(submissionId)
  }
  getCurrentSubmissionId() {
    var submissionId: any = '';
    submissionId =
      localStorage.getItem('CurrentSubmissionInfo') == null
        ? ''
        : localStorage.getItem('CurrentSubmissionInfo');

    let submission: SubmissionInfo = JSON.parse(submissionId);
    //this.CurrentSubmission$.next(submissionId)
    return of(submission);
  }

  setUserProfile(profile: UserProfile) {
    localStorage.setItem('UserDetail', JSON.stringify(profile));
  }
  getUserProfile() {
    const profile = JSON.parse(localStorage.getItem('UserDetail')!);
    return profile;
  }

  private topLocationSubject = new BehaviorSubject<any[]>([
    {
      Dimension: '',
      Measure: '',
    },
  ]);
  topLocationData$: Observable<any[]> = this.topLocationSubject.asObservable();
  public setTopLocation(updatedChartData: any[]): void {
    localStorage.setItem(
      'topLocationSubject',
      JSON.stringify(updatedChartData)
    );
    this.topLocationSubject.next(updatedChartData);
  }

  getTopLocation() {
    let toplocation = localStorage.getItem('topLocationSubject');
    return JSON.parse(toplocation!);
  }

  private topBrokerSubject = new BehaviorSubject<any[]>([
    {
      Dimension: '',
      Measure: '',
    },
  ]);
  topBrokerData$: Observable<any[]> = this.topBrokerSubject.asObservable();
  public setTopBroker(updatedChartData: any[]): void {
    localStorage.setItem(
      'topBrokerSubject',
      JSON.stringify(updatedChartData)
    );
    this.topBrokerSubject.next(updatedChartData);
  }

  getTopBroker() {
    let topBroker = localStorage.getItem('topBrokerSubject');
    return JSON.parse(topBroker!);
  }

  private topIndustrySubject = new BehaviorSubject<any[]>([
    {
      Dimension: '',
      Measure: '',
    },
  ]);
  topIndustryData$: Observable<any[]> = this.topIndustrySubject.asObservable();
  public setTopIndustry(updatedChartData: any[]): void {
    localStorage.setItem(
      'topIndustrySubject',
      JSON.stringify(updatedChartData)
    );
    this.topIndustrySubject.next(updatedChartData);
  }

  getTopIndustry() {
    let topIndustry = localStorage.getItem('topIndustrySubject');
    return JSON.parse(topIndustry!);
  }

  private submissionTurnaroundTimeSubject = new BehaviorSubject<any[]>([
    {
      Dimension: '',
      Measure: '',
    },
  ]);
  submissionTurnaroundTimeData$: Observable<any[]> =
    this.submissionTurnaroundTimeSubject.asObservable();
  public setSubmissionTurnaroundTime(updatedChartData: any[]): void {
    localStorage.setItem(
      'submissionTurnaroundTimeSubject',
      JSON.stringify(updatedChartData)
    );
    this.submissionTurnaroundTimeSubject.next(updatedChartData);
  }

  getSubmissionTurnaroundTime() {
    let submissionTurnaroundTime = localStorage.getItem(
      'submissionTurnaroundTimeSubject'
    );
    return JSON.parse(submissionTurnaroundTime!);
  }

  private coverageDistributionsSubject = new BehaviorSubject<any[]>([
    {
      Dimension: '',
      Measure: '',
    },
  ]);
  coverageDistributionsData$: Observable<any[]> =
    this.coverageDistributionsSubject.asObservable();
  public setCoverageDistributions(updatedChartData: any[]): void {
    localStorage.setItem(
      'coverageDistributionsSubject',
      JSON.stringify(updatedChartData)
    );
    this.coverageDistributionsSubject.next(updatedChartData);
  }

  getCoverageDistributions() {
    let coverageDistributions = localStorage.getItem(
      'coverageDistributionsSubject'
    );

    return JSON.parse(coverageDistributions!);
  }

  private submissionConversionsSubject = new BehaviorSubject<any[]>([
    {
      Dimension: '',
      Measure: '',
    },
  ]);
  submissionConversionsData$: Observable<any[]> =
    this.submissionConversionsSubject.asObservable();
  public setSubmissionConversions(updatedChartData: any[]): void {
    localStorage.setItem(
      'submissionConversionsSubject',
      JSON.stringify(updatedChartData)
    );
    this.submissionConversionsSubject.next(updatedChartData);
  }

  getSubmissionConversions() {
    let submissionConversions = localStorage.getItem(
      'submissionConversionsSubject'
    );

    return JSON.parse(submissionConversions!);
  }

  private topLocationbyStateSubject = new BehaviorSubject<any[]>([
    {
      Dimension: '',
      Measure: '',
    },
  ]);
  topLocationbyStateData$: Observable<any[]> =
    this.topLocationbyStateSubject.asObservable();
  public setTopLocationbyState(updatedChartData: any[]): void {
    localStorage.setItem(
      'topLocationbyStateSubject',
      JSON.stringify(updatedChartData)
    );
    this.topLocationbyStateSubject.next(updatedChartData);
  }
  getTopLocationbyState() {
    let topLocationbyState = localStorage.getItem(
      'topLocationbyStateSubject'
    );
    return JSON.parse(topLocationbyState!);
  }
  clearDashboardSession() {
    localStorage.removeItem('topBrokerSubject');
    localStorage.removeItem('topLocationSubject');
    localStorage.removeItem('topIndustrySubject');
    localStorage.removeItem('submissionTurnaroundTimeSubject');
  }
}
