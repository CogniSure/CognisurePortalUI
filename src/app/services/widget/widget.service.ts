import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ChartData } from 'src/app/model/charts/chartdata';
import { DashboardFilter } from 'src/app/model/dashboard/dashboardfilter';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { GlobalService } from '../common/global.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AppConfigService } from "src/app/app-config-service";
import { HttpService } from '../common/http.service';


@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  env = this.configService.settings;
  private chartDataSubject = new BehaviorSubject<any>(
    {
    Dimension: "",
    Measure: ""
  });
  chartData$: Observable<ChartData> = this.chartDataSubject.asObservable();

  // private jsonDataSubject = new BehaviorSubject<any[]>([]);

  // private jsonData$ = this.jsonDataSubject.asObservable();

  constructor(private globalService : GlobalService, private http: HttpClient, private configService:AppConfigService, private httpService: HttpService) { 
     
  }

  getDashboard(
    widget: WidgetInput,
    filter: DashboardFilter
  ): Observable<any> {
    //let dsData :Observable<Dashboard> = new Observable<Dashboard>()
    let dsData = new BehaviorSubject<any>({
    });

    if (widget.WidgetName === 'Submissions') {
      return this.getSubmissions(filter)
    }
    else if (widget.WidgetName === 'QuoteRatio') {
      return this.getQuoteRatio(filter)
    }
    else if (widget.WidgetName === 'StraightThroughRate') {
      return this.getStraightThroughRate(filter)
    }
    else if (widget.WidgetName === 'SubmissionConversion') {
      return this.getSubmissionConversion(filter)
    }
    else
      return dsData;
  }
  getSubmissions(filter: DashboardFilter): Observable<any> {
    return of({
      ItemData_1 : 4870,
      ItemIcon_1 : "PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAzMyAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuMjUgMjEuMzEyNUM5LjQwNzM2IDIxLjMxMjUgMTEuMTU2MiAxOS41NjM2IDExLjE1NjIgMTcuNDA2MkMxMS4xNTYyIDE1LjI0ODkgOS40MDczNiAxMy41IDcuMjUgMTMuNUM1LjA5MjY0IDEzLjUgMy4zNDM3NSAxNS4yNDg5IDMuMzQzNzUgMTcuNDA2MkMzLjM0Mzc1IDE5LjU2MzYgNS4wOTI2NCAyMS4zMTI1IDcuMjUgMjEuMzEyNVpNNy4yNSAyMS4zMTI1QzMuNzk4MjIgMjEuMzEyNSAxIDIzLjQxMTIgMSAyNk03LjI1IDIxLjMxMjVDMTAuNzAxOCAyMS4zMTI1IDEzLjUgMjMuNDExMiAxMy41IDI2IiBzdHJva2U9IiMyRDJEMkQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTI2IDIxLjMxMjVDMjguMTU3NCAyMS4zMTI1IDI5LjkwNjIgMTkuNTYzNiAyOS45MDYyIDE3LjQwNjJDMjkuOTA2MiAxNS4yNDg5IDI4LjE1NzQgMTMuNSAyNiAxMy41QzIzLjg0MjYgMTMuNSAyMi4wOTM4IDE1LjI0ODkgMjIuMDkzOCAxNy40MDYyQzIyLjA5MzggMTkuNTYzNiAyMy44NDI2IDIxLjMxMjUgMjYgMjEuMzEyNVpNMjYgMjEuMzEyNUMyMi41NDgyIDIxLjMxMjUgMTkuNzUgMjMuNDExMiAxOS43NSAyNk0yNiAyMS4zMTI1QzI5LjQ1MTggMjEuMzEyNSAzMi4yNSAyMy40MTEyIDMyLjI1IDI2IiBzdHJva2U9IiMyRDJEMkQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTE2LjYyNSA4LjgxMjVDMTguNzgyNCA4LjgxMjUgMjAuNTMxMiA3LjA2MzYxIDIwLjUzMTIgNC45MDYyNUMyMC41MzEyIDIuNzQ4ODkgMTguNzgyNCAxIDE2LjYyNSAxQzE0LjQ2NzYgMSAxMi43MTg4IDIuNzQ4ODkgMTIuNzE4OCA0LjkwNjI1QzEyLjcxODggNy4wNjM2MSAxNC40Njc2IDguODEyNSAxNi42MjUgOC44MTI1Wk0xNi42MjUgOC44MTI1QzEzLjE3MzIgOC44MTI1IDEwLjM3NSAxMC45MTEyIDEwLjM3NSAxMy41TTE2LjYyNSA4LjgxMjVDMjAuMDc2OCA4LjgxMjUgMjIuODc1IDEwLjkxMTIgMjIuODc1IDEzLjUiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K",
      ItemData_2 : 112,
      ItemIcon_2 : "PHN2ZyB3aWR0aD0iMjciIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyNyAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjUgMTYuNjI1QzE3LjgxNDcgMTYuNjI1IDIxLjMxMjUgMTMuMTI3MiAyMS4zMTI1IDguODEyNUMyMS4zMTI1IDQuNDk3NzggMTcuODE0NyAxIDEzLjUgMUM5LjE4NTI4IDEgNS42ODc1IDQuNDk3NzggNS42ODc1IDguODEyNUM1LjY4NzUgMTMuMTI3MiA5LjE4NTI4IDE2LjYyNSAxMy41IDE2LjYyNVpNMTMuNSAxNi42MjVDNi41OTY0NCAxNi42MjUgMSAyMC44MjIzIDEgMjZNMTMuNSAxNi42MjVDMjAuNDAzNiAxNi42MjUgMjYgMjAuODIyMyAyNiAyNiIgc3Ryb2tlPSIjMkQyRDJEIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo="
    });
  }
  getQuoteRatio(filter: DashboardFilter): Observable<any> {
    return of({
      ItemData_1 : "67%",
      ItemIcon_1 : "PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyOCAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjc2NTYgMTMuNzcxTDEzLjc2NTYgMTEuMTExNCIgc3Ryb2tlPSIjMkQyRDJEIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTIuMTcxOSAyMi44MTRIMTYuMTYxMyIgc3Ryb2tlPSIjMkQyRDJEIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8Y2lyY2xlIGN4PSIxMy43NjgzIiBjeT0iOC45ODQxMiIgcj0iMi4xMjc2OCIgc3Ryb2tlPSIjMkQyRDJEIiBzdHJva2Utd2lkdGg9IjEuMjUiLz4KPGNpcmNsZSBjeD0iOS41MDk4MiIgY3k9IjE4LjAyNjQiIHI9IjEuNTk1NzYiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjI1Ii8+CjxjaXJjbGUgY3g9IjE4LjU1MjgiIGN5PSIxOC4wMjY0IiByPSIxLjU5NTc2IiBzdHJva2U9IiMyRDJEMkQiIHN0cm9rZS13aWR0aD0iMS4yNSIvPgo8cmVjdCB4PSI0LjE5MTQxIiB5PSIxMy43NzEiIHdpZHRoPSIxOS42ODEiIGhlaWdodD0iMTIuMjM0MSIgcng9IjEiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjI1Ii8+CjxwYXRoIGQ9Ik0yMy44NzEyIDE2Ljk2MjdDMjQuMjkwMyAxNi45NjI3IDI0LjcwNTMgMTcuMDQ1MiAyNS4wOTI1IDE3LjIwNTZDMjUuNDc5OCAxNy4zNjYgMjUuODMxNiAxNy42MDExIDI2LjEyNzkgMTcuODk3NEMyNi40MjQzIDE4LjE5MzggMjYuNjU5NCAxOC41NDU2IDI2LjgxOTggMTguOTMyOEMyNi45ODAyIDE5LjMyMDEgMjcuMDYyNyAxOS43MzUxIDI3LjA2MjcgMjAuMTU0MkMyNy4wNjI3IDIwLjU3MzMgMjYuOTgwMiAyMC45ODgzIDI2LjgxOTggMjEuMzc1NUMyNi42NTk0IDIxLjc2MjcgMjYuNDI0MyAyMi4xMTQ2IDI2LjEyNzkgMjIuNDEwOUMyNS44MzE2IDIyLjcwNzMgMjUuNDc5OCAyMi45NDI0IDI1LjA5MjUgMjMuMTAyOEMyNC43MDUzIDIzLjI2MzIgMjQuMjkwMyAyMy4zNDU3IDIzLjg3MTIgMjMuMzQ1N0wyMy44NzEyIDIwLjE1NDJMMjMuODcxMiAxNi45NjI3WiIgc3Ryb2tlPSIjMkQyRDJEIiBzdHJva2Utd2lkdGg9IjEuMjUiLz4KPHBhdGggZD0iTTQuMTkxMyAxNi45NjI3QzMuNzcyMTggMTYuOTYyNyAzLjM1NzE3IDE3LjA0NTIgMi45Njk5NiAxNy4yMDU2QzIuNTgyNzUgMTcuMzY2IDIuMjMwOTIgMTcuNjAxMSAxLjkzNDU2IDE3Ljg5NzRDMS42MzgyIDE4LjE5MzggMS40MDMxMSAxOC41NDU2IDEuMjQyNzIgMTguOTMyOEMxLjA4MjM0IDE5LjMyMDEgMC45OTk3ODQgMTkuNzM1MSAwLjk5OTc4NCAyMC4xNTQyQzAuOTk5Nzg0IDIwLjU3MzMgMS4wODIzNCAyMC45ODgzIDEuMjQyNzIgMjEuMzc1NUMxLjQwMzExIDIxLjc2MjcgMS42MzgyIDIyLjExNDYgMS45MzQ1NiAyMi40MTA5QzIuMjMwOTIgMjIuNzA3MyAyLjU4Mjc1IDIyLjk0MjQgMi45Njk5NiAyMy4xMDI4QzMuMzU3MTcgMjMuMjYzMiAzLjc3MjE4IDIzLjM0NTcgNC4xOTEzIDIzLjM0NTdMNC4xOTEzIDIwLjE1NDJMNC4xOTEzIDE2Ljk2MjdaIiBzdHJva2U9IiMyRDJEMkQiIHN0cm9rZS13aWR0aD0iMS4yNSIvPgo8cGF0aCBkPSJNMTEuMTQ4NiA0LjcyOUMxMi42NDgxIDMuMjMyMjEgMTUuMDc5MiAzLjIzMjIxIDE2LjU3ODYgNC43MjlNOC45NzY1NiAzLjAyNjI0QzExLjY3NTYgMC4zMzIwMTQgMTYuMDUxNiAwLjMzMjAxNCAxOC43NTA2IDMuMDI2MjQiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==",
      ItemData_2 : "3%",
      ItemIcon_2 : "PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAzMiAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgMTlMMTAuOTY5NyA5LjAzMDMzQzExLjI2MjYgOC43Mzc0NCAxMS43Mzc0IDguNzM3NDQgMTIuMDMwMyA5LjAzMDMzTDE2Ljk2OTcgMTMuOTY5N0MxNy4yNjI2IDE0LjI2MjYgMTcuNzM3NCAxNC4yNjI2IDE4LjAzMDMgMTMuOTY5N0wyOS41IDIuNU0yMiAxSDMwLjI1QzMwLjY2NDIgMSAzMSAxLjMzNTc5IDMxIDEuNzVWMTAiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K"
    });
  }
  getStraightThroughRate(filter: DashboardFilter): Observable<any> {
    return of({
      ItemData_1 : "12%",
      ItemIcon_1 : "PHN2ZyB3aWR0aD0iMjciIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyNyAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4Ljg1NzEgOS45Mjg1N0wxMi4zNDU2IDE2LjQ0MDFDMTEuOTk3IDE2Ljc4ODggMTEuNDMxNiAxNi43ODg4IDExLjA4MjkgMTYuNDQwMUw4LjE0Mjg2IDEzLjVNMjYgMTMuNUMyNiAyMC40MDM2IDIwLjQwMzYgMjYgMTMuNSAyNkM2LjU5NjQ0IDI2IDEgMjAuNDAzNiAxIDEzLjVDMSA2LjU5NjQ0IDYuNTk2NDQgMSAxMy41IDFDMjAuNDAzNiAxIDI2IDYuNTk2NDQgMjYgMTMuNVoiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K",
      ItemData_2 : "4%",
      ItemIcon_2 : "PHN2ZyB3aWR0aD0iMjciIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyNyAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjA3MTQgMTcuMDcxTDkuOTI4NjMgOS45MjgyMk05LjkyODU3IDE3LjA3MThMMTcuMDcxNCA5LjkyOTA0TTI2IDEzLjVDMjYgMjAuNDAzNiAyMC40MDM2IDI2IDEzLjUgMjZDNi41OTY0NCAyNiAxIDIwLjQwMzYgMSAxMy41QzEgNi41OTY0NCA2LjU5NjQ0IDEgMTMuNSAxQzIwLjQwMzYgMSAyNiA2LjU5NjQ0IDI2IDEzLjVaIiBzdHJva2U9IiMyRDJEMkQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg=="
    });
  }
  
  getTopLocationsbyStateFromDB(topNumber:string,clientId: string, userEmailId: string, startDate: string, endDate: string, type: string): Observable<any> {
    const apiUrl = this.env.baseUrl+'api/DashboardGraph';
    const params = new HttpParams()
      .set('TOPNUMBER', topNumber)
      .set('CLIENTID', clientId)
      .set('UserEmailId', userEmailId)
      .set('StartDate', startDate)
      .set('EndDate', endDate)
      .set('Type', type);
    return this.http.get<any[]>(apiUrl, { params });
  }
  
  getTopLocationsFromDB(topNumber: string,clientId: string, userEmailId: string, startDate: string, endDate: string, type: string): Observable<any> {
    const apiUrl = this.env.baseUrl+'api/DashboardGraph';
    const params = new HttpParams()
      .set('TOPNUMBER', topNumber)
      .set('CLIENTID', clientId)
      .set('UserEmailId', userEmailId)
      .set('StartDate', startDate)
      .set('EndDate', endDate)
      .set('Type', type);
    return this.http.get<any[]>(apiUrl, { params });
  }
  
  getTopBrokersFromDB(topNumber: string,clientId: string, userEmailId: string, startDate: string, endDate: string, type: string): Observable<any> {
    const apiUrl = this.env.baseUrl+'api/DashboardGraph';
    const params = new HttpParams()
      .set('TOPNUMBER', topNumber)
      .set('CLIENTID', clientId)
      .set('UserEmailId', userEmailId)
      .set('StartDate', startDate)
      .set('EndDate', endDate)
      .set('Type', type);
    return this.http.get<any[]>(apiUrl, { params });
  }
  
  getTopIndustriesFromDB(topNumber: string,clientId: string, userEmailId: string, startDate: string, endDate: string, type: string): Observable<any> {
    const apiUrl = this.env.baseUrl+'api/DashboardGraph';
    const params = new HttpParams()
      .set('TOPNUMBER', topNumber)
      .set('CLIENTID', clientId)
      .set('UserEmailId', userEmailId)
      .set('StartDate', startDate)
      .set('EndDate', endDate)
      .set('Type', type);
    return this.http.get<any[]>(apiUrl, { params });
  }
  
  getSubmissionTurnaroundTimeFromDB(topNumber: string,clientId: string, userEmailId: string, startDate: string, endDate: string, type: string): Observable<any> {
    const apiUrl = this.env.baseUrl+'api/DashboardGraph';
    const params = new HttpParams()
      .set('TOPNUMBER', topNumber)
      .set('CLIENTID', clientId)
      .set('UserEmailId', userEmailId)
      .set('StartDate', startDate)
      .set('EndDate', endDate)
      .set('Type', type);
    return this.http.get<any[]>(apiUrl, { params });
  }

  getCoverageDistributionFromDB(topNumber: string,clientId: string, userEmailId: string, startDate: string, endDate: string, type: string): Observable<any> {
     const apiUrl = this.env.baseUrl+'api/DashboardGraph';
    const params = new HttpParams()
      .set('CLIENTID', clientId)
      .set('UserEmailId', userEmailId)
      .set('StartDate', startDate)
      .set('EndDate', endDate)
      .set('Type', type);
    return this.http.get<any[]>(apiUrl, { params });
  }
  
  getSubmissionConversionsFromDB(topNumber: string,clientId: string, userEmailId: string, startDate: string, endDate: string, type: string): Observable<any> {
    let submissionConversions = [
      {
        Dimension: ["Boston", "Boston1", "Boston2"],
        Measure: ["25", "20", "25"],
      },
     ]
    return of(submissionConversions)
  }
  getSubmissionConversion(filter: DashboardFilter) {
    let updatedChartData=
    [
          {category: '', data: ''},
        ]
    

    let submissionConversions = this.globalService.getSubmissionConversions()
  let count= submissionConversions[0].Dimension.length;
  for (let i = 0;i<count;i++) {
    let funnelchartdata={category: submissionConversions[0].Dimension[i], data: submissionConversions[0].Measure[i]}
      updatedChartData.push(funnelchartdata)
 }
    return of(updatedChartData);
  }
}
