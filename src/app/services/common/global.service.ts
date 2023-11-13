import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { SubmissionInfo } from 'src/app/model/inbox/SubmissionInfo';
import { UserProfile } from '../../model/profile/userprofile';
import { Accounts } from 'src/app/model/profile/accounts';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  password$: any;
  loginDetails$: any;
  dashboardFilter$ = new BehaviorSubject<any>(null);
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


}
