import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { SubmissionInfo } from 'src/app/model/inbox/SubmissionInfo';
import { UserProfile } from '../../model/profile/userprofile';
import { Accounts } from 'src/app/model/profile/accounts';
import { ChartData } from 'src/app/model/charts/chartdata';
// import { WidgetService } from '../widget/widget.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  password$: any;
  loginDetails$: any;
  dashboardFilter$ = new BehaviorSubject<any>(null);
  jsonDataSubject: any;
  jsonData$: Observable<any[]>;
  piechartDataSubject: any;
  piechartData$: Observable<any[]>;
  setDashboardReload(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
  animationClass$ = new BehaviorSubject<string>('');

  private accounts$ = new BehaviorSubject<Accounts>({
    AccountID: 0,
    AccountName: '',
    BenPortalLinks : []
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
    UserImage : ""
  }) 


  constructor() {}
  public CurrentSubmissionId$ = new BehaviorSubject<any>({});
  public CurrentSubmission$ = new BehaviorSubject<any>({});


  setAccounts(account: Accounts[]) {
    sessionStorage.setItem('Accounts', JSON.stringify(account));
    this.setSelectedAccount(account[0])
  }

  setSelectedAccount(account: Accounts) {
    sessionStorage.setItem('SelectedAccounts', JSON.stringify(account));
    this.accounts$.next(account);
    this.dashboardFilter$.next({...this.dashboardFilter$.value,Account : account})
  }

  setCurrentSubmission(submission: any) {
    sessionStorage.setItem('CurrentSubmission', JSON.stringify(submission));
   // this.CurrentSubmission$.next(submission);
  }
  getCurrentSubmission() {
   // return this.CurrentSubmission$;
   var submission = sessionStorage.getItem('CurrentSubmission')==null?"":sessionStorage.getItem('CurrentSubmission');

    //this.CurrentSubmission$.next(submissionId)
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
    sessionStorage.setItem('CurrentSubmissionInfo', JSON.stringify(submission));
    //this.CurrentSubmission$.next(submissionId)
  }
  getCurrentSubmissionId() {
    var submissionId: any = '';
    submissionId = sessionStorage.getItem('CurrentSubmissionInfo')==null?"":sessionStorage.getItem('CurrentSubmissionInfo');

    let submission:SubmissionInfo = JSON.parse(submissionId)
    //this.CurrentSubmission$.next(submissionId)
    return of(submission);
  }


  setUserProfile(profile: UserProfile) {
    sessionStorage.setItem('UserDetail', JSON.stringify(profile));
    this.userProfile$.next(profile);
  }
  getUserProfile() {
    const profile = sessionStorage.getItem("UserDetail")
    this.userProfile$.next(JSON.parse(profile!));
    return this.userProfile$
  }


  private topLocationSubject = new BehaviorSubject<any[]>(
    [
    {
    Dimension: "",
    Measure: "" 
  }]);
  topLocationData$: Observable<any[]> = this.topLocationSubject.asObservable();
  public setTopLocation(updatedChartData: any[]): void {
    sessionStorage.setItem('topLocationSubject', JSON.stringify(updatedChartData));
    this.topLocationSubject.next(updatedChartData);
   
  }

  // topLocationData$: Observable<any> = this.widgetService.getTopLocationsFromDB();
  // public setTopLocation(updatedChartData: any): void {
  //   this.topLocationSubject.next(updatedChartData);
  // }
  
  getTopLocation() {
    // this.topLocationData$.subscribe(data=>{
    //   console.log("TopLocation-1");
    //   console.log(data);
    // })
    let toplocation = sessionStorage.getItem('topLocationSubject')
   
    return JSON.parse(toplocation!)
    // return this.topLocationData$;
  }

    // setTopLocation(updatedChartData: any) {
  //   sessionStorage.setItem('topLocationSubject', JSON.stringify(updatedChartData));
  //   this.topLocationSubject.next(updatedChartData);
  // }




  private topBrokerSubject = new BehaviorSubject<any[]>(
    [
    {
    Dimension: "",
    Measure: "" 
  }]);
  topBrokerData$: Observable<any[]> = this.topBrokerSubject.asObservable();
  public setTopBroker(updatedChartData: any[]): void {
    sessionStorage.setItem('topBrokerSubject', JSON.stringify(updatedChartData));
    this.topBrokerSubject.next(updatedChartData);
  }

  getTopBroker() {
    let topBroker = sessionStorage.getItem('topBrokerSubject')
    return JSON.parse(topBroker!)
  }


  private topIndustrySubject = new BehaviorSubject<any[]>(
    [
    {
    Dimension: "",
    Measure: "" 
  }]);
  topIndustryData$: Observable<any[]> = this.topIndustrySubject.asObservable();
  public setTopIndustry(updatedChartData: any[]): void {
    sessionStorage.setItem('topIndustrySubject', JSON.stringify(updatedChartData));
    this.topIndustrySubject.next(updatedChartData);
   
  }
  
  getTopIndustry() {
    let topIndustry = sessionStorage.getItem('topIndustrySubject') 
    return JSON.parse(topIndustry!)
  }

  private submissionTurnaroundTimeSubject = new BehaviorSubject<any[]>(
    [
    {
    Dimension: "",
    Measure: "" 
  }]);
  submissionTurnaroundTimeData$: Observable<any[]> = this.submissionTurnaroundTimeSubject.asObservable();
  public setSubmissionTurnaroundTime(updatedChartData: any[]): void {
    sessionStorage.setItem('submissionTurnaroundTimeSubject', JSON.stringify(updatedChartData));
    this.submissionTurnaroundTimeSubject.next(updatedChartData);
   
  }
  
  getSubmissionTurnaroundTime() {
    let submissionTurnaroundTime = sessionStorage.getItem('submissionTurnaroundTimeSubject') 
    return JSON.parse(submissionTurnaroundTime!)
  }

  private coverageDistributionsSubject = new BehaviorSubject<any[]>(
    [
    {
    Dimension: "",
    Measure: "" 
  }]);
  coverageDistributionsData$: Observable<any[]> = this.coverageDistributionsSubject.asObservable();
  public setCoverageDistributions(updatedChartData: any[]): void {
    sessionStorage.setItem('coverageDistributionsSubject', JSON.stringify(updatedChartData));
    this.coverageDistributionsSubject.next(updatedChartData);
   
  }
  
  getCoverageDistributions() {
    let coverageDistributions = sessionStorage.getItem('coverageDistributionsSubject')
   
    return JSON.parse(coverageDistributions!)
  }


  private submissionConversionsSubject = new BehaviorSubject<any[]>(
    [
    {
    Dimension: "",
    Measure: "" 
  }]);
  submissionConversionsData$: Observable<any[]> = this.submissionConversionsSubject.asObservable();
  public setSubmissionConversions(updatedChartData: any[]): void {
    sessionStorage.setItem('submissionConversionsSubject', JSON.stringify(updatedChartData));
    this.submissionConversionsSubject.next(updatedChartData);
   
  }
  
  getSubmissionConversions() {
    let submissionConversions = sessionStorage.getItem('submissionConversionsSubject')
   
    return JSON.parse(submissionConversions!)
  }









clearDashboardSession(){
  sessionStorage.removeItem('topBrokerSubject')
  sessionStorage.removeItem('topLocationSubject')
  sessionStorage.removeItem('topIndustrySubject')
  sessionStorage.removeItem('submissionTurnaroundTimeSubject')
}
}
