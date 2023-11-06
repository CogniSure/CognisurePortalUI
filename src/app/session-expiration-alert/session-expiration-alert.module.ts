import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from '../services/auth/auth.service';
//import { SessionTimerHttpInterceptor } from '../interceptors/session-timer-http.interceptor';
import { SessionExpirationAlertComponent } from './session-expiration-alert/session-expiration-alert.component';
import { SessionInterruptService } from '../services/auth/session-interrupt.service';
import {
  SessionExpirationConfig,
  ConfigToken,
} from '../model/common/session-expiration-config';
import { SessionTimerHttpInterceptor } from '../core/interceptors/session-timer-http.interceptor';

@NgModule({
  imports: [CommonModule],
  declarations: [SessionExpirationAlertComponent],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionTimerHttpInterceptor,
      multi: true,
    },
    SessionInterruptService,
  ],
  exports: [SessionExpirationAlertComponent],
})
export class SessionExpirationAlert {
  static forRoot(
    config: SessionExpirationConfig = {
      totalMinutes: 3,
    }
  ): ModuleWithProviders<SessionExpirationAlert> {
    return {
      ngModule: SessionExpirationAlert,
      providers: [
        {
          provide: ConfigToken,
          useValue: config,
        },
      ],
    };
  }
}
