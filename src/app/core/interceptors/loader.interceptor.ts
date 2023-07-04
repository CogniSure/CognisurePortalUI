import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '..//../services/loader.service';
import { catchError, finalize, map, tap } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     this.loaderService.requestStarted();
     return this.handler(next,request)
  }
  handler(next:any,request:any){
    return next.handle(request).pipe(
    tap((event:any)=>{
      if(event instanceof HttpResponse){
        this.loaderService.requestEnded()
      }
     },
     //catchError(this.errorHandl)
     ),
     catchError((err:HttpErrorResponse)=>{
      this.loaderService.resetSpinner()
      throw err;
     })
    )
  }
}