import {
  BehaviorSubject,
  catchError,
  interval,
  map,
  Observable,
  of,
  retry,
  Subject,
  Subscription,
  throwError,
} from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { AppConfigService } from 'src/app/app-config-service';
import { HttpService } from '../common/http.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private configService: AppConfigService,
    private http: HttpService
  ) {
    this._timeoutSeconds = this._sessionTime * 60;
    this._remainSeconds.next(this._timeoutSeconds);
    this.remainSeconds$ = this._remainSeconds.asObservable();
    this._sessionstart.next(true);
    this.setSession();
  }
  private readonly _timeoutSeconds: number;
  private _count: number = 0;
  private _sessionTime: number = 20;
  expiresAt: number = 5 * 60;
  private timerSubscription!: Subscription;
  public zohotoken = "";
  private timerStartSubscription!: Subscription;
  private timer: Observable<number> = interval(1000);
  private _remainSeconds = new Subject<number>();
  private _remainMinutes = new Subject<string>();
  private _sessionstart = new BehaviorSubject<boolean>(false);

  sessionstart$ = this._sessionstart.asObservable();
  remainSeconds$ = this._remainSeconds.asObservable();
  remainMinutes$ = this._remainMinutes.asObservable();
  env = this.configService.settings;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  httpOption1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
  public login({ email, password }: any): Observable<any> {
    this.env = this.configService.settings;
    var apiUrl = this.env.baseUrl + 'api/login?';
    let hParams = new HttpParams();
    hParams = hParams.set('username', email);
    hParams = hParams.set('password', password);
    return this.http.postData(apiUrl, hParams, '');
  }
  public getZOHOToken(email:string): Observable<any>{
    this.env = this.configService.settings
      var apiUrl = this.env.baseUrl
      let hParams = new HttpParams();
      hParams = hParams.set('email', email);
      return this.http.getData(apiUrl+"api/zohotoken",hParams);
  }
  public getZOHOAPIToken(email:string): Observable<any>{
    this.env = this.configService.settings
      var apiUrl = this.env.baseUrl
      let hParams = new HttpParams();
      hParams = hParams.set('email', email);
      return this.http.getData(apiUrl+"api/zohotokenapi",hParams);
  }
  public refreshToken(): Observable<any> {
    this.env = this.configService.settings;
    var apiUrl = this.env.baseUrl + 'api/refreshtoken';
    let tokenObjStr = localStorage.getItem('session_token_obj');

    const tokenObj = JSON.parse(tokenObjStr!);
    var result;
    let hParams = new HttpParams();
    return this.http.postData(apiUrl, hParams, tokenObj);
  }
  resetSession() {}
  public setToken(authResult: any) {
    this.logout();
    this.resetTimer();
    var twentyMinutesLater = new Date();
    localStorage.setItem(
      'session_token_obj',
      JSON.stringify(authResult.value)
    );
    twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20);
    localStorage.setItem('session_token', authResult.value.accessToken);
    localStorage.setItem('refresh_token', authResult.value.refreshToken);
    localStorage.setItem('expires_at', JSON.stringify(twentyMinutesLater));
    localStorage.setItem('session_token', authResult.value.accessToken);
    localStorage.setItem('refresh_token', authResult.value.refreshToken);
    localStorage.setItem('expires_at', JSON.stringify(twentyMinutesLater));
    this._sessionstart.next(true);
    this.setSession();
  }

  public setSession() {
    const expiresAt = moment().add(this._sessionTime, 'minutes');

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isLoggedIn', 'true');
    this._sessionstart.next(true);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    this._sessionstart.next(true);
    this.startTimer();
  }
  logout() {
    this._sessionstart.next(false);
    localStorage.removeItem('Accounts');
    localStorage.removeItem('SelectedAccounts');
    localStorage.removeItem('SelectedDates');
    localStorage.removeItem('UserDetail');
    localStorage.removeItem('id_token');
    localStorage.removeItem('session_token');
    localStorage.removeItem('expires_at1');
    localStorage.removeItem('UserAdminDetail');
    
    localStorage.removeItem('session_token')
    
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  public isLoggedIn() {
    if (moment().isBefore(this.getExpiration())) {
      this.setSession();
      return moment().isBefore(this.getExpiration());
    }
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }
  startTimer() {
    this.stopTimer();
    this._count = this._timeoutSeconds;
    this.timerSubscription = this.timer.subscribe((n) => {
      if (this._sessionstart) {
        if (this._count > 0) {
          this._count--;
          this._remainSeconds.next(this._count);
          this._remainMinutes.next(
            Math.floor(this._count / 60) + ':' + (this._count % 60)
          );
        }
      } else {
        this._count = 0;
      }
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resetTimer() {
    this.stopTimer();
    this.startTimer();
  }
}
