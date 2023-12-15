import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionInterruptService } from './session-interrupt.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AppSessionInterruptService extends SessionInterruptService {
  constructor(private readonly httpClient: HttpClient,private sessionTimer : AuthService, 
    private router: Router) {
    super();
  }
  override continueSession() {
    this.sessionTimer.setSession();
  }
  override stopSession() {
    this.onExpire()
  }
  override onExpire(): void {
    this.router.navigate(['/login'], { queryParamsHandling: 'preserve' });
  }
}
