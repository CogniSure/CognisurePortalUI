import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  Observer,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import { HttpService } from '../common/http.service';
import { AppConfigService } from 'src/app/app-config-service';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  env = this.configService.settings;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  resetDashboardData: any;
  private apiUrl = '';
  

  constructor(private httpService: HttpService,private configService:AppConfigService, private http: HttpClient) {}

  downloadSubmission360(submissionId : string) : Observable<any>{
    var apiUrl = this.env.baseUrl + 'api/submission360';
    var result;
    let hParams = new HttpParams();
    hParams = hParams.set('submissionid', submissionId);
    return this.httpService.getData(apiUrl, hParams);
  }

  saveChanges(data: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/saveChanges`, data);
  }

}
``