import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '..//../services/auth/auth.service';

@Injectable()
export class SessionTimerHttpInterceptor implements HttpInterceptor {
  constructor(private readonly timerService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.timerService.resetTimer();
    return next.handle(request);
  }
}
