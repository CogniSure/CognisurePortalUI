import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ChartData } from 'src/app/model/charts/chartdata';
import { AccountInformation } from 'src/app/model/inbox/AccountInformation';
import { SubmissionFile } from 'src/app/model/inbox/SubmissionFile';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  getAccountInformationfromDB(type: string, clientId: string, submissionId: string, email: string) {
    throw new Error('Method not implemented.');
  }
  private accountInformation: AccountInformation | null = null;
  private accountInformationSubject$ = new BehaviorSubject<any>({});

  private submissionFilesSubject$ = new BehaviorSubject<any[]>([]);

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
  
  
  private dashboard_SubmissionProfile$ = new BehaviorSubject<any[]>([]);
  private dashboard_TurnAroundTime$ = new BehaviorSubject<any[]>([]);
  private dashboard_TopBrokers$ = new BehaviorSubject<any[]>([]);
  private dashboard_CoverageDistribution$ = new BehaviorSubject<any[]>([]);
  private dashboard_TopIndustries$ = new BehaviorSubject<any[]>([]);
  private dashboard_TopLocationsByCity$ = new BehaviorSubject<any[]>([]);
  private dashboard_TopLocationsByState$ = new BehaviorSubject<any[]>([]);

  private summary_Agencys$ = new BehaviorSubject<any[]>([]);
  private summary_BusinessOperations$ = new BehaviorSubject<any[]>([]);
  private summary_TotalLosses$ = new BehaviorSubject<any[]>([]);
  private summary_Property_Exposure$ = new BehaviorSubject<any[]>([]);
  private summary_Property_Coverages$ = new BehaviorSubject<any[]>([]);
  private summary_Property_Losses$ = new BehaviorSubject<any[]>([]);
  private summary_Auto_Exposure$ = new BehaviorSubject<any[]>([]);
  private summary_Auto_Coverages$ = new BehaviorSubject<any[]>([]);
  private summary_Auto_Losses$ = new BehaviorSubject<any[]>([]);
  private summary_GL_Exposure$ = new BehaviorSubject<any[]>([]);
  private summary_GL_Coverages$ = new BehaviorSubject<any[]>([]);
  private summary_GL_Losses$ = new BehaviorSubject<any[]>([]);
  private summary_WC_Exposure$ = new BehaviorSubject<any[]>([]);
  private summary_WC_Coverages$ = new BehaviorSubject<any[]>([]);
  private summary_WC_Losses$ = new BehaviorSubject<any[]>([]);
  private summary_Umbrella_Exposure$ = new BehaviorSubject<any[]>([]);
  private summary_Umbrella_Coverages$ = new BehaviorSubject<any[]>([]);
  private summary_Umbrella_Losses$ = new BehaviorSubject<any[]>([]);

  constructor() {
    let isSummaryCached = sessionStorage.getItem('isSummaryCached');
  }

  clearSession() {
    sessionStorage.removeItem('tiv');
    sessionStorage.removeItem('noOfLocation');
    sessionStorage.removeItem('noOfBuildings');
  }

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
    if (widgetName === 'SubmissionProfile') {
      return this.dashboard_SubmissionProfile$;
    } else if (widgetName === 'SubmissionTurnaroundTime') {
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
    if (widgetName === 'SubmissionProfile') {
      this.dashboard_SubmissionProfile$.next(data);
    } else if (widgetName === 'SubmissionTurnaroundTime') {
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

  setSubmissionFiles(files: SubmissionFile[]): void {
    this.submissionFilesSubject$.next(files);
  }

  getSubmissionFiles(): Observable<any[]>{
    return this.submissionFilesSubject$   
  }
  getSummaryByLOB(widgetName: string): Observable<any[]> {
    let dsData = new BehaviorSubject<any[]>([]);
    if (widgetName === 'Agency') {
      return this.summary_Agencys$;
    } else if (widgetName === 'BusinessOperations') {
      return this.summary_BusinessOperations$;
    } else if (widgetName === 'Totallosses') {
      return this.summary_TotalLosses$;
    } else if (widgetName === 'PropertyExposure') {
      return this.summary_Property_Exposure$;
    } else if (widgetName === 'PropertyCoverages') {
      return this.summary_Property_Coverages$;
    } else if (widgetName === 'PropertyLosses') {
      return this.summary_Property_Losses$;
    }else if (widgetName === 'AutoExposure') {
      return this.summary_Auto_Exposure$;
    } else if (widgetName === 'AutoCoverages') {
      return this.summary_Auto_Coverages$;
    } else if (widgetName === 'AutoLosses') {
      return this.summary_Auto_Losses$;
    } else if (widgetName === 'GLExposure') {
      return this.summary_GL_Exposure$;
    } else if (widgetName === 'GLCoverages') {
      return this.summary_GL_Coverages$;
    } else if (widgetName === 'GLLosses') {
      return this.summary_GL_Losses$;
    } else if (widgetName === 'WCExposure') {
      return this.summary_WC_Exposure$;
    } else if (widgetName === 'WCCoverages') {
      return this.summary_WC_Coverages$;
    } else if (widgetName === 'WCLosses') {
      return this.summary_WC_Losses$;
    } else if (widgetName === 'UmbrellaExposure') {
      return this.summary_Umbrella_Exposure$;
    } else if (widgetName === 'UmbrellaCoverages') {
      return this.summary_Umbrella_Coverages$;
    } else if (widgetName === 'UmbrellaLosses') {
      return this.summary_Umbrella_Losses$;
    }
    return of([]);
  }


  setSummaryByLOB(widgetName: string, data: any[]) {
    //let dsData = new BehaviorSubject<any[]>([]);
    if (widgetName === 'Agency') {
      this.summary_Agencys$.next(data);
    } else if (widgetName === 'BusinessOperations') {
      this.summary_BusinessOperations$.next(data);
    } else if (widgetName === 'Totallosses') {
      this.summary_TotalLosses$.next(data);
    } else if (widgetName === 'PropertyExposure') {
      this.summary_Property_Exposure$.next(data);
    } else if (widgetName === 'PropertyCoverages') {
      this.summary_Property_Coverages$.next(data);
    } else if (widgetName === 'PropertyLosses') {
      this.summary_Property_Losses$.next(data);
    } else if (widgetName === 'AutoExposure') {
      this.summary_Auto_Exposure$.next(data);
    } else if (widgetName === 'AutoCoverages') {
      this.summary_Auto_Coverages$.next(data);
    } else if (widgetName === 'AutoLosses') {
      this.summary_Auto_Losses$.next(data);
    } else if (widgetName === 'GLExposure') {
      this.summary_GL_Exposure$.next(data);
    } else if (widgetName === 'GLCoverages') {
      this.summary_GL_Coverages$.next(data);
    } else if (widgetName === 'GLLosses') {
      this.summary_GL_Losses$.next(data);
    }else if (widgetName === 'WCExposure') {
      this.summary_WC_Exposure$.next(data);
    } else if (widgetName === 'WCCoverages') {
      this.summary_WC_Coverages$.next(data);
    } else if (widgetName === 'WCLosses') {
      this.summary_WC_Losses$.next(data);
    }else if (widgetName === 'UmbrellaExposure') {
      this.summary_Umbrella_Exposure$.next(data);
    } else if (widgetName === 'UmbrellaCoverages') {
      this.summary_Umbrella_Coverages$.next(data);
    } else if (widgetName === 'UmbrellaLosses') {
      this.summary_Umbrella_Losses$.next(data);
    }
   
  }


}
