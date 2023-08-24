import { catchError, map, Observable, of, retry, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from "moment";
import { UserProfile } from 'src/app/model/profile/userprofile';
import { FAResult } from 'src/app/model/common/2faresult';

import { GlobalService } from '../common/global.service';
import { AppConfigService } from 'src/app/app-config-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
    env = this.configService.settings;
    //baseurl = 'https://csbbenqa.cognisure.ai:1089';
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
  constructor(private globalService:GlobalService,private configService:AppConfigService) {}

  
  
  errorHandl(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
