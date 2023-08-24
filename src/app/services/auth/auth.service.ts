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
import {
  ConfigToken,
  SessionExpirationConfig,
} from 'src/app/model/common/session-expiration-config';
import { AppConfigService } from 'src/app/app-config-service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private http: HttpClient
  constructor(
    //@Inject(ConfigToken) readonly config: SessionExpirationConfig,
    private http: HttpClient,private configService : AppConfigService
  ) {
    this._timeoutSeconds = this._sessionTime * 60;
  }
  private readonly _timeoutSeconds: number;
  private _count: number = 0;
  private _sessionTime: number = 20;
  expiresAt: number = 5*60;
  private timerSubscription!: Subscription;

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
  
  resetSession() {}
  public setToken(authResult: any) {
    // const expiresAt = moment().add(
    //   this._sessionTime,
    //   'minutes'
    // );

    sessionStorage.setItem('id_token', authResult.value.accessToken);
    //sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    // this._sessionstart.next(true);
    // this.startTimer1();
  }
  public setSession() {
    const expiresAt = moment().add(
      this._sessionTime,
      'minutes'
    );

     sessionStorage.setItem('isLoggedIn', 'true');
     this._sessionstart.next (true)
     sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    this._sessionstart.next(true);
    this.startTimer1();
  }
  logout() {
    
    this._sessionstart.next(false);
    sessionStorage.removeItem('Accounts');
    sessionStorage.removeItem('SelectedAccounts');
    sessionStorage.removeItem('SelectedDates');
    sessionStorage.removeItem('UserDetail');
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('expires_at');
    sessionStorage.removeItem('UserAdminDetail');
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  public isLoggedIn() {
    if(moment().isBefore(this.getExpiration())){
      this.setSession()
      return moment().isBefore(this.getExpiration())
    }
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = sessionStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }
  startTimer1() {
    this.stopTimer1();
    this._count = this._timeoutSeconds;
    this.timerSubscription = this.timer.subscribe((n) => {
      if (this._sessionstart) {
        if (this._count > 0) {
          this._count--;
          this._remainSeconds.next(this._count);
          this._remainMinutes.next(Math.floor(this._count / 60) +":"+ this._count % 60)
        }
      } else {
        this._count = 0;
      }
    });
  }

  stopTimer1() {
    this._sessionstart.next(false);
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resetTimer() {
    this.startTimer1();
  }
}
