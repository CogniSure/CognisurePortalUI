import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DashboardFilter } from 'src/app/model/dashboard/dashboardfilter';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor() { }

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
    else
      return dsData;
  }
  getSubmissions(filter: DashboardFilter): Observable<any> {
    return of({
      ItemData_1 : 10000,
      ItemIcon_1 : "PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAzMyAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuMjUgMjEuMzEyNkM5LjQwNzM2IDIxLjMxMjYgMTEuMTU2MiAxOS41NjM3IDExLjE1NjIgMTcuNDA2M0MxMS4xNTYyIDE1LjI0ODkgOS40MDczNiAxMy41MDAxIDcuMjUgMTMuNTAwMUM1LjA5MjY0IDEzLjUwMDEgMy4zNDM3NSAxNS4yNDg5IDMuMzQzNzUgMTcuNDA2M0MzLjM0Mzc1IDE5LjU2MzcgNS4wOTI2NCAyMS4zMTI2IDcuMjUgMjEuMzEyNlpNNy4yNSAyMS4zMTI2QzMuNzk4MjIgMjEuMzEyNiAxIDIzLjQxMTIgMSAyNi4wMDAxTTcuMjUgMjEuMzEyNkMxMC43MDE4IDIxLjMxMjYgMTMuNSAyMy40MTEyIDEzLjUgMjYuMDAwMSIgc3Ryb2tlPSIjMkQyRDJEIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0yNiAyMS4zMTI2QzI4LjE1NzQgMjEuMzEyNiAyOS45MDYyIDE5LjU2MzcgMjkuOTA2MiAxNy40MDYzQzI5LjkwNjIgMTUuMjQ4OSAyOC4xNTc0IDEzLjUwMDEgMjYgMTMuNTAwMUMyMy44NDI2IDEzLjUwMDEgMjIuMDkzOCAxNS4yNDg5IDIyLjA5MzggMTcuNDA2M0MyMi4wOTM4IDE5LjU2MzcgMjMuODQyNiAyMS4zMTI2IDI2IDIxLjMxMjZaTTI2IDIxLjMxMjZDMjIuNTQ4MiAyMS4zMTI2IDE5Ljc1IDIzLjQxMTIgMTkuNzUgMjYuMDAwMU0yNiAyMS4zMTI2QzI5LjQ1MTggMjEuMzEyNiAzMi4yNSAyMy40MTEyIDMyLjI1IDI2LjAwMDEiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTYuNjI1IDguODEyNUMxOC43ODI0IDguODEyNSAyMC41MzEyIDcuMDYzNjEgMjAuNTMxMiA0LjkwNjI1QzIwLjUzMTIgMi43NDg4OSAxOC43ODI0IDEgMTYuNjI1IDFDMTQuNDY3NiAxIDEyLjcxODggMi43NDg4OSAxMi43MTg4IDQuOTA2MjVDMTIuNzE4OCA3LjA2MzYxIDE0LjQ2NzYgOC44MTI1IDE2LjYyNSA4LjgxMjVaTTE2LjYyNSA4LjgxMjVDMTMuMTczMiA4LjgxMjUgMTAuMzc1IDEwLjkxMTIgMTAuMzc1IDEzLjVNMTYuNjI1IDguODEyNUMyMC4wNzY4IDguODEyNSAyMi44NzUgMTAuOTExMiAyMi44NzUgMTMuNSIgc3Ryb2tlPSIjMkQyRDJEIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=",
      ItemData_2 : 50000,
      ItemIcon_2 : "PHN2ZyB3aWR0aD0iMjciIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyNyAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjUgMTYuNjI1QzE3LjgxNDcgMTYuNjI1IDIxLjMxMjUgMTMuMTI3MiAyMS4zMTI1IDguODEyNUMyMS4zMTI1IDQuNDk3NzggMTcuODE0NyAxIDEzLjUgMUM5LjE4NTI4IDEgNS42ODc1IDQuNDk3NzggNS42ODc1IDguODEyNUM1LjY4NzUgMTMuMTI3MiA5LjE4NTI4IDE2LjYyNSAxMy41IDE2LjYyNVpNMTMuNSAxNi42MjVDNi41OTY0NCAxNi42MjUgMSAyMC44MjIzIDEgMjZNMTMuNSAxNi42MjVDMjAuNDAzNiAxNi42MjUgMjYgMjAuODIyMyAyNiAyNiIgc3Ryb2tlPSIjMkQyRDJEIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo="
    });
  }
  getQuoteRatio(filter: DashboardFilter): Observable<any> {
    return of({
      ItemData_1 : 30000,
      ItemIcon_1 : "PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyOCAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjc2NTkgMTMuNzY1OEwxMy43NjU5IDExLjEwNjIiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTEyLjE3MDIgMjIuODA4OEgxNi4xNTk2IiBzdHJva2U9IiMyRDJEMkQiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxjaXJjbGUgY3g9IjEzLjc2NjEiIGN5PSI4Ljk3ODc1IiByPSIyLjEyNzY4IiBzdHJva2U9IiMyRDJEMkQiIHN0cm9rZS13aWR0aD0iMS4yNSIvPgo8Y2lyY2xlIGN4PSI5LjUxMDU1IiBjeT0iMTguMDIxIiByPSIxLjU5NTc2IiBzdHJva2U9IiMyRDJEMkQiIHN0cm9rZS13aWR0aD0iMS4yNSIvPgo8Y2lyY2xlIGN4PSIxOC41NTMiIGN5PSIxOC4wMjEiIHI9IjEuNTk1NzYiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjI1Ii8+CjxyZWN0IHg9IjQuMTkxMTYiIHk9IjEzLjc2NTgiIHdpZHRoPSIxOS42ODEiIGhlaWdodD0iMTIuMjM0MSIgcng9IjEiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjI1Ii8+CjxwYXRoIGQ9Ik0yMy44NzI0IDE2Ljk1NzRDMjQuMjkxNSAxNi45NTc0IDI0LjcwNjUgMTcuMDQgMjUuMDkzOCAxNy4yMDA0QzI1LjQ4MSAxNy4zNjA4IDI1LjgzMjggMTcuNTk1OCAyNi4xMjkyIDE3Ljg5MjJDMjYuNDI1NSAxOC4xODg2IDI2LjY2MDYgMTguNTQwNCAyNi44MjEgMTguOTI3NkMyNi45ODE0IDE5LjMxNDggMjcuMDYzOSAxOS43Mjk4IDI3LjA2MzkgMjAuMTQ4OUMyNy4wNjM5IDIwLjU2ODEgMjYuOTgxNCAyMC45ODMxIDI2LjgyMSAyMS4zNzAzQzI2LjY2MDYgMjEuNzU3NSAyNi40MjU1IDIyLjEwOTMgMjYuMTI5MiAyMi40MDU3QzI1LjgzMjggMjIuNzAyIDI1LjQ4MSAyMi45MzcxIDI1LjA5MzggMjMuMDk3NUMyNC43MDY1IDIzLjI1NzkgMjQuMjkxNSAyMy4zNDA1IDIzLjg3MjQgMjMuMzQwNUwyMy44NzI0IDIwLjE0ODlMMjMuODcyNCAxNi45NTc0WiIgc3Ryb2tlPSIjMkQyRDJEIiBzdHJva2Utd2lkdGg9IjEuMjUiLz4KPHBhdGggZD0iTTQuMTkxNTQgMTYuOTU3NEMzLjc3MjQzIDE2Ljk1NzQgMy4zNTc0MiAxNy4wNCAyLjk3MDIgMTcuMjAwNEMyLjU4Mjk5IDE3LjM2MDggMi4yMzExNiAxNy41OTU4IDEuOTM0OCAxNy44OTIyQzEuNjM4NDQgMTguMTg4NiAxLjQwMzM2IDE4LjU0MDQgMS4yNDI5NyAxOC45Mjc2QzEuMDgyNTggMTkuMzE0OCAxLjAwMDAzIDE5LjcyOTggMS4wMDAwMyAyMC4xNDg5QzEuMDAwMDMgMjAuNTY4MSAxLjA4MjU4IDIwLjk4MzEgMS4yNDI5NyAyMS4zNzAzQzEuNDAzMzYgMjEuNzU3NSAxLjYzODQ0IDIyLjEwOTMgMS45MzQ4IDIyLjQwNTdDMi4yMzExNiAyMi43MDIgMi41ODI5OSAyMi45MzcxIDIuOTcwMiAyMy4wOTc1QzMuMzU3NDIgMjMuMjU3OSAzLjc3MjQzIDIzLjM0MDUgNC4xOTE1NCAyMy4zNDA1TDQuMTkxNTQgMjAuMTQ4OUw0LjE5MTU0IDE2Ljk1NzRaIiBzdHJva2U9IiMyRDJEMkQiIHN0cm9rZS13aWR0aD0iMS4yNSIvPgo8cGF0aCBkPSJNMTEuMTUwOCA0LjcyMzU3QzEyLjY1MDMgMy4yMjY3OCAxNS4wODE0IDMuMjI2NzggMTYuNTgwOCA0LjcyMzU3TTguOTc4NzYgMy4wMjA4MUMxMS42Nzc4IDAuMzI2NTgyIDE2LjA1MzggMC4zMjY1ODIgMTguNzUyOCAzLjAyMDgxIiBzdHJva2U9IiMyRDJEMkQiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=",
      ItemData_2 : 40000,
      ItemIcon_2 : "PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAzMiAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgMTlMMTAuOTY5NyA5LjAzMDMzQzExLjI2MjYgOC43Mzc0NCAxMS43Mzc0IDguNzM3NDQgMTIuMDMwMyA5LjAzMDMzTDE2Ljk2OTcgMTMuOTY5N0MxNy4yNjI2IDE0LjI2MjYgMTcuNzM3NCAxNC4yNjI2IDE4LjAzMDMgMTMuOTY5N0wyOS41IDIuNU0yMiAxSDMwLjI1QzMwLjY2NDIgMSAzMSAxLjMzNTc5IDMxIDEuNzVWMTAiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K"
    });
  }
  getSubmissionTurnaroundTime(filter: DashboardFilter): Observable<any> {
    return of({
      Categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      Data: [
        {
          Name: 'India',
          Data: [
            "3.907", "7.943", "7.848", "9.284", "9.263", "9.801", "3.89", "8.238", "9.552", "6.855"
          ],
        },
      ],
    });
  }
  getTopBrokers(filter: DashboardFilter): Observable<any> {
    return of({
      Categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      Data: [
        {
          Name: 'India',
          Data: [
            "3.907", "7.943", "7.848", "9.284", "9.263", "9.801", "3.89", "8.238", "9.552", "6.855"
          ],
        },
      ],
    });
  }
  getCoverageDistribution(filter: DashboardFilter): Observable<any> {
    return of({
      Categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      Data: [
        {
          Name: 'India',
          Data: [
            "3.907", "7.943", "7.848", "9.284", "9.263", "9.801", "3.89", "8.238", "9.552", "6.855"
          ],
        },
      ],
    });
  }
  getTopIndustries(filter: DashboardFilter): Observable<any> {
    return of({
      Categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      Data: [
        {
          Name: 'India',
          Data: [
            "3.907", "7.943", "7.848", "9.284", "9.263", "9.801", "3.89", "8.238", "9.552", "6.855"
          ],
        },
      ],
    });
  }
  getStraightThroughRate(filter: DashboardFilter): Observable<any> {
    return of({
      Categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      Data: [
        {
          Name: 'India',
          Data: [
            "3.907", "7.943", "7.848", "9.284", "9.263", "9.801", "3.89", "8.238", "9.552", "6.855"
          ],
        },
      ],
    });
  }
}
