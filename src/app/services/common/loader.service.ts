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
    console.log("Spinner Stattus - Get Observable" )
   return this.spinner$.asObservable(); 
  }

  requestStarted(){
    console.log("Spinner Stattus - Request Started" )
    if(++this.count===1){
     this.spinner$.next('start'); 
    }
  }
  requestEnded(){
    console.log("Spinner Stattus - Request Ended" )
    if(this.count===0 || --this.count===0){
     this.spinner$.next('stop'); 
    }
  }
  resetSpinner(){
    console.log("Spinner Stattus - Request Reset" )
    this.count = 0;
    this.spinner$.next('stop'); 
  }
  show() {
    console.log("Spinner Stattus - Request Show" )
     this.isLoading.next(true);
  }

  hide() {
    console.log("Spinner Stattus - Request Hide" )
     this.isLoading.next(false);
  }
}