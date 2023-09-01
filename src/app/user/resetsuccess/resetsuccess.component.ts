import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { LoginData } from 'src/app/model/common/logindata';
// import { TempUser } from 'src/app/model/profile/tempuser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/common/global.service';
import { AccountService } from 'src/app/services/user/accounts.service';

@Component({
  selector: 'app-resetsuccess',
  templateUrl: './resetsuccess.component.html',
  styleUrls: ['./resetsuccess.component.scss'],
})
export class ResetSuccessComponent implements OnInit {
  showSpinner = false;

  loginData: LoginData;
  isvalidform: boolean;

  constructor(
    private globalService: GlobalService,
    private auth: AuthService,
    private router: Router,
    private accService: AccountService
  ) {}

  ngOnInit(): void {
    // this.globalService.loginDetails$.subscribe((x) => {
    //   this.loginData = {
    //     Email: x.Email,
    //     Password: x.Password,
    //   };
    // });
  }

  // Login(event: any) {
  //   this.showSpinner=true;
  //   event.preventDefault();
  //   this.accService
  //     .login({ email: this.loginData.Email, password: this.loginData.Password })
  //     .subscribe((res) => {
  //       if (res.success) {
  //         this.auth.setToken(res);
  //         this.accService.Check2FAStatus(this.loginData.Email).subscribe((fa) => {
  //           if (!fa.success) {
  //             this.accService.Send2FAEmail(this.loginData.Email).subscribe((fae) => {
  //               if (fae.success) {
  //                 this.showSpinner=false;
  //                 this.router.navigate(['/pendingauth'], {
  //                   queryParamsHandling: 'preserve',
  //                 });
  //               }
  //             });
  //           } else {
  //             if (res.value.accessToken === null) {
  //               this.isvalidform = false;
  //             } else {
  //               this.auth.setToken(res);
  //               let tempUser: TempUser = {
  //                 AuthVal: res,
  //                 UserInput: {
  //                   email: this.loginData.Email,
  //                   password: this.loginData.Password,
  //                 },
  //               };
  //               this.globalService.tempUser$.next(tempUser);
  //               // this.auth.setSession(res);
  //               // this.getUser(this.loginForm.value);
  //               this.showSpinner=false;
  //               this.router.navigate(['/multifactorauthentication'], {
  //                 queryParamsHandling: 'preserve',
  //               });
  //               this.isvalidform = true;
  //             }
  //           }
  //         });
  //       } else {
  //         this.isvalidform = false;
  //       }
  //     });
  //     this.showSpinner=false;
  // }
}
