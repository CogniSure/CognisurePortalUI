import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  NgModule,
  inject,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { SessionInterruptService } from './services/auth/session-interrupt.service';
import { AppSessionInterruptService } from './services/auth/app-session-interrupt.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpService } from './services/common/http.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseModule } from './base/base.module';
import { MenuModule } from '@progress/kendo-angular-menu';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { LabelModule } from '@progress/kendo-angular-label';
import { AppConfigService } from './app-config-service';
import {
  IndicatorsModule,
  LoaderComponent,
} from '@progress/kendo-angular-indicators';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { ChatModule } from '@progress/kendo-angular-conversational-ui';
import { ChatService } from './services/common/chat.service';




// export function initializeApp(appConfig: AppConfigService) {
//   return () => appConfig.load();
// }

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    BaseModule,
    MenuModule,
    ListViewModule,
    ChartsModule,
    LabelModule,
    IndicatorsModule,
    DialogsModule,
    UploadsModule,
    ChatModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => () =>
        appConfigService.load(),
    },
    HttpService,
    ChatService,
    AuthService,
    {
      provide: SessionInterruptService,
      useClass: AppSessionInterruptService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
