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
import { Dashboard } from 'src/app/model/dashboard/dashboard';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { DataComponent } from 'src/app/model/samples/data';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../common/global.service';
import { DashboardData } from 'src/app/model/dashboard/dashboardData';
import { HttpService } from '../common/http.service';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  env = environment;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  resetDashboardData: any;
  

  constructor(private httpService: HttpService) {}

  downloadSubmission360(submissionId : string) : Observable<any>{
    var apiUrl = this.env.baseUrl + 'api/submission360';
    var result;
    let hParams = new HttpParams();
    hParams = hParams.set('submissionid', submissionId);
    return this.httpService.getData(apiUrl, hParams);
  }

}
