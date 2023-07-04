import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private count = 0;
  private spinner$ = new BehaviorSubject<string>('')
  isLoading = new Subject<boolean>();

  constructor() {
  }

  
  getSpinnerObservable() : Observable<string>
  {
   return this.spinner$.asObservable(); 
  }

  requestStarted(){
    if(++this.count===1){
     this.spinner$.next('start'); 
    }
  }
  requestEnded(){
    if(this.count===0 || --this.count===0){
     this.spinner$.next('stop'); 
    }
  }
  resetSpinner(){
    this.count = 0;
    this.spinner$.next('stop'); 
  }
  show() {
     this.isLoading.next(true);
  }

  hide() {
     this.isLoading.next(false);
  }
}