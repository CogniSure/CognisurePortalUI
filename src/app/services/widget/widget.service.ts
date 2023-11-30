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
    if (widget.WidgetName === 'SubmissionTurnaroundTime') {
      return this.getSubmissionTurnaroundTime(filter)
    }
    else if (widget.WidgetName === 'TopBrokers') {
      return this.getTopBrokers(filter)
    }
    else if (widget.WidgetName === 'CoverageDistribution') {
      return this.getCoverageDistribution(filter)
    }
    else if (widget.WidgetName === 'TopIndustries') {
      return this.getTopIndustries(filter)
    }
    else if (widget.WidgetName === 'TopLocations') {
      // let TopLocations = this.getTopLocations(filter);
      // console.log(TopLocations);
      return this.getTopLocations(filter)
      // return of(topLocations)
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
      ItemIcon_1 : "PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAzMyAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuMjUgMjEuMzEyNkM5LjQwNzM2IDIxLjMxMjYgMTEuMTU2MiAxOS41NjM3IDExLjE1NjIgMTcuNDA2M0MxMS4xNTYyIDE1LjI0ODkgOS40MDczNiAxMy41MDAxIDcuMjUgMTMuNTAwMUM1LjA5MjY0IDEzLjUwMDEgMy4zNDM3NSAxNS4yNDg5IDMuMzQzNzUgMTcuNDA2M0MzLjM0Mzc1IDE5LjU2MzcgNS4wOTI2NCAyMS4zMTI2IDcuMjUgMjEuMzEyNlpNNy4yNSAyMS4zMTI2QzMuNzk4MjIgMjEuMzEyNiAxIDIzLjQxMTIgMSAyNi4wMDAxTTcuMjUgMjEuMzEyNkMxMC43MDE4IDIxLjMxMjYgMTMuNSAyMy40MTEyIDEzLjUgMjYuMDAwMSIgc3Ryb2tlPSIjMkQyRDJEIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0yNiAyMS4zMTI2QzI4LjE1NzQgMjEuMzEyNiAyOS45MDYyIDE5LjU2MzcgMjkuOTA2MiAxNy40MDYzQzI5LjkwNjIgMTUuMjQ4OSAyOC4xNTc0IDEzLjUwMDEgMjYgMTMuNTAwMUMyMy44NDI2IDEzLjUwMDEgMjIuMDkzOCAxNS4yNDg5IDIyLjA5MzggMTcuNDA2M0MyMi4wOTM4IDE5LjU2MzcgMjMuODQyNiAyMS4zMTI2IDI2IDIxLjMxMjZaTTI2IDIxLjMxMjZDMjIuNTQ4MiAyMS4zMTI2IDE5Ljc1IDIzLjQxMTIgMTkuNzUgMjYuMDAwMU0yNiAyMS4zMTI2QzI5LjQ1MTggMjEuMzEyNiAzMi4yNSAyMy40MTEyIDMyLjI1IDI2LjAwMDEiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTYuNjI1IDguODEyNUMxOC43ODI0IDguODEyNSAyMC41MzEyIDcuMDYzNjEgMjAuNTMxMiA0LjkwNjI1QzIwLjUzMTIgMi43NDg4OSAxOC43ODI0IDEgMTYuNjI1IDFDMTQuNDY3NiAxIDEyLjcxODggMi43NDg4OSAxMi43MTg4IDQuOTA2MjVDMTIuNzE4OCA3LjA2MzYxIDE0LjQ2NzYgOC44MTI1IDE2LjYyNSA4LjgxMjVaTTE2LjYyNSA4LjgxMjVDMTMuMTczMiA4LjgxMjUgMTAuMzc1IDEwLjkxMTIgMTAuMzc1IDEzLjVNMTYuNjI1IDguODEyNUMyMC4wNzY4IDguODEyNSAyMi44NzUgMTAuOTExMiAyMi44NzUgMTMuNSIgc3Ryb2tlPSIjMkQyRDJEIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=",
      ItemData_2 : 112,
      ItemIcon_2 : "PHN2ZyB3aWR0aD0iMjciIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyNyAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjUgMTYuNjI1QzE3LjgxNDcgMTYuNjI1IDIxLjMxMjUgMTMuMTI3MiAyMS4zMTI1IDguODEyNUMyMS4zMTI1IDQuNDk3NzggMTcuODE0NyAxIDEzLjUgMUM5LjE4NTI4IDEgNS42ODc1IDQuNDk3NzggNS42ODc1IDguODEyNUM1LjY4NzUgMTMuMTI3MiA5LjE4NTI4IDE2LjYyNSAxMy41IDE2LjYyNVpNMTMuNSAxNi42MjVDNi41OTY0NCAxNi42MjUgMSAyMC44MjIzIDEgMjZNMTMuNSAxNi42MjVDMjAuNDAzNiAxNi42MjUgMjYgMjAuODIyMyAyNiAyNiIgc3Ryb2tlPSIjMkQyRDJEIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo="
    });
  }
  getQuoteRatio(filter: DashboardFilter): Observable<any> {
    return of({
      ItemData_1 : "67%",
      ItemIcon_1 : "PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyOCAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjc2NTkgMTMuNzY1OEwxMy43NjU5IDExLjEwNjIiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTEyLjE3MDIgMjIuODA4OEgxNi4xNTk2IiBzdHJva2U9IiMyRDJEMkQiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxjaXJjbGUgY3g9IjEzLjc2NjEiIGN5PSI4Ljk3ODc1IiByPSIyLjEyNzY4IiBzdHJva2U9IiMyRDJEMkQiIHN0cm9rZS13aWR0aD0iMS4yNSIvPgo8Y2lyY2xlIGN4PSI5LjUxMDU1IiBjeT0iMTguMDIxIiByPSIxLjU5NTc2IiBzdHJva2U9IiMyRDJEMkQiIHN0cm9rZS13aWR0aD0iMS4yNSIvPgo8Y2lyY2xlIGN4PSIxOC41NTMiIGN5PSIxOC4wMjEiIHI9IjEuNTk1NzYiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjI1Ii8+CjxyZWN0IHg9IjQuMTkxMTYiIHk9IjEzLjc2NTgiIHdpZHRoPSIxOS42ODEiIGhlaWdodD0iMTIuMjM0MSIgcng9IjEiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjI1Ii8+CjxwYXRoIGQ9Ik0yMy44NzI0IDE2Ljk1NzRDMjQuMjkxNSAxNi45NTc0IDI0LjcwNjUgMTcuMDQgMjUuMDkzOCAxNy4yMDA0QzI1LjQ4MSAxNy4zNjA4IDI1LjgzMjggMTcuNTk1OCAyNi4xMjkyIDE3Ljg5MjJDMjYuNDI1NSAxOC4xODg2IDI2LjY2MDYgMTguNTQwNCAyNi44MjEgMTguOTI3NkMyNi45ODE0IDE5LjMxNDggMjcuMDYzOSAxOS43Mjk4IDI3LjA2MzkgMjAuMTQ4OUMyNy4wNjM5IDIwLjU2ODEgMjYuOTgxNCAyMC45ODMxIDI2LjgyMSAyMS4zNzAzQzI2LjY2MDYgMjEuNzU3NSAyNi40MjU1IDIyLjEwOTMgMjYuMTI5MiAyMi40MDU3QzI1LjgzMjggMjIuNzAyIDI1LjQ4MSAyMi45MzcxIDI1LjA5MzggMjMuMDk3NUMyNC43MDY1IDIzLjI1NzkgMjQuMjkxNSAyMy4zNDA1IDIzLjg3MjQgMjMuMzQwNUwyMy44NzI0IDIwLjE0ODlMMjMuODcyNCAxNi45NTc0WiIgc3Ryb2tlPSIjMkQyRDJEIiBzdHJva2Utd2lkdGg9IjEuMjUiLz4KPHBhdGggZD0iTTQuMTkxNTQgMTYuOTU3NEMzLjc3MjQzIDE2Ljk1NzQgMy4zNTc0MiAxNy4wNCAyLjk3MDIgMTcuMjAwNEMyLjU4Mjk5IDE3LjM2MDggMi4yMzExNiAxNy41OTU4IDEuOTM0OCAxNy44OTIyQzEuNjM4NDQgMTguMTg4NiAxLjQwMzM2IDE4LjU0MDQgMS4yNDI5NyAxOC45Mjc2QzEuMDgyNTggMTkuMzE0OCAxLjAwMDAzIDE5LjcyOTggMS4wMDAwMyAyMC4xNDg5QzEuMDAwMDMgMjAuNTY4MSAxLjA4MjU4IDIwLjk4MzEgMS4yNDI5NyAyMS4zNzAzQzEuNDAzMzYgMjEuNzU3NSAxLjYzODQ0IDIyLjEwOTMgMS45MzQ4IDIyLjQwNTdDMi4yMzExNiAyMi43MDIgMi41ODI5OSAyMi45MzcxIDIuOTcwMiAyMy4wOTc1QzMuMzU3NDIgMjMuMjU3OSAzLjc3MjQzIDIzLjM0MDUgNC4xOTE1NCAyMy4zNDA1TDQuMTkxNTQgMjAuMTQ4OUw0LjE5MTU0IDE2Ljk1NzRaIiBzdHJva2U9IiMyRDJEMkQiIHN0cm9rZS13aWR0aD0iMS4yNSIvPgo8cGF0aCBkPSJNMTEuMTUwOCA0LjcyMzU3QzEyLjY1MDMgMy4yMjY3OCAxNS4wODE0IDMuMjI2NzggMTYuNTgwOCA0LjcyMzU3TTguOTc4NzYgMy4wMjA4MUMxMS42Nzc4IDAuMzI2NTgyIDE2LjA1MzggMC4zMjY1ODIgMTguNzUyOCAzLjAyMDgxIiBzdHJva2U9IiMyRDJEMkQiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=",
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
  // getTopBrokers(filter: DashboardFilter): Observable<any> {
  //   return of({
  //     Categories: ['Assured Partners', 'Lockton', 'AJG', 'Brown & Brown', 'Marsh'],
  //     Data: [
  //       {
  //         Name: '',
  //         Data: [
  //           .27, .22, .14, .12, .05
  //         ],
  //       },
  //     ],
  //   });
  // }
  // getCoverageDistribution(filter: DashboardFilter): Observable<any> {
    // return of({
    //   Categories: ['Property', 'Automobile', 'Umbrella', 'General Liability', 'Workers Compensation', 'Others'],
    //   Data: [
    //     {
    //       Name: '',
    //       Data: [
    //         .24, .22, .15, .17, .18, .04
    //       ],
    //     },
    //   ],
    // });
  //   return of([
  //     {category: 'Property', value: 24},
  //     {category: 'Automobile', value: 22},
  //     {category: 'Umbrella', value: 15},
  //     {category: 'General Liability', value: 17},
  //     {category: 'Workers Compensation', value: 18},
  //     {category: 'Others', value: 4}
  //   ])
  // }
  // getTopIndustries(filter: DashboardFilter): Observable<any> {
  //   return of({
  //     Categories: ['Manufacturing', 'Construction', 'Warehouses', 'Trucking', 'Aviation'],
  //     Data: [
  //       {
  //         Name: '',
  //         Data: [
  //           .35, .32, .12, .05, .03
  //         ],
  //       },
  //     ],
  //   });
  // }
  // getSubmissionTurnaroundTime(filter: DashboardFilter): Observable<any> {
  //   return of({
  //     Categories: ['0.5', '1', '2', '3', '3+'],
  //     Data: [
  //       {
  //         Name: '',
  //         Data: [
  //           .68,.24,.06,.02,0
  //         ],
  //       },
  //     ],
  //   });
  // }
  // getTopLocations(filter: DashboardFilter): Observable<any> {
  //   return of({
  //     Categories: ['Boston', 'Rhode Island', 'Worcester', 'Lowell', 'New Bedford'],
  //     Data: [
  //       {
  //         Name: '',
  //         Data: [
  //           .27, .14, .13, .08, .05
  //         ],
  //       },
  //     ],
  //   });
  // }
  // getSubmissionConversions(filter: DashboardFilter): Observable<any> {
  //   return of([
  //       {
  //         stat: 'Total Submissions',
  //         count: 4870,
  //         color: '#009CC1',
  //       },
  //       {
  //         stat: 'Quoted',
  //         count: 3380,
  //         color: '#00B4DF',
  //       },
  //       {
  //         stat: 'Bound',
  //         count: 1021,
  //         color: '#0CD0FF',
  //       }
  //     ]);
  // }


  // private chartDataSubject = new BehaviorSubject<ChartData | null>(null);
  // chartData$ = this.chartDataSubject.asObservable();

  
  // getSubmissionConversions(filter: DashboardFilter): Observable<any> {
  //   return this.jsonData$; 
  
  // }
  
  // private jsonDataSubject = new BehaviorSubject<any[]>([
  //   {
  //     "Dimension": "GL",
  //     "Measure": 25,
  //     "color": '#009CC1',
  //   },
  //   {
  //     "Dimension": "Property",
  //     "Measure": 18,
  //     "color": '#00B4DF',
  //   },
  //   {
  //     "Dimension": "Liability",
  //     "Measure": 30,
  //     "color": '#0CD0FF',
  //   }
  // ]);

  // private jsonData$ = this.jsonDataSubject.asObservable();

  // setData(newData: any[]): void {
  //   this.jsonDataSubject.next(newData);
  // }

  // getData(): Observable<any[]> {
  //   return this.jsonData$; 
  // }

  // logData(): void {
  // this.jsonData$.subscribe((data) => {
  //   console.log('jsonDataSubject values:', data);
  // });
  // }


  // getSubmissionTurnaroundTime(filter: DashboardFilter): Observable<any> {
  //   this.chartData$.subscribe((chartData: any) => {
  //     // console.log('ChartData from getSubmissionTurnaroundTime:', chartData);
  //   });
  
  //   const updatedChartData: ChartData = {
  //     Categories: ['0.5', '1', '2', '3', '3+'],
  //     Data: [
  //       {
  //         Name: '',
  //         Data: [.68, .45, .25, .10, 0]
  //       },
  //     ],
  //   };
 
  //   // this.setChartData(updatedChartData);
  //   return of(updatedChartData);
  // }


  // getTopBrokers(filter: DashboardFilter): Observable<any> {
  //   this.chartData$.subscribe((chartData: ChartData) => {
  //   });
  
  //   const updatedChartData: ChartData = {
  //     Categories: ['Assured Partners', 'Lockton', 'AJG', 'Brown & Brown', 'Marsh'],
  //     Data: [
  //       {
  //         Name: '',
  //         Data: [.27, .22, .14, .12, .05]
  //       },
  //     ],
  //   };
 
  //   // this.setChartData(updatedChartData);
  //   return of(updatedChartData);
  // }


  // getTopIndustries(filter: DashboardFilter): Observable<any> {
  //   this.chartData$.subscribe((chartData: ChartData) => {
  //   });
  
  //   const updatedChartData: ChartData = {
  //     Categories: ['Manufacturing', 'Construction', 'Warehouses', 'Trucking', 'Aviation'],
  //     Data: [
  //       {
  //         Name: '',
  //         Data: [.35, .32, .12, .05, .03]
  //       },
  //     ],
  //   };
 
  //   this.setChartData(updatedChartData);
  //   return of(updatedChartData);
  // }
  getTopLocationsFromDB(clientId: string, userEmailId: string, startDate: string, endDate: string, type: string): Observable<any> {
    const apiUrl = this.env.baseUrl+'api/DashboardGraph';
    const params = new HttpParams()
      .set('CLIENTID', clientId)
      .set('UserEmailId', userEmailId)
      .set('StartDate', startDate)
      .set('EndDate', endDate)
      .set('Type', type);
    return this.http.get<any[]>(apiUrl, { params });
  }
  getTopLocations(filter: DashboardFilter): Observable<ChartData> {
    let updatedChartData: ChartData = {
      Categories : [],
      Data : []
    }

    let locations = this.globalService.getTopLocation()
    locations.value.forEach((data: any)=>{
          updatedChartData.Categories.push(data.dimension);
          updatedChartData.Data[0].Data.push("20");
        })
      return of(updatedChartData);
  }
  

  getTopBrokersFromDB(topNumber: string,clientId: string, userEmailId: string, startDate: string, endDate: string, type: string): Observable<any> {
    // let topBroker = [
    //   {
    //     Dimension: "Assured Partners",
    //     Measure: "27"
    //   },
    //   {
    //     Dimension: "Lockton",
    //     Measure: "22"
    //   },
    //   {
    //     Dimension: "AJG",
    //     Measure: "14"
    //   },
    //   {
    //     Dimension: "Brown & Brown",
    //     Measure: "12"
    //   },
    //   {
    //     Dimension: "Marsh",
    //     Measure: "05"
    //   }
    //  ]
    // return of(topBroker)
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
  getTopBrokers(filter: DashboardFilter) {
    let updatedChartData: ChartData = {
      Categories : [],
      Data : [
        {
          Name:"",
          Data : []
        }
      ]
    }

    let brokers = this.globalService.getTopBroker()
    brokers.value.forEach((data: any)=>{
        updatedChartData.Categories.push(data.dimension)
        updatedChartData.Data.push(data.measure)
      })
    // console.log("TopBrokers-1");
    // console.log(updatedChartData);
    return of(updatedChartData);
  }
  



  getTopIndustriesFromDB(topNumber: string,clientId: string, userEmailId: string, startDate: string, endDate: string, type: string): Observable<any> {
    // let topIndustry = [
    //   {
    //     Dimension: "Manufacturing",
    //     Measure: "35"
    //   },
    //   {
    //     Dimension: "Construction",
    //     Measure: "32"
    //   },
    //   {
    //     Dimension: "Warehouses",
    //     Measure: "12"
    //   },
    //   {
    //     Dimension: "Trucking",
    //     Measure: "05"
    //   },
    //   {
    //     Dimension: "Aviation",
    //     Measure: "03"
    //   }
    //  ]
    // return of(topIndustry)
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
  getTopIndustries(filter: DashboardFilter) {
    let updatedChartData: ChartData = {
      Categories : [],
      Data : [
        {
          Name:"",
          Data : []
        }
      ]
    }

    let industries = this.globalService.getTopIndustry()
    console.log(industries);
    industries.value.forEach((data: any)=>{
        updatedChartData.Categories.push(data.dimension)
        updatedChartData.Data.push(data.measure)
      })
    // console.log("TopIndustry-1");
    // console.log(updatedChartData);
    return of(updatedChartData);
  }


  getSubmissionTurnaroundTimeFromDB(topNumber: string,clientId: string, userEmailId: string, startDate: string, endDate: string, type: string): Observable<any> {
    // let submissionTurnaroundTime = [
    //   {
    //     Dimension: "Boston",
    //     Measure: "10"
    //   },
    //   {
    //     Dimension: "Boston1",
    //     Measure: "20"
    //   },
    //   {
    //     Dimension: "Boston2",
    //     Measure: "10"
    //   },
    //   {
    //     Dimension: "Boston3",
    //     Measure: "25"
    //   },
    //   {
    //     Dimension: "Boston4",
    //     Measure: "13"
    //   }
    //  ]
    // return of(submissionTurnaroundTime)
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
  getSubmissionTurnaroundTime(filter: DashboardFilter) {
    let updatedChartData: ChartData = {
      Categories : [],
      Data : [
        {
          Name:"",
          Data : []
        }
      ]
    }

    let turnaroundTime = this.globalService.getSubmissionTurnaroundTime()
    turnaroundTime.value.forEach((data: any)=>{
        updatedChartData.Categories.push(data.dimension)
        updatedChartData.Data.push(data.measure)
      })
    // console.log("SubmissionTurnaroundTime-1");
    // console.log(updatedChartData);
    return of(updatedChartData);
  }




  getCoverageDistributionFromDB(): Observable<any> {
    let coverageDistributions = [
      {
        Dimension: ["Boston", "Boston1", "Boston2", "Boston3"],
        Measure: ["10", "20", "25", "13"],
        // InnerRadius: 80,
      },
     ]
    return of(coverageDistributions)
  }
  getCoverageDistribution(filter: DashboardFilter) {
    let updatedChartData=
    [
          {category: '', value: ''},
        ]
    

    let coverageDistributions = this.globalService.getCoverageDistributions()
      // locations.forEach((data: any)=>{
      //   let piechartdata={category: data.Dimension, value: data.Measure}
      //   updatedChartData.push(piechartdata)
        // updatedChartData.Categories.push(data.Dimension)
        // updatedChartData.Data.push(data.Measure)
      // })

  let count= coverageDistributions[0].Dimension.length;
  for (let i = 0;i<count;i++) {
    let piechartdata={category: coverageDistributions[0].Dimension[i], value: coverageDistributions[0].Measure[i]}
      updatedChartData.push(piechartdata)
 }

    // console.log("CoverageDistributions-1");
    // console.log(coverageDistributions);
    return of(updatedChartData);
  }

  

  getSubmissionConversionsFromDB(): Observable<any> {
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

    // console.log("SubmissionConversions-1");
    // console.log(submissionConversions);
    return of(updatedChartData);
  }


  // getCoverageDistribution(filter: DashboardFilter): Observable<any> {
  //   return this.piechartData$; 
  // }
  

  // private piechartDataSubject = new BehaviorSubject<any[]>([
  //   {
  //     "category": "Property",
  //     "value": 25,
  //   },
  //   {
  //     "category": "Automobile",
  //     "value": 20,
  //   },
  //   {
  //     "category": "Umbrella",
  //     "value": 15,
  //   },
  //   {
  //     "category": "General Liability",
  //     "value": 10,
  //   },
  //   {
  //     "category": "Workers Compensation",
  //     "value": 5,
  //   },
  //   {
  //     "category": "Others",
  //     "value": 1,
  //   }
  // ]);

  // piechartData$ = this.piechartDataSubject.asObservable();


  // setPie(pieData: any[]): void {
  //   this.piechartDataSubject.next(pieData);
  // }

  // getPie(): Observable<any[]> {
  //   return this.piechartData$; 
  // }

  // logPieData(): void {
  //   this.piechartData$.subscribe((data) => {
  //     console.log('piechartDataSubject values:', data);
  //   });
  // }

 



}
