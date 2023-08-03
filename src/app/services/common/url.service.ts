import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  env = environment;
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
constructor(private httpService: HttpService) {}

getUrl(userId:number, pageName:string, widgetCode : string, action:string){
  return this.httpService.getConfiguredUrl(userId, pageName, widgetCode,action)
}
}
