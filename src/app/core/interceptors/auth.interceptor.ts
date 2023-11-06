import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as moment from 'moment';
import { AccountService } from 'src/app/services/user/accounts.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    
    const accessToken = sessionStorage.getItem('session_token');
    console.log('Http Interceptor :' + accessToken)
    if (accessToken && accessToken.length>0) {
      let expiry = sessionStorage.getItem('expires_at')
      
      const expiresAt = JSON.parse(expiry!);
      let tokenExpiration: any = new Date(expiry!);
      tokenExpiration =  moment(expiresAt);
      console.log('Token Time :')
      console.log(expiry)
      console.log(tokenExpiration)
      if( tokenExpiration > new Date()) {
          const cloned = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + accessToken),
          });
    
          return next.handle(cloned);
      }
      else {
          console.log('Token Expired... Token Referesh')
          this.authService.logout();
          localStorage.clear();
          this.router.navigate(["/login"]);
          // this.authService.logout().subscribe({
          //     next: (response) => {
          //       localStorage.clear();
          //       this.router.navigate(["/login"]);
          //     },
          //     error: (err) => {
          //       console.log(err)
          //     },
          //     complete: () => console.info('Session Logout, Due to Token expire')
          // });
          return next.handle(request);
      }
      
    } else {
      return next.handle(request);
    }
  }
}
