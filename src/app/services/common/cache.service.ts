import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private tivSubject$ = new BehaviorSubject<any[]>([]);
  private noOfLocationsSubject$ = new BehaviorSubject<any[]>([]);
  private noOfBuildingsSubject$ = new BehaviorSubject<any[]>([]);
  private constructionTypeSubject$ = new BehaviorSubject<any[]>([]);
  private occupancyTypeSubject$ = new BehaviorSubject<any[]>([]);
  private yearBuildSubject$ = new BehaviorSubject<any[]>([]);
  private protectionClassSubject$ = new BehaviorSubject<any[]>([]);

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
      return this.getTiv();
    } else if (widgetName === 'NoOfLocations') {
      return this.getNoOfLocations();
    } else if (widgetName === 'NoOfBuildings') {
      return this.getNoOfBuildings();
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
  setData(key: string, data: any[]) {
    if (sessionStorage.getItem(key) != null)
      localStorage.setItem(key, JSON.stringify(data));
    this.tivSubject$.next(data);
  }

  getTiv(): Observable<any[]> {
    return this.tivSubject$;
  }
  getNoOfLocations(): Observable<any[]> {
    return this.noOfLocationsSubject$;
  }
  getNoOfBuildings(): Observable<any[]> {
    return this.noOfBuildingsSubject$;
  }
}
