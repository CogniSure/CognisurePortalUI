import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  setDashboardReload(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
  animationClass$ = new BehaviorSubject<string>("");
  constructor() {}

  public CurrentSubmission$ = new BehaviorSubject<any>({});


  setCurrentSubmission(submission: any) {
    this.CurrentSubmission$.next(submission)
  }
  getCurrentSubmission() {
    return this.CurrentSubmission$;
  }
}
