import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { SubmissionInfo } from 'src/app/model/inbox/SubmissionInfo';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  setDashboardReload(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
  animationClass$ = new BehaviorSubject<string>('');
  constructor() {}
  public CurrentSubmissionId$ = new BehaviorSubject<any>({});
  public CurrentSubmission$ = new BehaviorSubject<any>({});

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
}
