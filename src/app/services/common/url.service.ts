import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AppConfigService } from 'src/app/app-config-service';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  env = this.configService.settings;
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
constructor(private httpService: HttpService,private configService:AppConfigService) {}

getUrl(userId:number, pageName:string, widgetCode : string, action:string){
  return this.httpService.getConfiguredUrl(userId, pageName, widgetCode,action)
}
}
