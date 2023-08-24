import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

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
    this.CurrentSubmission$.next(submission);
  }
  getCurrentSubmission() {
    return this.CurrentSubmission$;
  }

  setCurrentSubmissionId(submissionId: any) {
    submissionId =
      'AAMkADU1NjU3NzEyLWMxZTItNDA5Yy04N2E0LTkzYWNjNTc3ZWVlMQBGAAAAAABFiQ8wy3CORZrMw-rLQJlFBwCM8fwoQTOCSY_HjadmsuvGAAAAAAEMAACM8fwoQTOCSY_HjadmsuvGAAKVXoPlAAA=';
    sessionStorage.setItem('CurrentSubmission', submissionId);
    //this.CurrentSubmission$.next(submissionId)
  }
  getCurrentSubmissionId() {
    var submissionId: any = '';
    submissionId = sessionStorage.getItem('CurrentSubmission')==null?"":sessionStorage.getItem('CurrentSubmission');

    //this.CurrentSubmission$.next(submissionId)
    return of(submissionId);
  }
}
