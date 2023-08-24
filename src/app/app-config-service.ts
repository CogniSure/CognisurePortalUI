import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  
  baseUrl : string|undefined
  settings : any
  constructor(private http:HttpClient) { }
  init(){
  }
  static settings: any;
    load() {
        const jsonFile = `assets/config.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).pipe(tap((data:any)=>{
              this.settings = data
              console.log("Config")
              console.log(this.settings)
              resolve();
            })
            ,catchError((error) => {
              resolve();
              return of(null);
           })).subscribe()
        });
    }
}
