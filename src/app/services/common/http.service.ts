import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  env = environment;
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params : ""
    };
  constructor(private http:HttpClient) { }

  getConfiguredUrl(userId:number, pageName:string, widgetCode : string, action:string)
  {
   return this.http.get<any>(this.env.baseUrl+"api/url?"+"userId="+userId+"&pageName="+
pageName+"&widgetCode="+widgetCode+"&action="+action).pipe(
    map((result)=>{
      return result
    }),
    retry(1), catchError(this.errorHandl));
  }
  getData(apiUrl:string,urlParams : any):any{
    return this.http.get<any>(apiUrl,
      {
        'params' : urlParams
      }
      ).pipe(
        map((result)=>{
          return result
        }),
        retry(1), catchError(this.errorHandl))
  }
  postData(apiUrl:string,urlParams : string,dataParams:any):any
  {
    var options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params : dataParams
    };
    const res =  this.http.post<any>(apiUrl,"",options
      ).pipe(
        map((result)=>{
          return result
        }),
        retry(1), catchError(this.errorHandl))

      console.log("Result : " + JSON.stringify(res));
      return res;
  }
  deleteData(apiUrl:string,urlParams : string){
    return this.http.delete<any>(apiUrl+urlParams).pipe(
      map((result)=>{
        return result
      }),
      retry(1), catchError(this.errorHandl));
  }
  editData(apiUrl:string,dataParams:any,urlParams : string){
    return this.http.put<any>(apiUrl+urlParams,"",
    {
      'params' : dataParams
    }
    ).pipe(
      map((result)=>{
        return result
      }),
      retry(1), catchError(this.errorHandl)
      )
  }

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
