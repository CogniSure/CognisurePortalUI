import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { SessionInterruptService } from './services/auth/session-interrupt.service';
import { AppSessionInterruptService } from './services/auth/app-session-interrupt.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpService } from './services/http.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseModule } from './base/base.module';
import { MenuModule } from '@progress/kendo-angular-menu';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';







@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    HttpClientModule ,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    BaseModule,
    MenuModule,
    ListViewModule,
    ChartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    HttpService,
    AuthService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // },
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: LoaderInterceptor,
  //     multi: true,
  //  },
   {
    provide: SessionInterruptService,
    useClass: AppSessionInterruptService,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
