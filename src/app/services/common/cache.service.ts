import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ChartData } from 'src/app/model/charts/chartdata';
import { AccountInformation } from 'src/app/model/inbox/AccountInformation';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  getAccountInformationfromDB(type: string, clientId: string, submissionId: string, email: string) {
    throw new Error('Method not implemented.');
  }
  private accountInformation: AccountInformation | null = null;
  private accountInformationSubject$ = new BehaviorSubject<any>({});


  private tivSubject$ = new BehaviorSubject<any[]>([]);
  private noOfLocationsSubject$ = new BehaviorSubject<any[]>([]);
  private noOfBuildingsSubject$ = new BehaviorSubject<any[]>([]);
  private constructionTypeSubject$ = new BehaviorSubject<any[]>([]);
  private occupancyTypeSubject$ = new BehaviorSubject<any[]>([]);
  private yearBuildSubject$ = new BehaviorSubject<any[]>([]);
  private protectionClassSubject$ = new BehaviorSubject<any[]>([]);

  private claimsbyLOBbyYear$ = new BehaviorSubject<any[]>([]);
  private incurredbyLOBbyYear$ = new BehaviorSubject<any[]>([]);
  private incurredRangeCount$ = new BehaviorSubject<any[]>([]);
  private claimbyClaimTypebyYear$ = new BehaviorSubject<any[]>([]);
  private incurredbyClaimTypebyYear$ = new BehaviorSubject<any[]>([]);
  private claimsbyClaimType$ = new BehaviorSubject<any[]>([]);
  private claimStatus$ = new BehaviorSubject<any[]>([]);
  private totalIncurred$ = new BehaviorSubject<any[]>([]);
  private topLocations$ = new BehaviorSubject<any[]>([]);
  
  private dashboard_TurnAroundTime$ = new BehaviorSubject<any[]>([]);
  private dashboard_TopBrokers$ = new BehaviorSubject<any[]>([]);
  private dashboard_CoverageDistribution$ = new BehaviorSubject<any[]>([]);
  private dashboard_TopIndustries$ = new BehaviorSubject<any[]>([]);
  private dashboard_TopLocationsByCity$ = new BehaviorSubject<any[]>([]);
  private dashboard_TopLocationsByState$ = new BehaviorSubject<any[]>([]);

  constructor() {
    let isSummaryCached = sessionStorage.getItem('isSummaryCached');
    // if (isSummaryCached)
    //   this.setExposureSummary();
  }

  clearSession() {
    sessionStorage.removeItem('tiv');
    sessionStorage.removeItem('noOfLocation');
    sessionStorage.removeItem('noOfBuildings');
  }
  // setExposureSummary() {
  //   let tiv = sessionStorage.getItem('tiv');
  // }
  getExposureSummary(widgetName: string): Observable<any[]> {
    let dsData = new BehaviorSubject<any[]>([]);
    if (widgetName === 'TIV') {
      return this.tivSubject$;
    } else if (widgetName === 'NoOfLocations') {
      return this.noOfLocationsSubject$;
    } else if (widgetName === 'NoOfBuildings') {
      return this.noOfBuildingsSubject$;;
    } else if (widgetName === 'ConstructionType') {
      return this.constructionTypeSubject$;
    } else if (widgetName === 'OccupancyType') {
      return this.occupancyTypeSubject$;
    } else if (widgetName === 'YearBuild') {
      return this.yearBuildSubject$;
    } else if (widgetName === 'ProtectionClass') {
      return this.protectionClassSubject$;
    }
    return of([]);
  }
  setExposureSummary(widgetName: string, data: any[]) {
    //let dsData = new BehaviorSubject<any[]>([]);
    if (widgetName === 'TIV') {
      this.tivSubject$.next(data);
    } else if (widgetName === 'NoOfLocations') {
      this.noOfLocationsSubject$.next(data);
    } else if (widgetName === 'NoOfBuildings') {
      this.noOfBuildingsSubject$.next(data);
    } else if (widgetName === 'ConstructionType') {
      this.constructionTypeSubject$.next(data);
    } else if (widgetName === 'OccupancyType') {
      this.occupancyTypeSubject$.next(data);
    } else if (widgetName === 'YearBuild') {
      this.yearBuildSubject$.next(data);
    } else if (widgetName === 'ProtectionClass') {
      this.protectionClassSubject$.next(data);
    }
  }


  getLossSummary(widgetName: string): Observable<any[]> {
    let dsData = new BehaviorSubject<any[]>([]);
    if (widgetName === 'ClaimsbyLOBbyYear') {
      return this.claimsbyLOBbyYear$;
    } else if (widgetName === 'IncurredbyLOBbyYear') {
      return this.incurredbyLOBbyYear$;
    } else if (widgetName === 'IncurredRangeCount') {
      return this.incurredRangeCount$;
    } else if (widgetName === 'ClaimbyClaimTypebyYear') {
      return this.claimbyClaimTypebyYear$;
    } else if (widgetName === 'IncurredbyClaimTypebyYear') {
      return this.incurredbyClaimTypebyYear$;
    } else if (widgetName === 'ClaimsbyClaimType') {
      return this.claimsbyClaimType$;
    } else if (widgetName === 'ClaimStatus') {
      return this.claimStatus$;
    }
  else if (widgetName === 'TotalIncurred') {
    return this.totalIncurred$;
  }
  else if (widgetName === 'TopLocations') {
    return this.topLocations$;
  }
    return of([]);
  }


  setLossSummary(widgetName: string, data: any[]) {
    //let dsData = new BehaviorSubject<any[]>([]);
    if (widgetName === 'ClaimsbyLOBbyYear') {
      this.claimsbyLOBbyYear$.next(data);
    } else if (widgetName === 'IncurredbyLOBbyYear') {
      this.incurredbyLOBbyYear$.next(data);
    } else if (widgetName === 'IncurredRangeCount') {
      this.incurredRangeCount$.next(data);
    } else if (widgetName === 'ClaimbyClaimTypebyYear') {
      this.claimbyClaimTypebyYear$.next(data);
    } else if (widgetName === 'IncurredbyClaimTypebyYear') {
      this.incurredbyClaimTypebyYear$.next(data);
    } else if (widgetName === 'ClaimsbyClaimType') {
      this.claimsbyClaimType$.next(data);
    } else if (widgetName === 'ClaimStatus') {
      this.claimStatus$.next(data);
    }
    else if (widgetName === 'TotalIncurred') {
      this.totalIncurred$.next(data);
    }
    else if (widgetName === 'TopLocations') {
      this.topLocations$.next(data);
    }
  }

  setData(key: string, data: any[]) {
    if (sessionStorage.getItem(key) != null)
      localStorage.setItem(key, JSON.stringify(data));
    this.tivSubject$.next(data);
  }

  getDashboard(widgetName: string): Observable<any[]> {
    let data: ChartData[] = [{
      Dimension : [],
      Data : [
        {
          Name:"",
          Data : []
        }
      ]
    }]
    if (widgetName === 'SubmissionTurnaroundTime') {
      return this.dashboard_TurnAroundTime$;
    } else if (widgetName === 'TopBrokers') {
      return this.dashboard_TopBrokers$;
    } else if (widgetName === 'CoverageDistribution') {
      return this.dashboard_CoverageDistribution$;
    } else if (widgetName === 'TopIndustries') {
      return this.dashboard_TopIndustries$;
    } else if (widgetName === 'TopLocationsByCity') {
      return this.dashboard_TopLocationsByCity$;
    } else if (widgetName === 'TopLocationsByState') {
      return this.dashboard_TopLocationsByState$;
    } 
    
    return of(data);
  }
  setDashboard(widgetName: string, data: any[]) {
    //let dsData = new BehaviorSubject<any[]>([]);
    if (widgetName === 'SubmissionTurnaroundTime') {
      this.dashboard_TurnAroundTime$.next(data);
    } else if (widgetName === 'TopBrokers') {
      this.dashboard_TopBrokers$.next(data);
    } else if (widgetName === 'CoverageDistribution') {
      this.dashboard_CoverageDistribution$.next(data);
    } else if (widgetName === 'TopIndustries') {
      this.dashboard_TopIndustries$.next(data);
    } else if (widgetName === 'TopLocationsByCity') {
      this.dashboard_TopLocationsByCity$.next(data);
    } else if (widgetName === 'TopLocationsByState') {
      this.dashboard_TopLocationsByState$.next(data);
    } 
  }

  setAccountInformation(accountInformation: AccountInformation | null): void {
    this.accountInformationSubject$.next(accountInformation);
  }

  getAccountInformation(): Observable<any>{
    return this.accountInformationSubject$   
  }

  // setAccountInformation(accountInformation: AccountInformation | null): void {
  //   this.accountInformationSubject$.next(accountInformation);
  // }
  
  // getAccountInformation(): Observable<AccountInformation | null> {
  //   return this.accountInformationSubject$.asObservable();
  // }

  // setAccountInformation(accountInformation: AccountInformation | null): void {
  //   this.accountInformation = accountInformation;
  // }

  // getAccountInformation(): Observable<AccountInformation | null> {
  //   return of(this.accountInformation);
  // }

  // setAccountInformation(accountInformation: AccountInformation | null): void {
  //   this.accountInformation = accountInformation;
  // }

  // getAccountInformation(): AccountInformation | null {
  //   return this.accountInformation;
  // }


}
